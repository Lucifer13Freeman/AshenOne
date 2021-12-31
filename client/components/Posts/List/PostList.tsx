import { Box, Grid } from "@mui/material";
import React from "react";
import { IPost } from "../../../types/post";
import PostItem from "../Item/PostItem";


interface PostListProps 
{
    posts: IPost[] | null;
    is_for_group?: boolean;
}

const PostList: React.FC<PostListProps > = ({ posts, is_for_group = false }) =>
{
    // const [expanded, set_expanded] = React.useState(false);
    // const handle_expand_click = () => { set_expanded(!expanded); };

    return (
        <Grid container direction="column">
            <Box p={2}>
                {posts && posts.map(post => 
                    <PostItem 
                        key={post.id}
                        post={post}
                        is_for_group={is_for_group}
                        // expanded={expanded}
                        // set_expanded={set_expanded}
                    />
                )}
            </Box>
        </Grid>
    );
}

export default PostList;