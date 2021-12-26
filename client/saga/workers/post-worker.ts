import { put } from 'redux-saga/effects';
import { create_post, delete_post, get_all_posts, get_post, like_post, update_post } from '../../store/actions/post';
import { ILikePost, IPost } from '../../types/post';


export function* get_all_posts_worker(payload: IPost[]): Generator<any>
{
    yield put(get_all_posts(payload));
}

export function* get_post_worker(payload: IPost): Generator<any>
{
    yield put(get_post(payload));
}

export function* create_post_worker(payload: IPost): Generator<any>
{
    yield put(create_post(payload));
}

export function* like_post_worker(payload: ILikePost): Generator<any>
{
    // yield console.log(payload);
    yield put(like_post(payload));
}

export function* update_post_worker(payload: IPost): Generator<any>
{
    yield put(update_post(payload));
}

export function* delete_post_worker(payload: string): Generator<any>
{
    yield put(delete_post(payload));
}