import { Card, Grid, IconButton, Avatar, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { IUser } from "../../../types/user";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import styles from "../../../styles/Users.module.scss";
import { ROUTES, LINKS } from "../../../utils/constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries.ts/users";
import { TOKEN } from "../../../utils/token";
import { CREATE_CHAT } from "../../../graphql/mutations/chats";
import { useState } from "react";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { CREATE_INVITE, DELETE_INVITE } from "../../../graphql/mutations/invites";
import { IInvite } from "../../../types/invite";
import { date_format } from "../../../utils/date-format";


// interface IError
// {
//     chat: string | undefined;
//     chat_id: string | undefined;
// }

// const initial_error: IError =
// {
//     chat: undefined,
//     chat_id: undefined
// }

interface UserItemProps 
{
    user: IUser;
    is_for_invites?: boolean;
    chat_id?: string;
    group_id?: string;
    invite?: IInvite;
}

const UserItem: React.FC<UserItemProps> = ({ user, is_for_invites, chat_id, group_id, invite }) => 
{
    const router = useRouter();

    //const [errors, set_errors] = useState(initial_error);

    const { async_logout, async_set_chat, async_create_invite,
            async_delete_invite, async_set_invite } = useActions();


    const [create_chat, {data: create_chat_data, loading: chat_loading }] = useMutation(CREATE_CHAT, 
    {
        onCompleted: (data) => 
        {
            async_set_chat(data.create_chat);
            router.push(ROUTES.CHATS + data.create_chat.id)
        },
        onError: (err) => 
        {
            console.log(err);
            //set_errors(err.graphQLErrors[0].extensions?.errors);
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
            else router.push(ROUTES.CHATS/* + err.graphQLErrors[0].extensions?.errors.chat_id*/);
        }
    });

    const create_chat_with_user = () =>
    {
        const input = { input: { members: [user.id] } }
        create_chat({ variables: input });
    }

    const [gql_create_invite, 
        { loading: create_invite_loading }] = useMutation(CREATE_INVITE, 
    {
        onCompleted: (data) => async_create_invite(data.create_invite),
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

    const [gql_delete_invite, { loading: delete_invite_loading }] = useMutation(DELETE_INVITE, 
    {
        onCompleted: (data) => async_delete_invite(data.delete_invite),
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

    const create_invite = (e: any) =>
    {
        e.stopPropagation();
        if (group_id) create_group_invite();
        else if (chat_id) create_chat_invite();
    }

    const create_group_invite = () =>
    {
        const input = { input: { user_id: user.id, group_id }}
        gql_create_invite({ variables: input });
    }

    const create_chat_invite = () =>
    {
        const input = { input: { user_id: user.id, chat_id }}
        gql_create_invite({ variables: input });
    }

    const reject_invite = (e: any) =>
    {
        e.stopPropagation();
        gql_delete_invite({ variables: { input: { id: invite?.id }}});
    }


    return (

        <Card className={styles.user}  style={{ padding: '0 10px' }} raised>
            <IconButton onClick={() => router.push(ROUTES.PEOPLE + user.id)}>
                <Avatar alt={user.username} src={`${LINKS.STATIC_FILES_LINK}${user.avatar}`}/>
            </IconButton>
            <CardActionArea style={{ borderRadius: 10, padding: 4 }}>
                <Grid 
                    container 
                    direction="column" 
                >
                    <div 
                        style={{ cursor: 'pointer' }}
                        className={styles.username}
                        onClick={() => router.push(ROUTES.PEOPLE + user.id)}>
                        {user.username}
                    </div>
                    <div style={{ fontSize: 12, color: 'gray' }}>
                        {date_format(user.created_at)}
                    </div>
                </Grid>
            </CardActionArea>
            { is_for_invites && !invite ?
            <IconButton 
                onClick={create_invite} 
                style={{ marginLeft: 'auto' }}
            >
                <AddCircleOutlineRoundedIcon/>
            </IconButton> : 
            is_for_invites && invite ?
            <IconButton 
                onClick={reject_invite} 
                style={{ marginLeft: 'auto' }}
            >
                <RemoveCircleOutlineRoundedIcon/>
            </IconButton> : 
            <IconButton 
                onClick={() => create_chat_with_user()} 
                style={{ marginLeft: 'auto' }}
            >
                <EmailIcon/>
            </IconButton> }
        </Card>
    );
}

export default UserItem;