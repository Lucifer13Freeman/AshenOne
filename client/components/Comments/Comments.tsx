import { useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { NEW_COMMENT } from "../../graphql/subscriptions/comments";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from '../../styles/Comments.module.scss';
import { IComment } from "../../types/comment";
import CommentList from './List/CommentList';


interface CommentsProps
{
    comments: IComment[];
    post_id: string;
    //chat_id?: string | string[];
}

const Comments: React.FC<CommentsProps> = ({ comments, post_id }) =>
{
    // //const { chat, error: chat_error } = useTypedSelector(state => state.chat);
    // const { state_comments, error: comments_error } = useTypedSelector(state => state.comment);
    // const { state_post, error: state_post_error } = useTypedSelector(state => state.post);
    
    // const { async_set_post, async_create_comment, async_set_all_comments } = useActions();


    // const { data: comment_data, error: comment_error } = useSubscription(NEW_COMMENT);

    // useEffect(() => 
    // {
    //     if (comment_error) console.log(comment_error);
    //     if (comment_data) async_create_comment(comment_data.new_comment);
    // }, [comment_data, comment_error]);


    // const { data: post_data, error: post_error } = useSubscription(NEW_POST);

    // useEffect(() => 
    // {
    //     if (post_error) console.log(post_error);
    //     if (post_data) async_set_all_posts([...posts, post_data.new_post]);
    // }, [post_data, post_error]);
    
    return (
        <Grid container direction='column'>
            { comments.length > 0 
                ? <CommentList comments={/*comment_data.new_comment 
                                        ? [...comments, comment_data.new_comment] 
                                        :*/ comments} post_id={post_id}/>
                : <div className={styles.no_comments}>Send your first comment...</div>
            }
        </Grid>
    );
}


export default Comments;