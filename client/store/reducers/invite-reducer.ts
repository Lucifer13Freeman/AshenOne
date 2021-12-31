import { IInviteState, 
        InviteAction, 
        InviteActionTypes, 
        IInvite } from "../../types/invite"


const initial_state: IInviteState = {

    invite: null,
    invites: [],
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

        return {
            ...state, 
            invite: action.payload,
            invites: update_invites,
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