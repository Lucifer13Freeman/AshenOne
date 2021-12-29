import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormControl, Grid, IconButton, Input, InputLabel, ListItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ListDialog from '../Shared/Dialogs/ListDialog';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_INVITES, GET_ALL_RECEIVED_INVITES, GET_ALL_SENT_INVITES } from '../../graphql/queries.ts/invites';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { TOKEN } from '../../utils/token';
import { ROUTES } from '../../utils/constants';
import { IInvite } from '../../types/invite';
import InviteList from './List/InviteList';
import styles from '../../styles/Invites.module.scss';
import UserList from '../Users/List/UserList';
import { SEARCH_USERS } from '../../graphql/queries.ts/users';
import Users from '../Users/Users';


interface InviteUsersProps 
{
    chat_id?: string;
    group_id?: string;
}

const InviteUsers: React.FC<InviteUsersProps> = ({ chat_id, group_id}) =>
{
    const router = useRouter();
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { invites, error: invites_error } = useTypedSelector(state => state.invite);
    const { users, error: users_error } = useTypedSelector(state => state.invite);

    const { async_set_all_invites, async_set_all_users, async_logout } = useActions();

    const input = {
        input: {
            // limit: 300,
            // offset: 0
        }
    }

    const [query, set_query] = useState<string>('');
    const [timer, set_timer]: any = useState(null);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        set_query(e.target.value);

        if (timer) clearTimeout(timer);

        set_timer(
            setTimeout(
                async () => 
                {
                    await search_users({ variables: { input: { username: e.target.value }}});
                }, 500)
        );
    }

    const [search_users, { loading: search_user_loading, data: search_user_data }] = useLazyQuery(SEARCH_USERS,
    {
        onCompleted: data => async_set_all_users(data.search_users),
        onError: err => 
        {
            console.log(err);
            async_set_all_users([]);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        nextFetchPolicy: "cache-first"
    });


    // const { loading: invites_loading, data: invites_data } = useQuery(GET_ALL_SENT_INVITES,   
    // {
    //     variables: input,
    //     onCompleted: data => async_set_all_invites(data.get_sent_invites),
    //     onError: err => 
    //     {
    //         console.log(err);
    
    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         { 
    //             async_set_all_invites([]);
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     },
    //     nextFetchPolicy: "cache-first"
    // });


    return (
        <Grid style={{marginTop: 10}} /*container direction="column"*/>
            <ListDialog 
                button_title='Invite' 
                transition='up'
                dialog_title='Invite'
                button_variant='outlined'
                // button_type='default'
                // form_content={{
                //     // value: post_text,
                //     // set_value: set_post_text,
                //     // is_loading: update_post_loading,
                //     // placeholder: 'Edit post...'
                // }}
            >
                {/* { invites?.length > 0 ?
                    <UserList users={users}/> :
                    <Grid className={styles.no_invites}>No users to invite...</Grid> } */}
                <Users 
                    is_for_invites={true} 
                    chat_id={chat_id} 
                    group_id={group_id} 
                />
            </ListDialog>
        </Grid>
    );
}

export default InviteUsers;