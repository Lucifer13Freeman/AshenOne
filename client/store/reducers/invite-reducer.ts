import { IInviteState, 
        InviteAction, 
        InviteActionTypes, 
        IInvite } from "../../types/invite"


const initial_state: IInviteState = {

    invite: null,
    invites: [],
    // received_invites: [],
    // sent_invites: [],
    error: undefined
}

export const invite_reducer = (state = initial_state, action: InviteAction): IInviteState =>
{
switch (action.type) 
{
    case InviteActionTypes.CREATE_INVITE:
    {
        return {
            ...state, 
            invite: action.payload,
            invites: [action.payload, ...state.invites],
            //sent_invites: [action.payload, ...state.sent_invites],
            error: undefined
        }
    }
    case InviteActionTypes.CREATE_INVITE_ERROR:
    {
        return {
            ...state,
            error: action.payload
        }
    }
    case InviteActionTypes.SET_INVITE:
    {
        const update_invites = state.invites.map((invite: IInvite) => 
        { 
            if (invite.id === action.payload.id) invite = action.payload
            return invite 
        });

        // const update_sent_invites = state.sent_invites.map((invite: IInvite) => 
        // { 
        //     if (invite.id === action.payload.id) invite = action.payload
        //     return invite 
        // });

        return {
            ...state, 
            invite: action.payload,
            invites: update_invites,
            // sent_invites: update_sent_invites,
            error: undefined
        }
    }
    case InviteActionTypes.SET_INVITE_ERROR:
    {
        return {
            ...state,
            error: action.payload
        }
    }
    case InviteActionTypes.SET_ALL_INVITES:
    {
        return {
            ...state, 
            invites: action.payload,
            error: undefined
        }
    }
    case InviteActionTypes.SET_ALL_INVITES_ERROR:
    {
        return {
            ...state, 
            error: action.payload
        }
    }
    // case InviteActionTypes.SET_RECEIVED_INVITES:
    // {
    //     return {
    //         ...state, 
    //         received_invites: action.payload,
    //         error: undefined
    //     }
    // }
    // case InviteActionTypes.SET_RECEIVED_INVITES_ERROR:
    // {
    //     return {
    //         ...state, 
    //         error: action.payload
    //     }
    // }
    // case InviteActionTypes.SET_SENT_INVITES:
    // {
    //     return {
    //         ...state, 
    //         sent_invites: action.payload,
    //         error: undefined
    //     }
    // }
    // case InviteActionTypes.SET_SENT_INVITES_ERROR:
    // {
    //     return {
    //         ...state, 
    //         error: action.payload
    //     }
    // }
    case InviteActionTypes.DELETE_INVITE:
    {
        const updated_invites = state.invites.filter((invite: IInvite) => invite.id !== action.payload);

        return {
            ...state, 
            invite: null,
            invites: updated_invites,
            error: undefined
        }
    }
    case InviteActionTypes.DELETE_INVITE_ERROR:
    {
        return {
            ...state,
            error: action.payload
        }
    }
    default:
    {
        return state;
    }
}
}