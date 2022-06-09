import { put } from 'redux-saga/effects';
import { create_comment, delete_comment, 
        set_all_comments, set_comment, 
        like_comment } from '../../store/actions/comment';
import { IComment, ILikeComment } from '../../store/types/comment';


export function* set_all_comments_worker(payload: IComment[]): Generator<any>
{
    yield put(set_all_comments(payload));
}

export function* set_comment_worker(payload: IComment): Generator<any>
{
    yield put(set_comment(payload));
}

export function* create_comment_worker(payload: IComment): Generator<any>
{
    yield put(create_comment(payload));
}

export function* like_comment_worker(payload: ILikeComment): Generator<any>
{
    yield put(like_comment(payload));
}

// export function* update_comment_worker(payload: IComment): Generator<any>
// {
//     yield put(update_comment(payload));
// }

export function* delete_comment_worker(payload: string): Generator<any>
{
    yield put(delete_comment(payload));
}