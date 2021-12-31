import { useLazyQuery, useQuery } from "@apollo/client";
import { Box, Card, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Posts from "../../components/Posts/Posts";
import { GET_ALL_POSTS, SEARCH_POSTS } from "../../graphql/queries.ts/posts";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { IComment } from "../../types/comment";
import { IPost } from "../../types/post";
import { ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from '../../styles/App.module.scss';
import { useState } from "react";
import PostList from "../../components/Posts/List/PostList";


const FeedPage: React.FC = () =>
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { user, error: users_error } = useTypedSelector(state => state.user);
    const { posts, error: posts_error } = useTypedSelector(state => state.post);
    const { async_set_user, async_logout, async_set_all_posts, async_set_all_comments,
            async_set_subscription, async_set_all_subscriptions } = useActions();
   
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
                    await search_posts({ variables: { input: { is_for_followers: true, 
                                                        is_for_group_members: true,
                                                        is_order_by_desc: true,
                                                        text: e.target.value }}});
                }, 500)
        );
    }
        
    const [search_posts, { loading: search_post_loading, 
                            data: search_post_data }] = useLazyQuery(SEARCH_POSTS,
    {
        onCompleted: data => async_set_all_posts(data.search_posts),
        onError: err => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_set_all_posts([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });

    const { loading: posts_loading, data: posts_data } = useQuery(GET_ALL_POSTS,   
    {
        variables: { input: { is_for_followers: true, 
                            is_for_group_members: true,
                            is_order_by_desc: true } },
        onCompleted: data => 
        {
            const posts = data.get_all_posts;
            async_set_all_posts(posts);
                
            if (posts)
            {
                const comments: IComment[] = [].concat(...posts.map((post: IPost) => post.comments));
                async_set_all_comments(comments);
            }
        },
        onError: err => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                // router.reload();
                router.push(ROUTES.LOGIN);
                async_set_user(null);
                async_logout();
                //window.location.href = ROUTES.LOGIN;
            }
        },
        nextFetchPolicy: "cache-first"
    });
    
    return(
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card 
                    className={styles.card}
                    //style={{width: 900/*'80vw'*/}}
                >
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <Typography 
                                variant="h4"
                                color="primary"
                                className={styles.page_title}
                                style={{ marginRight: 16, marginBottom: 6 }}
                                noWrap
                            >
                                Feed
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
                    </Card>
                    <Grid>
                        { posts.length > 0 
                            ? <PostList posts={posts}/>
                            : <div>Posts not found!</div>
                        }
                    </Grid>
            </Grid>
        </MainLayout>
    );
}

export default FeedPage;