import { useRouter } from "next/router";
import { IUser } from "../../../types/user";
import styles from "../../../styles/App.module.scss";
import { date_format } from '../../../utils/date-format';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Card, Grid, IconButton, Avatar, Typography, Button, FormGroup  } from "@mui/material";
import ImageDialog from "../../Shared/Dialogs/ImageDialog";
import FormDialog from "../../Shared/Dialogs/FormDialog";
import { DELETE_USER, UPDATE_USER } from "../../../graphql/mutations/users";
import ConfirmDialog from "../../Shared/Dialogs/ConfirmDialog";
import { ROUTES } from "../../../utils/constants";
import { TOKEN } from "../../../utils/token";


interface IUpdateUser
{
    username: string;
    email: string;
    old_password: string;
    new_password: string;
    confirm_new_password: string;
}

interface IError
{
    username?: string;
    email?: string;
    old_password?: string;
    new_password?: string;
    confirm_new_password?: string;
}

const initial_state: IUpdateUser = 
{
    username: '',
    email: '',
    old_password: '',
    new_password: '',
    confirm_new_password: '',
};

const initial_error: IError =
{
    username: undefined,
    email: undefined,
    old_password: undefined,
    new_password: undefined,
    confirm_new_password: undefined,
}


interface UserSettingsProps 
{
    user?: IUser;
    button_type?: "settings" | "nav_settings" | "edit" | "default";
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, button_type = "settings" }) => 
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    //const { user, users, error: users_error } = useTypedSelector(state => state.user);

    const { async_set_user, async_logout, async_login } = useActions();

    const [values, set_values] = useState({ ...initial_state, 
                                            username: auth.user.username, 
                                            email: auth.user.email });
    const [errors, set_errors] = useState(initial_error);

    const [gql_update_user, { loading: update_user_loading }] = useMutation(UPDATE_USER, 
    {
        // update: (_, __) => router.push(ROUTES.LOGIN),  //window.location.href = '/login',
        onCompleted: (data) =>
        {
            async_login({ user: data.update_user.user, is_auth: true });
            async_set_user(data.update_user.user);
            set_errors(initial_error);
            set_values({ ...initial_state, 
                        username: auth.user.username, 
                        email: auth.user.email });
        },
        onError: (err) => set_errors(err.graphQLErrors[0].extensions?.errors)
    });

    const [gql_delete_user, { loading: delete_user_loading }] = useMutation(DELETE_USER, 
    {
        onCompleted: (data) =>
        {
            async_logout();
            router.push(ROUTES.HOME);
        },
        onError: (err) => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
        }
    });

    const update_user = (e: React.FormEvent) =>
    {
        e.preventDefault();
        gql_update_user({ variables: { input: { ...values }}});
        //set_values(initialState);
    }

    const delete_account = () => 
    {
        gql_delete_user({ variables: { input: { id: auth.user?.id }}});
    }

    
    return (
        <>
            <Grid style={{ marginLeft: 'auto' }}>
                <form onSubmit={update_user}>
                    <FormGroup>
                        <FormDialog 
                            dialog_title='Settings'
                            button_variant='text'
                            button_type={button_type}
                            is_user_settings={true}
                            form_content={{
                                values,
                                set_values,
                                errors,
                                is_loading: update_user_loading,
                                is_with_button: false
                            }}
                        >
                            <Grid style={{marginRight: 'auto'}}>
                                <ConfirmDialog 
                                    button_title='Delete account' 
                                    dialog_title='Delete account'
                                    button_variant='contained'
                                >
                                    <Button onClick={delete_account}>Delete</Button>
                                    <Button>Cancel</Button>
                                </ConfirmDialog>
                            </Grid>
                            <Button onClick={update_user}>Save changes</Button>
                        </FormDialog>
                    </FormGroup>
                </form> 
            </Grid>
        </>
    )
}

export default UserSettings;