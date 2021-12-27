import { Card, Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { IComment, ITrack } from "../types/track";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useAction";
import axios from "axios";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { time_format } from "../functions/time_format";
// import { NextThunkDispatch } from "../store";
import { useDispatch } from "react-redux";


interface CommentItemProps 
{
    comment: IComment;
}

const CommentItem: React.FC<CommentItemProps > = ({ comment }) =>
{
    const router = useRouter();
    const dispatch = useDispatch() as NextThunkDispatch;


    const delete_comment = async () => 
    {
        //e.stopPropagation();
        await axios
                .delete('http://localhost:5000/tracks/comment/' + comment._id)
                //.then(res => router.push('/tracks/' + comment.trackId))
                .catch(e => console.log(e));

        //await axios.get('http://localhost:5000' + router.pathname + '/comment');

        //console.log(router.pathname + '/comment');

        //await dispatch(delete_comment(comment._id));
    }

    return (
        <Card style={{margin: '10px 0'}}>
            <div>
                <div>Author: {comment.username}</div>
                <div>Comment: {comment.text}</div>
            </div>
            <IconButton
                style={{marginLeft: 'auto'}}
            >
                <Delete
                    onClick={delete_comment}
                />
            </IconButton>
        </Card>
    );
}

export default CommentItem;