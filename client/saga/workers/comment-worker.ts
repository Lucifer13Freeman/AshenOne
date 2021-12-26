import { put } from 'redux-saga/effects';
import { create_comment, delete_comment, get_all_comments, get_comment, like_comment, update_comment } from '../../store/actions/comment';
import { IComment, ILikeComment } from '../../types/comment';


export function* get_all_comments_worker(payload: IComment[]): Generator<any>
{
    yield put(get_all_comments(payload));
}

export function* get_comment_worker(payload: IComment): Generator<any>
{
    yield put(get_comment(payload));
}

export function* create_comment_worker(payload: IComment): Generator<any>
{
    yield put(create_comment(payload));
}

export function* like_comment_worker(payload: ILikeComment): Generator<any>
{
    yield put(like_comment(payload));
}

export function* update_comment_worker(payload: IComment): Generator<any>
{
    yield put(update_comment(payload));
}

export function* delete_comment_worker(payload: string): Generator<any>
{
    yield put(delete_comment(payload));
}