import { Box, Grid } from "@mui/material";
import React from "react";
import { IComment } from "../../../store/types/comment";
import CommentItem from "../Item/CommentItem";
import styles from '../../../styles/Comments.module.scss';


interface CommentListProps 
{
    comments: IComment[] | null;
    post_id: string;
}

const CommentList: React.FC<CommentListProps > = ({ comments, post_id }) =>
{
    return (
        <Grid container direction="column"
            className={styles.comments_container}>
            <Box p={2}>
                {comments && comments.map(comment => 
                   comment.post_id === post_id && 
                    <CommentItem 
                        key={comment.id}
                        comment={comment}
                    />
                )}
            </Box>
        </Grid>
    );
}


export default CommentList;