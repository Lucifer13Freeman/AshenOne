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
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { GET_GROUP } from "../../graphql/queries.ts/groups";
import { useActions } from "../../hooks/useAction";
import { TOKEN } from "../../utils/token";
import { ROUTES } from "../../utils/constants";
import MembersList from "../../components/Shared/Lists/MembersList";
import PostForm from "../../components/Posts/PostForm";
import Posts from "../../components/Posts/Posts";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import app_styles from '../../styles/App.module.scss';
import MainLayout from "../../layouts/MainLayout";
import GroupProfile from "../../components/Groups/GroupProfile";


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

    const { async_set_all_posts, async_set_group, async_logout } = useActions();


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
            async_set_group(null);
            async_set_all_posts([]);

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
                <GroupProfile group={group} />
                <Card className={app_styles.card} /*style={{width: 900}}*/>
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <Typography 
                                variant="h4"
                                color="primary"
                                className={app_styles.page_title}
                                style={{ marginRight: 16, marginBottom: 6 }}
                            >
                                Group Posts
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
                            {/* <MembersList members={group.members}/> */}
                        </Grid>
                    </Box>
                        {/* <Grid className={styles.posts_container}>
                            {posts.length > 0 
                                ? <PostList posts={posts}/>
                                : <div className={styles.no_posts}>Send your first post...</div>
                            }
                        </Grid> */}
                        
                </Card>
                <PostForm group_id={group_id}/>
                <Posts posts={posts} is_for_group={true}/>
            </Grid>
        </MainLayout>
    );
}

export default Group;