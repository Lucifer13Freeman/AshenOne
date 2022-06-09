import { IUser, IUserState, UserAction, UserActionTypes } from '../types/user';


const initial_state: IUserState = {

    user: null,
    users: [],
    error: undefined//''
}


export const user_reducer = (state = initial_state, action: UserAction): IUserState =>
{
    switch (action.type) 
    {
        case UserActionTypes.SET_USER:
        {
            const update_users = state.users.map((user: IUser) => 
            { 
                if (user.id === action.payload.id) user = action.payload
                return user 
            });
            
            return {
                ...state, 
                user: action.payload,
                users: update_users,
                error: undefined
            }
        }
        case UserActionTypes.SET_USER_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case UserActionTypes.SET_ALL_USERS:
        {
            return {
                ...state, 
                users: action.payload,
                error: undefined
            }
        }
        case UserActionTypes.SET_ALL_USERS_ERROR:
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