import * as PlayerActionCreators from "./player"
import * as UserActionCreators from './user';
import * as ChatActionCreators from './chat';
import * as MessageActionCreators from './message';
import * as AuthActionCreators from './auth';
import * as FollowersActionCreators from './subscription';
import * as PostActionCreators from './post';
import * as CommentActionCreators from './comment';
import * as GroupActionCreators from './group';
import * as InviteActionCreators from './invite';
import * as ReportActionCreators from './report';


export default
{
    ...PlayerActionCreators,
    ...AuthActionCreators,
    ...UserActionCreators,
    ...ChatActionCreators,
    ...MessageActionCreators,
    ...FollowersActionCreators,
    ...PostActionCreators,
    ...CommentActionCreators,
    ...GroupActionCreators,
    ...InviteActionCreators,
    ...ReportActionCreators
}