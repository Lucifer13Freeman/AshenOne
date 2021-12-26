import { GroupAction, GroupActionTypes, IGroupState } from "../../types/groups"


const initial_state: IGroupState = {
    group: null,
    groups: [],
    error: undefined//''
}


export const group_reducer = (state = initial_state, action: GroupAction): IGroupState =>
{
    switch (action.type) 
    {
        // case GroupActionTypes.CREATE_GROUP:
        // {
        //     return {
        //         ...state,
        //         groups: [...groups, action.payload],
        //         error: ''
        //     }
        // }
        // case GroupActionTypes.CREATE_GROUP_ERROR:
        // {
        //     return {
        //         ...state,
        //         error: action.payload
        //     }
        // }
        case GroupActionTypes.GET_GROUP:
        {
            return {
                ...state, 
                group: action.payload,
                error: undefined
            }
        }
        case GroupActionTypes.GET_GROUP_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case GroupActionTypes.GET_ALL_GROUPS:
        {
            return {
                ...state, 
                groups: action.payload,
                error: undefined
            }
        }
        case GroupActionTypes.GET_ALL_GROUPS_ERROR:
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