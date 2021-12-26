import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { auth_reducer } from "./auth-reducer";
import { chat_reducer } from "./chat-reducer";
import { subscription_reducer } from "./subscription-reducer";
import { message_reducer } from "./message-reducer";
import { player_reducer } from "./player_reducer";
import { track_reducer } from "./track_reducer";
import { user_reducer } from "./user-reducer";
import { report_reducer } from "./report-reducer";
import { post_reducer } from "./post-reducer";
import { comment_reducer } from "./comment-reducer";
import { group_reducer } from "./group-reducer";


const combined_reducer = combineReducers(
{  
    auth: auth_reducer,
    user: user_reducer,
    chat: chat_reducer,
    message: message_reducer,
    subscription: subscription_reducer,
    post: post_reducer,
    comment: comment_reducer,
    group: group_reducer,
    report: report_reducer
    // player: player_reducer,
    // track: track_reducer,
});


export const root_reducer = (state: any, action: AnyAction) => 
{
    if (action.type === HYDRATE) 
    {
        const next_state = {
            
            ...state,
            ...action.payload
        }
        
        //if (state.count) next_state.count = state.count

        if (state.auth) next_state.auth = state.auth;

        return next_state
    } 
    else return combined_reducer(state, action)
}

export type RootState = ReturnType<typeof root_reducer>;

//export type RootState = ReturnType<typeof root_reducer>;