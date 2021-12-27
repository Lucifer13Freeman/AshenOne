import { Box, 
        Button, 
        Card, 
        Grid, 
        TextField, 
        InputAdornment, 
        Typography } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { wrapper } from "../../store";
import UserList from '../../components/Users/List/UserList';
import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { useActions } from "../../hooks/useAction";
import { Component, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { AppContext } from "next/app";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { GET_ALL_USERS } from "../../graphql/queries.ts/users";
import { GET_ALL_CHATS, SEARCH_CHATS } from "../../graphql/queries.ts/chats";
import { TOKEN } from "../../utils/token";
import ChatList from '../../components/Chats/List/ChatList';
import styles from '../../styles/App.module.scss';
import { NEW_MESSAGE } from "../../graphql/subscriptions/messages";
import { IChat } from "../../types/chat";


const ChatsPage: React.FC = () =>
{
    const router = useRouter();
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { chats, error: chats_error } = useTypedSelector(state => state.chat);
    const { messages, error: messages_error } = useTypedSelector(state => state.message);

    const { async_set_all_chats, async_set_all_messages, async_logout } = useActions();


    const input = {
        input: {
            // limit: 300,
            // offset: 0
        }
    }

    
    const /*[get_chats,*/ { loading: chats_loading, data: chats_data } = useQuery(GET_ALL_CHATS,   
    {
        //update: data => async_set_all_chats(data.get_all_chats),
        variables: input,
        onCompleted: data => async_set_all_chats(data.get_all_chats),
        onError: err => 
        {
            console.log(err);
            async_set_all_chats([]);

            if (err.message === TOKEN.ERROR_MESSAGE)
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        // fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });
    
    //useEffect(() => {async_set_all_chats(chats_data.get_all_chats)}, [messages, chats]);
    
    // if (!auth.user || !auth.is_auth) 
    // {
    //     //router.push(ROUTES.LOGIN);
    //     window.location.href = ROUTES.LOGIN;
    //     return null;
    // }

    const { data: message_data, error: message_error } = useSubscription(NEW_MESSAGE);

    // useEffect(() => 
    // {
    //     get_chats();
    // }, []);

    useEffect(() => 
    {
        if (message_error) console.log(message_error);
        if (message_data) 
        {
            async_set_all_messages([...messages, message_data.new_message]);
            //get_chats();
            
            //router.reload();

            //router.push(ROUTES.CHATS);

            // console.log(message_data.new_message)
            // console.log(chats)
            
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
                    await search_chats({ variables: { input: { username: e.target.value }}});
                }, 500)
        );
    }

    const [search_chats, { loading: search_chat_loading, 
                            data: search_chat_data }] = useLazyQuery(SEARCH_CHATS,
    {
        onCompleted: data => async_set_all_chats(data.search_chats),
        onError: err => 
        {
            console.log(err);
            async_set_all_chats([]);
            
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
    //     //let updated_chat: IChat = {...chat};
    //     let updated_chats: IChat[] = [...chats];
    //     let updated_chat = updated_chats.find((chat: IChat) => 
    //     {
    //         chat.id === message_data.new_message.chat_id
    //     });

    //     if (updated_chat !== undefined)
    //     {
    //         updated_chat = {
    //             ...updated_chat,
    //             messages: [...messages, message_data.new_message]
    //         }
    //     }

    //     let chat_index: number = updated_chats.findIndex((chat: IChat) => chat.id === updated_chat?.id);
        
    //     if (updated_chat !== undefined) updated_chats[chat_index] = updated_chat;

    //     console.log(updated_chat)
    //     console.log(updated_chats)
        
    //     //async_set_chat(updated_chat);
    //     //async_set_all_chats(updated_chats);
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
                                className={styles.page_title}
                                style={{ marginRight: 16, marginBottom: 6 }}
                                noWrap
                            >
                                Chats
                            </Typography>
                            <TextField
                                value={query}
                                onChange={search}
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
                        </Grid>
                    </Box>
                    <Grid>
                        {chats 
                            ? <ChatList chats={chats}/>
                            : <div>Chats not found!</div>
                        }
                    </Grid>
                </Card>
            </Grid>
        </MainLayout>
    )
}


export default ChatsPage;
