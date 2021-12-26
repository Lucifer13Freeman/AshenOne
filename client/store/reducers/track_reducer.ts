import { ITrackState, TrackAction, TrackActionTypes } from "../../types/track"

const initial_state: ITrackState =
{
    tracks: [],
    error: ''
}

export const track_reducer = (state = initial_state, action: TrackAction): ITrackState =>
{
    switch (action.type) 
    {
        case TrackActionTypes.FETCH_TRACKS:
            
            return {
                    error: '',
                    tracks: action.payload
            }
          
            
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            
            return {
                    ...state, 
                    error: action.payload
            }


        /*case TrackActionTypes.DELETE_TRACK:
            
            return {
                    error: '',
                    tracks: action.payload
            }
              
                
        case TrackActionTypes.DELETE_TRACK_ERROR:
                
            return {
                    ...state, 
                    error: action.payload
            }*/


        default:

            return state;
    }
}