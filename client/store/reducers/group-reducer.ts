import { GroupAction, GroupActionTypes, IGroup, IGroupState } from "../../types/group"


const initial_state: IGroupState = {
    group: null,
    groups: [],
    error: undefined//''
}


export const group_reducer = (state = initial_state, action: GroupAction): IGroupState =>
{
    switch (action.type) 
    {
        case GroupActionTypes.CREATE_GROUP:
        {
            return {
                ...state,
                group: action.payload,
                groups: [...state.groups, action.payload],
                error: ''
            }
        }
        case GroupActionTypes.CREATE_GROUP_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case GroupActionTypes.SET_GROUP:
        {
            const update_groups = state.groups.map((group: IGroup) => 
            { 
                if (group.id === action.payload.id) group = action.payload
                return group 
            });

            return {
                ...state, 
                group: action.payload,
                groups: update_groups,
                error: undefined
            }
        }
        case GroupActionTypes.SET_GROUP_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case GroupActionTypes.SET_ALL_GROUPS:
        {
            return {
                ...state, 
                groups: action.payload,
                error: undefined
            }
        }
        case GroupActionTypes.SET_ALL_GROUPS_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        case GroupActionTypes.LEAVE_GROUP:
        {
            // const update_groups = state.groups.map((group: IGroup) => 
            // { 
            //     if (group.id === action.payload.id) group = action.payload
            //     return group 
            // });

            const update_groups = state.groups.filter((group: IGroup) => group.id !== action.payload.id);

            return {
                ...state, 
                group: null,
                groups: update_groups,
                error: undefined
            }
        }
        case GroupActionTypes.LEAVE_GROUP_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case GroupActionTypes.DELETE_GROUP:
        {
            const update_groups = state.groups.filter((group: IGroup) => group.id !== action.payload);
    
            return {
                ...state, 
                group: null,
                groups: update_groups,
                error: undefined
            }
        }
        case GroupActionTypes.DELETE_GROUP_ERROR:
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