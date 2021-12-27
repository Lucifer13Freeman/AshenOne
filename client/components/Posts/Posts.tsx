import { useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { NEW_LIKE_POST, NEW_POST } from "../../graphql/subscriptions/posts";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from '../../styles/Posts.module.scss';
import { IPost } from "../../types/post";
import PostList from './List/PostList';
import PostForm from "./PostForm";


interface PostsProps
{
    posts: IPost[];
    is_for_group?: boolean;
    //chat_id?: string | string[];
}

const Posts: React.FC<PostsProps> = ({ posts, is_for_group = false }) =>
{
    // const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    const { posts: state_posts, error: posts_error } = useTypedSelector(state => state.post);
    const { async_set_all_posts, async_create_post } = useActions();

    const { data: post_data, error: post_error } = useSubscription(NEW_POST);

    useEffect(() => 
    {
        if (post_error) console.log(post_error);
        if (post_data) async_create_post(post_data.new_post);
    }, [post_data, post_error]);
    
    return (
        // <>
            <Grid>
                { posts?.length > 0 
                    ? <PostList posts={posts} is_for_group={is_for_group}/>
                    : <div className={styles.no_posts}>Posts not found...</div>
                }
            </Grid>
        // </>
    );
}


export default Posts;