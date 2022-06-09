import jwtDecode from 'jwt-decode';
import { put, call } from 'redux-saga/effects';
import { login, logout } from '../../store/actions/auth';
import { AuthActionTypes, IAuth } from '../../store/types/auth';


export function* login_worker(payload: IAuth): Generator<any>
{
    // const { user }: any = yield payload;

    // const token: any = yield set_token_from_cookie();

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