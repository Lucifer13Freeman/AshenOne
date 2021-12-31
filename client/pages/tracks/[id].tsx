import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CommentList from "../../components/CommentList";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import { IComment, ITrack } from "../../types/track";

const TrackPage = ({ server_track }: any) =>
{
    const [track, set_track] = useState<ITrack>(server_track);

    const router = useRouter();

    const username = useInput('');
    const text = useInput('');

    /*useEffect(() => 
    {
        //const response = await 
        
        //axios.get('http://localhost:5000/tracks/' + track._id + 'comment');

        //comments = response.data;

        /*router.push('http://localhost:5000/tracks/' + track._id + '/comment');
        router.push('http://localhost:5000/tracks/' + track._id);*/

    //}, [track.comments]);

    //const val = { value: '' }

    //const reset_value = () => useState({value: ''});

    const add_comment = async () => 
    {
        try 
        {
            const response = await axios.post('http://localhost:5000/tracks/comment',
            {
                username: username.value,
                text: text.value,
                trackId: track._id
            });

            set_track({ ...track, comments: [...track.comments, response.data] });
        } 
        catch (e) 
        {
            console.log(e);
        }
    }

    return (
        <MainLayout 
            title={'AshenOne Music - ' + track.name + ' - ' + track.artist}
            keywords={'AshenOne, Music, ' + track.name + ', ' + track.artist}
        >
            <Button 
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={ () => router.push('/tracks') }
            >
                To list
            </Button>
            <Grid container style={{ margin: '20px 0' }}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
                <div style={{ marginLeft: 30 }}>
                    <h1>Track: {track.name}</h1>
                    <h1>Artist: {track.artist}</h1>
                    <h1>Listens: {track.listens}</h1>
                </div>
            </Grid>
            <h1>Text of the track</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    {...username}
                    label="Your name"
                    fullWidth
                />
                <TextField
                    {...text}
                    label="Comment"
                    multiline
                    rows={4}
                    fullWidth
                />
                <Button onClick={add_comment}>Send</Button>
            </Grid>
            <CommentList
                comments={track.comments}
            />
        </MainLayout>
    );
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => 
{
    const response = await axios.get('http://localhost:5000/tracks/' + params.id);

    return {
        props: {
            server_track: response.data
        }
    }
}