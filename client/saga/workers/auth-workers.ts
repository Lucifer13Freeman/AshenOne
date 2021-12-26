import jwtDecode from 'jwt-decode';
import { put, call } from 'redux-saga/effects';
import { login, logout } from '../../store/actions/auth';
import { get_all_users } from '../../store/actions/user';
import { AuthActionTypes, IAuth } from '../../types/auth';
import { IUser } from '../../types/user';
import { get_token_from_cookie } from '../../utils/token';


export function* login_worker(payload: IAuth): Generator<any>
{
    // const { user }: any = yield payload;

    // const token: any = yield get_token_from_cookie();

    // if (token)
    // { 
    //     const decoded: any = yield jwtDecode(token);

    //     yield put<any>(
    //     {
    //         type: AuthActionTypes.LOGIN,
    //         payload: { user, is_auth: true }
    //     })
    // };

    yield put<any>(login(payload));
}

export function* logout_worker(): Generator<any>
{
    yield put(logout());
}

/*export function* register_worker(): Generator
{
    yield put(register());
}*/