import { Box, 
    Button, 
    Card, 
    Grid, 
    TextField, Input, InputLabel, FormControl, 
    Typography,
    InputAdornment } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { wrapper } from "../../store";
import UserList from '../../components/Users/List/UserList';
import { useLazyQuery, useQuery } from "@apollo/client";
import { useActions } from "../../hooks/useAction";
import { Component, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { AppContext } from "next/app";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { GET_ALL_USERS, SEARCH_USERS } from "../../graphql/queries.ts/users";
import { TOKEN } from "../../utils/token";
import styles from '../../styles/App.module.scss';
import { GET_ALL_SENT_INVITES } from "../../graphql/queries.ts/invites";


interface UsersProps
{
    is_for_invites?: boolean;
    chat_id?: string;
    group_id?: string;
}

const Users: React.FC<UsersProps> = ({ is_for_invites, chat_id, group_id }) =>
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { users, error: users_error } = useTypedSelector(state => state.user);
    const { invites, error: invites_error } = useTypedSelector(state => state.invite);

    const { async_set_all_users, async_logout, async_set_all_invites } = useActions();

    const input = {
        input: {
            // limit: 300,
            // offset: 0
        }
    }

    // const search_input = {
    //     input: {
    //         username: ''
    //     }
    // }

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

    const [search_users, { loading: search_user_loading, 
                            data: search_user_data }] = useLazyQuery(SEARCH_USERS,
    {
        onCompleted: data => async_set_all_users(data.search_users),
        onError: err => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_set_all_users([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });

    const { loading: users_loading, data: users_data } = useQuery(GET_ALL_USERS,   
    {
        variables: input,
        onCompleted: data => async_set_all_users(data.get_all_users),
        onError: err => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_set_all_users([]);
                async_logout();
            }
        },
        // fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const [get_sent_invites, { loading: invites_loading, data: invites_data }] = useLazyQuery(GET_ALL_SENT_INVITES,   
    {
        variables: input,
        onCompleted: data => async_set_all_invites(data.get_sent_invites),
        onError: err => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            { 
                router.push(ROUTES.LOGIN);
                async_set_all_invites([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });

    useEffect(() => 
    {
        if (is_for_invites)
        {
            if (group_id) get_sent_invites({ variables: { input: { group_id }}});
            else if (chat_id) get_sent_invites({ variables: { input: { chat_id }}});
        } 
    }, []);

    // useEffect(() => 
    // {
    //     if (is_for_invites)
    //     {
    //         if (group_id) get_sent_invites({ variables: { input: { group_id }}});
    //         else if (chat_id) get_sent_invites({ variables: { input: { chat_id }}});
    //     } 
    // }, [invites_data])


    // if (!auth.user || !auth.is_auth) 
    // {
    //     //router.push(ROUTES.LOGIN);
    //     window.location.href = ROUTES.LOGIN;
    //     return null;
    // }


    return (
            <Grid container justifyContent='center'>
                <Card style={{width: 900/*'80vw'*/}}>
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <Typography 
                                variant="h4"
                                color="primary"
                                className={styles.page_title}
                                style={{ marginRight: 16, marginBottom: 6 }}
                                noWrap
                            >
                                People
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
                        {users ? 
                            <UserList 
                                users={users} 
                                is_for_invites={is_for_invites} 
                                chat_id={chat_id} 
                                group_id={group_id}
                                invites={invites}
                            />
                            : <div>Users not found!</div>
                        }
                    </Grid>
                </Card>
            </Grid>
    )
}

export default Users;
