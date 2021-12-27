import { Card, Grid, IconButton, Avatar, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { IUser } from "../../../types/user";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import styles from "../../../styles/UserItem.module.scss";
import { ROUTES, LINKS } from "../../../utils/constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries.ts/users";
import { TOKEN } from "../../../utils/token";
import { CREATE_CHAT } from "../../../graphql/mutations/chats";
import { useState } from "react";


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
}

const UserItem: React.FC<UserItemProps> = ({ user }) => 
{
    const router = useRouter();

    //const [errors, set_errors] = useState(initial_error);

    const { async_logout, async_set_chat } = useActions();

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
                async_logout();
                router.push(ROUTES.LOGIN);
            }
            else router.push(ROUTES.CHATS/* + err.graphQLErrors[0].extensions?.errors.chat_id*/);
        }
    });

    const create_chat_with_user = () =>
    {
        const input = { input: { members: [user.id] } }
        create_chat({ variables: input });
    }


    return (

        <Card className={styles.user} raised>
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
                        {user.created_at}
                    </div>
                </Grid>
            </CardActionArea>
            <IconButton 
                onClick={() => create_chat_with_user()} 
                style={{ marginLeft: 'auto' }}
            >
                <EmailIcon/>
            </IconButton>
        </Card>
    );
}


export default UserItem;