import { Card, Grid, IconButton, Avatar, Typography, CardContent, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import styles from "../../../styles/Item.module.scss";
import { ROUTES, LINKS } from "../../../utils/constants";
import { IChat } from "../../../types/chat";
import { IMessage } from "../../../types/message";
import { date_format } from "../../../utils/date-format";
import { IUser } from "../../../types/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useActions } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TOKEN } from "../../../utils/token";
import { GET_ALL_MESSAGES } from "../../../graphql/queries.ts/messages";
import React, { useEffect } from "react";
import { GET_CHAT } from "../../../graphql/queries.ts/chats";
import DeleteIcon from '@mui/icons-material/Delete';
import { REMOVE_CHAT_MEMBER } from "../../../graphql/mutations/chats";


interface ChatItemProps 
{
    chat: IChat;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => 
{
    const router = useRouter();

    const { async_logout, async_leave_chat } = useActions();

    // const { chat, error: chat_error } = useTypedSelector(state => state.chat);
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    let latest_message: IMessage | undefined;
    let from: IUser | undefined;
    let chatname: any = [];

    chat.members.forEach(member => chatname.push(member.username));

    chatname = 'Chat: ' + chatname.toString().replaceAll(',', ', ');


    if (chat.messages && chat.messages?.length > 0) 
    {
        latest_message = chat.messages[chat.messages.length - 1];
        from = latest_message?.user;
    }
    else 
    {
        //latest_message = 'Send your first message...';
        from = chat.members.find((user: IUser) => user.id === chat.admin_id);
    }

    // useEffect(() => 
    // {
    //     if (chat.messages && chat.messages?.length > 0) 
    //     {
    //         latest_message = chat.messages[chat.messages.length - 1];
    //         from = latest_message?.user_id;
    //     }
    //     else 
    //     {
    //         //latest_message = 'Send your first message...';
    //         from = chat.members?.find((user: IUser) => user.id === chat.user_id);
    //     }

    //     /*return () => {
    //         cleanup
    //     };*/
    // }, [messages]);

    // const input = { input: { id: chat.id } }

    // const { async_set_all_messages, async_set_chat, async_logout } = useActions();

    // const [get_chat, { loading: chat_loading, data: chat_data }] = useLazyQuery(GET_CHAT,   
    // {
    //     variables: input,
    //     onCompleted: data => 
    //     {
    //         async_set_chat(data.get_chat);
    //         async_set_all_messages(data.get_chat.messages);
    //         //router.push(ROUTES.CHATS + data.get_chat.id);
    //     },
    //     onError: err => 
    //     {
    //         console.log(err);
    //         async_set_chat(null);
    //         async_set_all_messages([]);

    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         {
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     },
    //     nextFetchPolicy: "cache-first"
    // });

    // const get_selected_chat = () =>
    // {
    //     get_chat();
    //     router.push(ROUTES.CHATS + chat.id);
    // }

    const [gql_leave_chat, { loading: leave_chat_loading }] = useMutation(REMOVE_CHAT_MEMBER, 
    {
        onCompleted: (data) => async_leave_chat(data.remove_chat_member),
        onError: (err) => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        }
    });

    const leave_chat = (e: any) =>
    {
        e.stopPropagation();
        const input = { input: { 
            chat_id: chat.id,
            user_id: auth.user.id
        }}
        gql_leave_chat({ variables: input });
    }


    return (

        <Card className={styles.item} raised>
            <IconButton onClick={() => router.push(ROUTES.PEOPLE + from?.id)}>
                <Avatar 
                    alt={from?.username} 
                    src={LINKS.STATIC_FILES_LINK + from?.avatar}
                />
            </IconButton>
            <CardActionArea style={{ borderRadius: 10, padding: 4 }}>
                <Grid 
                    container 
                    direction="column" 
                    onClick={() => /*get_selected_chat()*/router.push(ROUTES.CHATS + chat.id)}
                >
                    <Typography 
                        className={styles.name} 
                        //variant="body2" 
                        component="p"
                    >
                        {chatname}
                    </Typography>
                    <Typography 
                        className={styles.username} 
                        variant="body2" 
                        component="p"
                    >
                        {from?.username}
                    </Typography>
                    <Typography 
                        className={styles.latest_message} 
                        variant="body2" 
                        component="p"
                    >
                        {chat.messages && 
                            !chat.is_private && 
                            chat.messages?.length > 0 
                                ? latest_message?.text 
                                : 'Send your first message...'}
                    </Typography>
                    <Typography 
                        className={styles.latest_message} 
                        variant="body2" 
                        component="p"
                    >
                        {date_format(latest_message?.created_at)}
                    </Typography>
                    {/* <IconButton 
                    // onClick={ e => e.stopPropagation() } 
                        style={{marginLeft: 'auto'}}
                    >
                        <DeleteIcon
                            //onClick={delete_track}
                        />
                    </IconButton> */}
                </Grid>
            </CardActionArea>
            <IconButton 
                onClick={leave_chat}
                style={{marginLeft: 'auto'}}
            >
                <DeleteIcon />
            </IconButton>
        </Card>
    );
}

export default ChatItem;