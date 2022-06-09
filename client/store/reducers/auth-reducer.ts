import { AuthAction, AuthActionTypes, IAuthState } from '../types/auth';


const initial_state: IAuthState = {

    auth: {
        is_auth: false,
        user: null
    },
    error: undefined
}


export const auth_reducer = (state = initial_state, action: AuthAction): IAuthState =>
{
    switch (action.type) 
    {
        case AuthActionTypes.LOGIN:
        {
            return {
                ...state,
                auth: action.payload,
                error: undefined
            }
        }
        case AuthActionTypes.LOGIN_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        case AuthActionTypes.LOGOUT:
        {
            return {
                ...state,
                auth: action.payload,
                error: undefined
            }
        }
        case AuthActionTypes.LOGOUT_ERROR:
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