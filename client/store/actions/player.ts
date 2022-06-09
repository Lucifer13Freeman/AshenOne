import { PlayerAction, PlayerActionTypes } from "../types/player";
import { ITrack } from "../types/track";


export const play_track = (): PlayerAction => 
{
    return { type: PlayerActionTypes.PLAY }
}

export const pause_track = (): PlayerAction => 
{
    return { type: PlayerActionTypes.PAUSE }
}

export const set_active_track = (payload: ITrack): PlayerAction => 
{
    return { type: PlayerActionTypes.SET_ACTIVE, payload }
}

export const set_duration = (payload: number): PlayerAction => 
{
    return { type: PlayerActionTypes.SET_DURATION, payload }
}

export const set_current_time = (payload: number): PlayerAction => 
{
    return { type: PlayerActionTypes.SET_CURRENT_TIME, payload }
}

export const set_volume = (payload: number): PlayerAction => 
{
    return { type: PlayerActionTypes.SET_VOLUME, payload }
}

export const set_html_audio = (payload: HTMLAudioElement): PlayerAction => 
{
    return { type: PlayerActionTypes.SET_HTML_AUDIO, payload }
}