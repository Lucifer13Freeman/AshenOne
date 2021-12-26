import { Box, Grid } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IComment } from "../types/track";
import CommentItem from "./CommentItem";

interface CommentListProps 
{
    comments: IComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) =>
{
    const router = useRouter();

    /*useEffect(() => 
    {
        //const response = await axios.get('http://localhost:5000/tracks/' + params.id + 'comment');

        //comments = response.data;

        //router.push('/comment');

    }, [comments]); */

    return (
        <Grid container direction="column">
            <Box p={2}>
                <div>
                    { comments.slice(0).reverse().map((comment: IComment) => 
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                        />
                    ) }
                </div>
            </Box>
        </Grid>
    );
}

export default CommentList;

/*export const getServerSideProps: GetServerSideProps = async ({ params }: any) => 
{
    const response = await axios.get('http://localhost:5000/tracks/' + params.id + 'comment')

    return {
        props: {
            comments: response.data
        }
    }
}*/