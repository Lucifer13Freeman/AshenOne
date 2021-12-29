import { REHYDRATE } from 'redux-persist';
import { all } from 'redux-saga/effects';
import { auth_watcher } from './watchers/auth-watcher';
import { chat_watcher } from './watchers/chat-watcher';
import { subscription_watcher } from './watchers/subscription-watcher';
import { message_watcher } from './watchers/message-watcher';
import { user_watcher } from './watchers/user-watcher';
import { report_watcher } from './watchers/report-watcher';
import { post_watcher } from './watchers/post-watcher';
import { comment_watcher } from './watchers/comment-watcher';
import { group_watcher } from './watchers/group-watcher';
import { invite_watcher } from './watchers/invite-watcher';


export default function* root_saga() 
{
    //yield take(REHYDRATE);
    yield all([
        
        auth_watcher(), 
        user_watcher(), 
        chat_watcher(), 
        message_watcher(), 
        subscription_watcher(),
        post_watcher(),
        comment_watcher(),
        group_watcher(),
        invite_watcher(),
        report_watcher()
    ]);
}