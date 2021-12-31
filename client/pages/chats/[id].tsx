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
import { LINKS, ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import MessageList from '../../components/Messages/List/MessageList';
import { GET_ALL_MESSAGES, SEARCH_MESSAGES } from "../../graphql/queries.ts/messages";
import { GetServerSideProps } from "next";
import styles from '../../styles/Messages.module.scss';
import app_styles from '../../styles/App.module.scss';
import { useInput } from "../../hooks/useInput";
import { useEffect, useState } from "react";
import { DELETED_MESSAGE, NEW_MESSAGE, NEW_REACTION, UPDATED_MESSAGE } from "../../graphql/subscriptions/messages";
import { GET_CHAT } from "../../graphql/queries.ts/chats";
import ChatMembers from '../../components/Chats/Members/ChatMembers';
import MessageForm from '../../components/Messages/MessageForm';
import Messages from "../../components/Messages/Messages";
//import Chat from '../../components/Chats/Chat';
import { IChat } from "../../types/chat";
import { makeStyles, createStyles } from "@mui/styles";
import ItemsSelect from "../../components/Shared/Selects/ItemsSelect";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ConfirmDialog from "../../components/Shared/Dialogs/ConfirmDialog";
import { REMOVE_CHAT_MEMBER } from "../../graphql/mutations/chats";
import { IUser } from "../../types/user";
import InviteUsers from "../../components/Invites/InviteUsers";


const useStyles = makeStyles(() => 
    createStyles(
    {
        root: { borderRadius: 20 }
    }
));


const ChatPage: React.FC = () =>
{
    const router = useRouter();

    const chat_id = router?.query?.id;
    const input = { input: { id: chat_id } }

    const [query, set_query] = useState<string>('');
    const [timer, set_timer]: any = useState(null);
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { chat, chats, error: chat_error } = useTypedSelector(state => state.chat);
    const { messages, error: messages_error } = useTypedSelector(state => state.message);

    const { async_set_all_messages, async_set_chat, 
        async_create_message, async_set_message,
        async_delete_message, async_set_reaction,
        async_logout, async_leave_chat } = useActions();


    const /*[get_current_chat, */{ loading: chat_loading, data: chat_data } = useQuery(GET_CHAT,   
    {
        variables: input,
        onCompleted: data => 
        {
            //console.log(data.get_chat)
            async_set_chat(data.get_chat);
            async_set_all_messages(data.get_chat.messages);
        },
        onError: err => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            { 
                router.push(ROUTES.LOGIN);
                async_set_chat(null);
                async_set_all_messages([]);
                async_logout();
            }
        },
        // fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    

    const [search_messages, { loading: search_message_loading, 
        data: search_message_data }] = useLazyQuery(SEARCH_MESSAGES,
    {
        onCompleted: data => async_set_all_messages(data.search_messages),
        onError: err => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_set_all_messages([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });


    const { data: message_data, error: message_error } = useSubscription(NEW_MESSAGE);
    const { data: updated_message_data, error: updated_message_error } = useSubscription(UPDATED_MESSAGE);
    const { data: deleted_message_data, error: deleted_message_error } = useSubscription(DELETED_MESSAGE);
    const { data: reaction_data, error: reaction_error } = useSubscription(NEW_REACTION);

    // useEffect(() => 
    // {
    //     if (message_error) console.log(message_error);
    //     if (message_data) async_create_message(message_data.new_message);
    // }, [message_data, message_error]);

    useEffect(() => 
    {
        console.log(message_data)
        if (message_error) console.error(message_error);
        if (message_data) async_set_all_messages([...messages, message_data.new_message]); 
        // { 
        //     //async_create_message(message_data.new_message);//
        //     /*if (message_data.is_create)*/ async_set_all_messages([...messages, message_data.new_message]); //async_create_message(message_data.new_message); //async_set_all_messages([...messages, message_data.new_message]);

        // }
    }, [message_data, message_error]);

    useEffect(() => 
    {
        if (updated_message_error) console.error(updated_message_error);
        if (updated_message_data) async_set_message(updated_message_data.updated_message);
    }, [updated_message_data, updated_message_error]);

    useEffect(() => 
    {
        if (deleted_message_error) console.error(deleted_message_error);
        if (deleted_message_data) async_delete_message(deleted_message_data.deleted_message);
    }, [deleted_message_data, deleted_message_error]);

    useEffect(() => 
    {
        if (reaction_error) console.error(reaction_error);
        if (reaction_data) async_set_reaction(reaction_data.new_reaction);
    }, [reaction_data, reaction_error]);

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

    // const [gql_remove_chat_member, { loading: remove_chat_member_loading }] = useMutation(REMOVE_CHAT_MEMBER, 
    // {
    //     onCompleted: (data) => 
    //     {
    //         const is_leave = data.remove_chat_member.members.find((mem: IUser) => mem.id === auth.user.id);
    //         if (is_leave === undefined) async_leave_chat(data.remove_chat_member);
    //         else async_set_chat(data.remove_chat_member);
    //     },
    //     onError: (err) => 
    //     {
    //         console.log(err);
                
    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         {
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     }
    // });
    
    // const remove_chat_member = (id: string) =>
    // {
    //     // e.stopPropagation();
    //     const input = { input: { 
    //         chat_id: chat.id,
    //         user_id: id
    //     }}
    //     gql_remove_chat_member({ variables: input });
    // }

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

    //     async_set_chat(updated_chat);
    //     async_set_all_chats(updated_chats);

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
                            <Grid container direction="row">
                                <ChatMembers /*chat={chat}*//>
                                <InviteUsers chat_id={chat?.id}/>
                            </Grid>
                            {/* <ItemsSelect>
                            { chat?.members && chat?.members.map(({ id, username, avatar }: any) => (
                                <ListItem
                                    button
                                    key={id}
                                >
                                    <ListItemIcon onClick={() => router.push(ROUTES.PEOPLE + id)}>
                                        <Avatar
                                            alt={username}
                                            src={LINKS.STATIC_FILES_LINK + avatar}
                                            style={{ width: 30, height: 30 }}
                                            onClick={() => router.push(ROUTES.PEOPLE + id)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={username} onClick={() => router.push(ROUTES.PEOPLE + id)}/>
                                    { id !== auth.user.id && auth.user.id === chat?.admin_id &&
                                        <Grid style={{ marginLeft: 10 }}>
                                            <ConfirmDialog 
                                                button_title='Remove' 
                                                dialog_title='Remove member'
                                                button_variant='contained'
                                                button_type="remove"
                                            >
                                                <Button onClick={() => remove_chat_member(id)}>Remove</Button>
                                                <Button>Cancel</Button>
                                            </ConfirmDialog>
                                        </Grid>
                                        // <IconButton style={{ marginLeft: 10 }}>
                                        //     <HighlightOffRoundedIcon/>
                                        // </IconButton> 
                                        }
                                    { id == auth.user.id && 
                                        <Grid style={{ marginLeft: 10 }}>
                                            <ConfirmDialog 
                                                button_title='Leave' 
                                                dialog_title='Leave chat'
                                                button_variant='contained'
                                                button_type="leave"
                                            >
                                                <Button onClick={() => remove_chat_member(id)}>Leave</Button>
                                                <Button>Cancel</Button>
                                            </ConfirmDialog>
                                        </Grid>
                                    }
                                </ListItem> )) }
                            </ItemsSelect> */}
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