import { Box, 
        Card, 
        Grid, Input, IconButton, InputLabel, 
        TextField,
        Typography,
        InputAdornment, 
        NoSsr } from "@mui/material";
import { useQuery, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GET_CHAT } from "../../graphql/queries.ts/chats";
import { NEW_MESSAGE } from "../../graphql/subscriptions/messages";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import app_styles from '../../styles/App.module.scss';
import ChatMembers from '../../components/ChatMembers/ChatMembers';
import MessageForm from '../Messages/MessageForm';
import Messages from "../../components/Messages/Messages";


interface ChatProps
{
    chat_id?: string | string[];
}

const Chat: React.FC<ChatProps> = ({ chat_id }) => 
{
    const router = useRouter();

    //const chat_id = router.query.id;
    const input = { input: { id: chat_id } }
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { chat, chats, error: chat_error } = useTypedSelector(state => state.chat);
    const { messages, error: messages_error } = useTypedSelector(state => state.message);

    const { async_get_all_messages, async_get_chat, async_logout } = useActions();


    const { loading: chat_loading, data: chat_data } = useQuery(GET_CHAT,   
    {
        variables: input,
        onCompleted: data => 
        {
            async_get_chat(data.get_chat);
            async_get_all_messages(data.get_chat.messages);
        },
        onError: err => 
        {
            console.log(err);
            async_get_chat(null);
            async_get_all_messages([]);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        nextFetchPolicy: "cache-first"
    });

    const { data: message_data, error: message_error } = useSubscription(NEW_MESSAGE);

    useEffect(() => 
    {
        if (message_error) console.log(message_error);
        if (message_data) async_get_all_messages([...messages, message_data.new_message]);
    }, [message_data, message_error]);


    return (
        <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <Typography 
                                variant="h4"
                                color="primary"
                                className={app_styles.page_title}
                                style={{ marginRight: 16, marginBottom: 6 }}
                            >
                                Messages
                            </Typography>
                            <TextField
                                //value={query}
                                //onChange={search}
                                //label={'Search...'}
                                variant="outlined"
                                style={{ marginRight: 'auto' }}
                                placeholder="Search…"
                                InputProps={
                                {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon color="primary"/>
                                        </InputAdornment> )
                                }}
                            />
                            <ChatMembers /*members={chat.members}*//>
                        </Grid>
                    </Box>
                    {/* <Grid className={styles.messages_container}>
                        {messages.length > 0 
                            ? <MessageList messages={messages}/>
                            : <div className={styles.no_messages}>Send your first message...</div>
                        }
                    </Grid> */}
                    <Messages messages={messages}/>
                    <MessageForm chat_id={chat_id}/>
                </Card>
            </Grid>
    );
}


export default Chat;