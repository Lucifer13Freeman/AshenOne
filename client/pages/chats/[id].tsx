import { Box, 
        Button,
        Select, 
        Card, 
        Avatar, Collapse, MenuItem, Menu, MenuList, 
        Grid, Input, IconButton, InputLabel, 
        TextField, Grow, Popper, ClickAwayListener,
        List, ListItem, ListItemIcon, ListItemText, 
        InputBase, Paper, 
        FormControl,
        FormGroup,
        Typography,
        InputAdornment, 
        NoSsr } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useActions } from "../../hooks/useAction";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import MessageList from '../../components/Messages/List/MessageList';
import { GET_ALL_MESSAGES, SEARCH_MESSAGES } from "../../graphql/queries.ts/messages";
import { GetServerSideProps } from "next";
import styles from '../../styles/Messages.module.scss';
import app_styles from '../../styles/App.module.scss';
import { useInput } from "../../hooks/useInput";
import { useEffect, useState } from "react";
import { NEW_MESSAGE } from "../../graphql/subscriptions/messages";
import { GET_CHAT } from "../../graphql/queries.ts/chats";
import ChatMembers from '../../components/ChatMembers/ChatMembers';
import MessageForm from '../../components/Messages/MessageForm';
import Messages from "../../components/Messages/Messages";
//import Chat from '../../components/Chats/Chat';
import { IChat } from "../../types/chat";
import { makeStyles, createStyles } from "@mui/styles";


const useStyles = makeStyles(() => 
    createStyles(
    {
        root: { borderRadius: 20 }
    }
));


const ChatPage: React.FC = () =>
{
    const router = useRouter();

    const chat_id = router.query.id;
    const input = { input: { id: chat_id } }
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { chat, chats, error: chat_error } = useTypedSelector(state => state.chat);
    const { messages, error: messages_error } = useTypedSelector(state => state.message);

    const { async_get_all_messages, async_get_chat, async_get_all_chats, async_logout } = useActions();


    const /*[get_current_chat, */{ loading: chat_loading, data: chat_data } = useQuery(GET_CHAT,   
    {
        variables: input,
        onCompleted: data => 
        {
            //console.log(data.get_chat)
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
        // fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });


    const { data: message_data, error: message_error } = useSubscription(NEW_MESSAGE);

    useEffect(() => 
    {
        if (message_error) console.log(message_error);
        if (message_data) 
        { 
            async_get_all_messages([...messages, message_data.new_message]);
            //get_current_chat();
            //update_chats();
        }
    }, [message_data, message_error]);


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
                    await search_messages({ variables: { input: { chat_id, text: e.target.value }}});
                }, 500)
        );
    }

    const [search_messages, { loading: search_message_loading, 
                            data: search_message_data }] = useLazyQuery(SEARCH_MESSAGES,
    {
        onCompleted: data => async_get_all_messages(data.search_messages),
        onError: err => 
        {
            console.log(err);
            async_get_all_messages([]);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        nextFetchPolicy: "cache-first"
    });

    // const update_chats = () =>
    // {
    //     // let updated_chat: IChat = {...chat};
    //     // let updated_chats: IChat[] = [...chats];

    //     let updated_chat: IChat = chat;
    //     let updated_chats: IChat[] = chats;

    //     updated_chat = {
    //         ...updated_chat,
    //         messages: [...messages, message_data.new_message]
    //     }

    //     let chat_index: number = updated_chats.findIndex((chat: IChat) => chat.id === chat_id);
        
    //     updated_chats[chat_index] = updated_chat;

    //     async_get_chat(updated_chat);
    //     async_get_all_chats(updated_chats);

    //     console.log(updated_chat)
    //     console.log(updated_chats)
    // }


    return (
        
        <MainLayout>
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
                                value={query}
                                onChange={search}
                                // label={'Search...'}
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
                            <ChatMembers chat_id={chat_id}/>
                        </Grid>
                    </Box>
                    <Messages messages={messages}/>
                    <MessageForm chat_id={chat_id}/>
                </Card>
            </Grid>
            {/* <Chat chat_id={chat_id}/> */}
        </MainLayout>
    )
}


export default ChatPage;

// export const getServerSideProps: GetServerSideProps = async ({ params }: any) => 
// {
//     return {
//         props: { chat_id: params.id }
//     }
// }