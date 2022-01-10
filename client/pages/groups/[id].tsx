import { Box, 
    Card, 
    Grid, Input, IconButton, InputLabel, 
    TextField,
    Typography,
    InputAdornment, 
    NoSsr } from "@mui/material";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { GET_GROUP } from "../../graphql/queries.ts/groups";
import { useActions } from "../../hooks/useAction";
import { TOKEN } from "../../utils/token";
import { ACCESS, ROUTES } from "../../utils/constants";
import MembersSelect from "../../components/Shared/Selects/MembersSelect";
import PostForm from "../../components/Posts/PostForm";
import Posts from "../../components/Posts/Posts";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import app_styles from '../../styles/App.module.scss';
import MainLayout from "../../layouts/MainLayout";
import GroupProfile from "../../components/Groups/GroupProfile";
import { IUser } from "../../types/user";
import { SEARCH_GROUP_POSTS } from "../../graphql/queries.ts/posts";
import ItemsSelect from "../../components/Shared/Selects/ItemsSelect";
import { REMOVE_GROUP_MEMBER } from "../../graphql/mutations/groups";
import GroupMembers from "../../components/Groups/Members/GroupMembers";


// interface GroupProps
// {
//     group_id?: string | string[];
// }


const Group: React.FC = () => 
{
    const router = useRouter();

    const group_id = router.query.id;
    const input = { input: { id: group_id } }

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { group, groups, error: group_error } = useTypedSelector(state => state.group);
    const { posts, error: posts_error } = useTypedSelector(state => state.post);

    const { async_set_all_posts, async_set_group, 
            async_logout, async_leave_group } = useActions();

    const { loading: group_loading, data: group_data } = useQuery(GET_GROUP,   
    {
        variables: input,
        onCompleted: data => 
        {
            async_set_group(data.get_group);
            async_set_all_posts(data.get_group.posts);
        },
        onError: err => 
        {
            console.log(err);
            router.push(ROUTES.GROUPS);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_set_group(null);
                async_set_all_posts([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });

    let is_member = group?.members.find((mem: IUser) => mem.id === auth.user?.id) !== undefined;

    useEffect(() => 
    {
        is_member = group?.members.find((mem: IUser) => mem.id === auth.user?.id) !== undefined;
    }, [group]);

    
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
                    await search_group_posts({ variables: { 
                                                input: { group_id: group.id, 
                                                text: e.target.value }}});
                }, 500)
        );
    }

    const [search_group_posts, { loading: search_message_loading, 
                            data: search_message_data }] = useLazyQuery(SEARCH_GROUP_POSTS,
    {
        onCompleted: data => async_set_all_posts(data.search_group_posts),
        onError: err => 
        {
            console.log(err);
            router.push(ROUTES.GROUPS);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_set_all_posts([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });

    
    return (
        <MainLayout>  
            <Grid container justifyContent='center' style={{maxWidth: 900}} /*direction='column' flexWrap='nowrap'*/>
                <GroupProfile group={group} />
                {!group?.is_private || is_member ? 
                <Card className={app_styles.card} style={{width: 400}} raised>
                    <Box p={2}>
                        <Grid container direction="row" >
                            <Typography 
                                variant="h4"
                                color="primary"
                                className={app_styles.page_title}
                                style={{ marginRight: 16, marginBottom: 6 }}
                            >
                                Group Posts
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
                            <GroupMembers group={group}/>
                        </Grid>
                    </Box>
                        {/* <Grid className={styles.posts_container}>
                            {posts.length > 0 
                                ? <PostList posts={posts}/>
                                : <div className={styles.no_posts}>Send your first post...</div>
                            }
                        </Grid> */}
                        
                </Card> : null}
                {is_member && <PostForm group_id={group_id}/>}
                {!group?.is_private || is_member ? <Posts posts={posts} is_for_group={true}/> : null}
            </Grid>
        </MainLayout>
    );
}

export default Group;