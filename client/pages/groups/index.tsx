import { Box, 
    Button, 
    Card, 
    Grid, 
    TextField, 
    InputAdornment, 
    Typography, 
    IconButton} from "@mui/material";
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
import { GET_ALL_GROUPS, SEARCH_GROUPS } from "../../graphql/queries.ts/groups";
import { TOKEN } from "../../utils/token";
import GroupList from '../../components/Groups/List/GroupList';
import styles from '../../styles/App.module.scss';
import { NEW_MESSAGE } from "../../graphql/subscriptions/messages";
import { IGroup } from "../../types/group";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CreateGroupDialog from "../../components/Groups/CreateGroupDialog";


const GroupsPage: React.FC = () =>
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { groups, error: groups_error } = useTypedSelector(state => state.group);
    const { messages, error: messages_error } = useTypedSelector(state => state.message);

    const { async_set_all_groups, async_set_all_messages, async_logout } = useActions();


    const input = {
        input: {
            // limit: 300,
            // offset: 0
        }
    }


    const { loading: groups_loading, data: groups_data } = useQuery(GET_ALL_GROUPS,   
    {
        //update: data => async_set_all_groups(data.get_all_groups),
        variables: input,
        onCompleted: data => async_set_all_groups(data.get_all_groups),
        onError: err => 
        {
            console.log(err);
            async_set_all_groups([]);
            
            if (err.message === TOKEN.ERROR_MESSAGE)
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        // fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

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
                    await search_groups({ variables: { input: { username: e.target.value }}});
                }, 500)
        );
    }

    const [search_groups, { loading: search_group_loading, 
                            data: search_group_data }] = useLazyQuery(SEARCH_GROUPS,
    {
        onCompleted: data => async_set_all_groups(data.search_groups),
        onError: err => 
        {
            console.log(err);
            async_set_all_groups([]);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        nextFetchPolicy: "cache-first"
    });

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
                                Groups
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
                            <CreateGroupDialog />
                            {/* <IconButton> */}
                                {/* <Button>
                                    <Typography 
                                        variant="h6"
                                        color="primary"
                                        className={styles.page_title}
                                        // style={{ marginRight: 16, marginBottom: 6 }}
                                        noWrap
                                    >
                                        Create
                                    </Typography>
                                    <AddBoxRoundedIcon/>
                                </Button> */}
                            {/* </IconButton> */}
                        </Grid>
                    </Box>
                    <Grid>
                        {groups 
                            ? <GroupList groups={groups}/>
                            : <div>Groups not found!</div>
                        }
                    </Grid>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default GroupsPage;
