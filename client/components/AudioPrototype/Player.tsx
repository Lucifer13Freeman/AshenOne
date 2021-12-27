import { Grid, IconButton } from "@mui/material";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import React, { useEffect } from "react";
import { time_format } from "../functions/time_format";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import styles from "../styles/Player.module.scss";
import { ITrack } from "../types/track";
import TrackProgressBar from "./TrackProgressBar";

let audio: HTMLAudioElement;
let track: ITrack | null;
let track_current_time: number;
let track_duration: number;

const Player: React.FC = () =>
{
    const { is_pause, 
            active, 
            volume, 
            duration, 
            current_time,
            html_audio } = useTypedSelector((state: any) => state.player);

    const { pause_track, 
            play_track,
            set_active_track,
            set_duration, 
            set_current_time, 
            set_volume,
            set_html_audio } = useActions();


    //if (track && !active) set_active_track(track);
    if (active) track = active;
    /*else if (!active && html_audio)
    {
        //pause_track(); 
        html_audio.pause();
        track = null;
    }*/
    
    //if (duration) track_duration = duration;
    //if (current_time === 0.0) 
    //track_current_time = current_time;

    useEffect(() => 
    {
        if (!html_audio) set_html_audio(new Audio()); //audio = new Audio();//
        else 
        {
            set_audio();
            play();
        }

    }, [active]);


    const set_audio = () =>
    {
        if (track && html_audio)
        {
            html_audio.src = 'http://localhost:5000/' + track.audio;
            html_audio.volume = volume / 100;
            html_audio.onloadedmetadata = () => set_duration(Math.ceil(html_audio.duration));
            html_audio.ontimeupdate = () => set_current_time(Math.ceil(html_audio.currentTime));
        }
    }

    const play = () => 
    {
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

    const change_volume = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (html_audio) html_audio.volume = Number(e.target.value) / 100;
        set_volume(Number(e.target.value));
    }

    const change_current_time = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (html_audio) html_audio.currentTime = Number(e.target.value);
        set_current_time(Number(e.target.value));
    }

    if (!track) return null;
    
    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                { is_pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid 
                container 
                direction="column" 
                style={{width:200, margin: '0 20px'}}
            >
                <div>{track?.name}</div>
                <div 
                    style={{
                            fontSize: 12, 
                            color: 'gray'
                        }}
                >
                    {track?.artist}
                </div>
            </Grid>
            <TrackProgressBar
                current={current_time} 
                total={duration} 
                is_time={true}
                on_change={change_current_time}
                width={300}
            />
            <VolumeUp style={{ margin: '10px 0', marginLeft: 'auto' }}/>
            <TrackProgressBar 
                current={volume} 
                total={100} 
                on_change={change_volume} 
            />
        </div>
    );
}

export default Player;