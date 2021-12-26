
export interface IComment 
{
    _id: string;
    username: string;
    text: string;
    trackId: string
}

export interface ITrack 
{
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
}

export interface ITrackState 
{ 
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes
{
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    DELETE_TRACK = 'DELETE_TRACK',
    DELETE_TRACK_ERROR = 'DELETE_TRACK_ERROR'
}

interface IFetchTracksAction
{
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[]
}

interface IFetchTracksErrorAction
{
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

/*interface IDeleteTrackAction
{
    type: TrackActionTypes.DELETE_TRACK;
    payload: ITrack[]
}

interface IDeleteTrackErrorAction
{
    type: TrackActionTypes.DELETE_TRACK_ERROR;
    payload: string
}*/

export type TrackAction = IFetchTracksAction | 
                        IFetchTracksErrorAction; 
                        /*|IDeleteTrackAction |
                        IDeleteTrackErrorAction;*/