import { Card, Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { ITrack } from "../types/track";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useAction";
import axios from "axios";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { time_format } from "../functions/time_format";


interface TrackItemProps 
{
    track: ITrack;
    //active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track/*, active = false */}) =>
{
    const router = useRouter();

    const { play_track, 
            pause_track, 
            set_active_track,
            set_duration,
            set_current_time,
            set_html_audio } = useActions();

    const { is_pause, 
            active,
            volume, 
            duration, 
            current_time,
            html_audio } = useTypedSelector(state => state.player);

    //const dispatch = useDispatch() as NextThunkDispatch;

    /*useEffect(() => 
    {
        if (!html_audio) set_html_audio(new Audio()); //html_audio = new Audio();
        else 
        {
            set_audio();
            //play();
        }

    }, [active]);

    const set_audio = () =>
    {
        if (active && html_audio)
        {
            html_audio.src = 'http://localhost:5000/' + active.audio;
            html_audio.volume = volume / 100;
            html_audio.onloadedmetadata = () => set_duration(Math.ceil(html_audio.duration));
            html_audio.ontimeupdate = () => set_current_time(Math.ceil(html_audio.currentTime));
        }
    }*/

    const play = (e: React.MouseEvent<any>) =>
    {
        e.stopPropagation();
        set_active_track(track);
        //if (!html_audio) set_html_audio(new Audio());
        
        //play_track();

        //is_pause ? play_track() : pause_track();

        //set_audio();
        
        if (html_audio)
        {
            set_duration(Math.ceil(html_audio.duration));
            set_current_time(Math.ceil(html_audio.currentTime));
        }

        if (is_pause) 
        { 
            play_track();
            if (html_audio) html_audio.play();
        }
        else 
        {
            pause_track();
            if (html_audio) html_audio.pause();
        }
    }

    /*const pause = (e: React.MouseEvent<any>) =>
    {
        e.stopPropagation();
        set_active_track(track);
        pause_track();
    }*/

    const delete_track = async (/*e: React.MouseEvent<SVGAElement>*/) => 
    {
        //e.stopPropagation();
        //const response = await axios.delete('http://localhost:5000/tracks/' + track._id);
        await axios
                .delete('http://localhost:5000/tracks/' + track._id)
                .then(res => router.push('tracks/'))
                .catch(e => console.log(e));
                
        /*await dispatch(delete_track(track._id));
        router.push('tracks/');*/
    }

    //console.log(process.env.MAIN_URL);

    /*let icon;

    if (is_pause) icon = (<PlayArrow/>);
    else if (active === track && !is_pause) icon = (<Pause/>);
    else icon = (<PlayArrow/>);*/

    return (
        <Card 
            className={styles.track} 
            onClick={ () => router.push('tracks/' + track._id) }
        >
            <IconButton onClick={play}>
                {
                    active === track && !is_pause
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img 
                width={70} 
                height={70} 
                src={'http://localhost:5000/' + track.picture }
            />
            <Grid 
                container 
                direction="column" 
                style={{
                    width:200, 
                    margin: '0 20px'
                }}
            >
                <div>{track.name}</div>
                <div 
                    style={{
                        fontSize: 12, 
                        color: 'gray'
                    }}
                >
                    {track.artist}
                </div>
            </Grid>
            { active === track && !is_pause && 
            <div>
                { `${time_format(current_time)}/${time_format(duration)}` }
            </div>}
            <IconButton 
                onClick={ e => e.stopPropagation() } 
                style={{marginLeft: 'auto'}}
            >
                <Delete
                    onClick={delete_track}
                />
            </IconButton>
        </Card>
    );
}

export default TrackItem;