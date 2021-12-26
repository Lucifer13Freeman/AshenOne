import { ITrack } from "./track";


export interface IPlayerState 
{
    active: null | ITrack;
    volume: number;
    duration: number;
    current_time: number;
    is_pause: boolean;
    html_audio: null | HTMLAudioElement;
}

export enum PlayerActionTypes
{
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    SET_HTML_AUDIO = "SET_HTML_AUDIO"
}

interface IPlayAction
{
    type: PlayerActionTypes.PLAY
}

interface IPauseAction
{
    type: PlayerActionTypes.PAUSE
}

interface ISetActiveAction
{
    type: PlayerActionTypes.SET_ACTIVE,
    payload: ITrack;
}

interface ISetDurationAction
{
    type: PlayerActionTypes.SET_DURATION,
    payload: number;
}

interface ISetCurrentTimeAction
{
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number;
}

interface ISetVolumeAction
{
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}

interface ISetHTMLAudioAction
{
    type: PlayerActionTypes.SET_HTML_AUDIO,
    payload: HTMLAudioElement;
}

export type PlayerAction = IPlayAction |
                            IPauseAction |
                            ISetActiveAction |
                            ISetDurationAction |
                            ISetCurrentTimeAction |
                            ISetVolumeAction |
                            ISetHTMLAudioAction;
                            