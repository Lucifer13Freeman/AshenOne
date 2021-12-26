import axios from "axios"
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"


export const fetch_tracks = () =>
{
    return async (dispatch: Dispatch<TrackAction>) =>
    {
        try
        {
            const response = await axios.get('http://localhost:5000/tracks');
            
            dispatch(
            {
                type: TrackActionTypes.FETCH_TRACKS,
                payload: response.data
            });
        } 
        catch (e) 
        {
            dispatch(
            { 
                type: TrackActionTypes.FETCH_TRACKS_ERROR, 
                payload: 'Track loading error!'
            });
        }
    }
}

export const search_tracks = (query: string) =>
{
    return async (dispatch: Dispatch<TrackAction>) =>
    {
        try 
        {
            const response = await axios.get('http://localhost:5000/tracks/search?query=' + query);
            
            dispatch(
            {
                type: TrackActionTypes.FETCH_TRACKS,
                payload: response.data
            });
        } 
        catch (e) 
        {
            dispatch(
            { 
                type: TrackActionTypes.FETCH_TRACKS_ERROR, 
                payload: 'Track loading error!'
            });
        }
    }
}

/*export const delete_track = async (id: string): TrackAction => 
{
    const response = await axios.delete('http://localhost:5000/tracks/' + id);

    return { 
        type: PlayerActionTypes.DELETE_TRACK, 
        payload: response.data 
    }
}*/

/*export const remove = (id:any) => (dispatch:any) =>
{
    axios
        .delete(`/api/posts/${id}`)
        .then(() => dispatch(
        {
            type: TrackActionTypes.DELETE_TRACK,
            payload: id
        }));
}*/


/*export const delete_track = (id: string) =>
{
    return async (dispatch: Dispatch<TrackAction>) =>
    {
        try 
        {
            const response = await axios.delete('http://localhost:5000/tracks/' + id);
            
            dispatch(
            {
                type: TrackActionTypes.DELETE_TRACK,
                payload: response.data
            });
        } 
        catch (e) 
        {
            dispatch(
            { 
                type: TrackActionTypes.DELETE_TRACK_ERROR, 
                payload: 'Track deleting error!'
            });
        }
    }
}*/