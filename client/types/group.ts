import { IPost } from "./post";
import { IUser } from "./user";


export interface IGroup
{
    id: string;
    name: string;
    avatar: string;
    admin_id: string;
    moderator_ids: string[];
    members: IUser[];
    posts: IPost[];
    is_private?: boolean;
    is_secure?: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface IGroupState 
{ 
    group: IGroup | null;
    groups: IGroup[];
    error?: string;
}

export enum GroupActionTypes
{
    CREATE_GROUP = 'CREATE_GROUP',
    ASYNC_CREATE_GROUP = 'ASYNC_CREATE_GROUP',
    CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR',

    SET_GROUP = 'SET_GROUP',
    ASYNC_SET_GROUP = 'ASYNC_SET_GROUP',
    SET_GROUP_ERROR = 'SET_GROUP_ERROR',

    SET_ALL_GROUPS = 'SET_ALL_GROUPS',
    ASYNC_SET_ALL_GROUPS = 'ASYNC_SET_ALL_GROUPS',
    SET_ALL_GROUPS_ERROR = 'SET_ALL_GROUPS_ERROR',

    SEARCH_GROUPS = 'SEARCH_GROUPS',
    ASYNC_SEARCH_GROUPS = 'ASYNC_SEARCH_GROUPS',
    SEARCH_GROUPS_ERROR = 'SEARCH_GROUPS_ERROR',

    // SET_MY_GROUPS = 'SET_ALL_GROUPS',
    // ASYNC_SET_MY_GROUPS = 'ASYNC_SET_ALL_GROUPS',
    // SET_MY_GROUPS_ERROR = 'SET_ALL_GROUPS_ERROR',

    // SEARCH_SET_MY_GROUPS = 'SEARCH_GROUPS',
    // ASYNC_SET_MY_GROUPS = 'ASYNC_SEARCH_GROUPS',
    // SET_MY_GROUPS_ERROR = 'SEARCH_GROUPS_ERROR',

    DELETE_GROUP = 'DELETE_GROUP',
    ASYNC_DELETE_GROUP = 'ASYNC_DELETE_GROUP',
    DELETE_GROUP_ERROR = 'DELETE_GROUP_ERROR',

    // ADD_GROUP_MEMBER = 'ADD_GROUP_MEMBER',
    // ASYNC_ADD_GROUP_MEMBER = 'ASYNC_ADD_GROUP_MEMBER',
    // ADD_GROUP_MEMBER_ERROR = 'ADD_GROUP_MEMBER_ERROR',

    // REMOVE_GROUP_MEMBER = 'REMOVE_GROUP_MEMBER',
    // ASYNC_REMOVE_GROUP_MEMBER = 'ASYNC_REMOVE_GROUP_MEMBER',
    // REMOVE_GROUP_MEMBER_ERROR = 'REMOVE_GROUP_MEMBER_ERROR',

    LEAVE_GROUP= 'LEAVE_GROUP',
    ASYNC_LEAVE_GROUP= 'ASYNC_LEAVE_GROUP',
    LEAVE_GROUP_ERROR = 'LEAVE_GROUP_ERROR'
}

interface ICreateGroupAction
{
    type: GroupActionTypes.CREATE_GROUP;
    payload: IGroup
}

interface IAsyncCreateGroupAction
{
    type: GroupActionTypes.ASYNC_CREATE_GROUP;
    payload: IGroup
}

interface ICreateGroupErrorAction
{
    type: GroupActionTypes.CREATE_GROUP_ERROR;
    payload: string
}

interface ISetGroupAction
{
    type: GroupActionTypes.SET_GROUP;
    payload: IGroup
}

interface IAsyncSetGroupAction
{
    type: GroupActionTypes.ASYNC_SET_GROUP;
    payload: IGroup
}

interface ISetGroupErrorAction
{
    type: GroupActionTypes.SET_GROUP_ERROR;
    payload: string
}

interface ISetAllGroupsAction
{
    type: GroupActionTypes.SET_ALL_GROUPS;
    payload: IGroup[]
}

interface IAsyncSetAllGroupsAction
{
    type: GroupActionTypes.ASYNC_SET_ALL_GROUPS;
    payload: IGroup[];
}

interface ISetAllGroupsErrorAction
{
    type: GroupActionTypes.SET_ALL_GROUPS_ERROR;
    payload: string
}

interface ISearchGroupsAction
{
    type: GroupActionTypes.SEARCH_GROUPS;
    payload: IGroup[]
}

interface IAsyncSearchGroupsAction
{
    type: GroupActionTypes.ASYNC_SEARCH_GROUPS;
    payload: IGroup[];
}

interface ISearchGroupsErrorAction
{
    type: GroupActionTypes.SEARCH_GROUPS_ERROR;
    payload: string
}

interface IDeleteGroupAction
{
    type: GroupActionTypes.DELETE_GROUP;
    payload: string
}

interface IAsyncDeleteGroupAction
{
    type: GroupActionTypes.ASYNC_DELETE_GROUP;
    payload: string
}

interface IDeleteGroupErrorAction
{
    type: GroupActionTypes.DELETE_GROUP_ERROR;
    payload: string
}

// interface IAddGroupMemberAction
// {
//     type: GroupActionTypes.ADD_GROUP_MEMBER;
//     payload: IGroup
// }

// interface IAsyncAddGroupMemberAction
// {
//     type: GroupActionTypes.ASYNC_ADD_GROUP_MEMBER;
//     payload: IGroup
// }

// interface IAddGroupMemberErrorAction
// {
//     type: GroupActionTypes.ADD_GROUP_MEMBER_ERROR;
//     payload: string
// }

// interface IRemoveGroupMemberAction
// {
//     type: GroupActionTypes.REMOVE_GROUP_MEMBER;
//     payload: IGroup
// }

// interface IAsyncRemoveGroupMemberAction
// {
//     type: GroupActionTypes.ASYNC_REMOVE_GROUP_MEMBER;
//     payload: IGroup
// }

// interface IRemoveGroupMemberErrorAction
// {
//     type: GroupActionTypes.REMOVE_GROUP_MEMBER_ERROR;
//     payload: string
// }

interface ILeaveGroupAction
{
    type: GroupActionTypes.LEAVE_GROUP;
    payload: IGroup
}

interface IAsyncLeaveGroupAction
{
    type: GroupActionTypes.ASYNC_LEAVE_GROUP;
    payload: IGroup
}

interface ILeaveGroupErrorAction
{
    type: GroupActionTypes.LEAVE_GROUP_ERROR;
    payload: string
}


export type GroupAction = ICreateGroupAction 
                        | IAsyncCreateGroupAction
                        | ICreateGroupErrorAction
                        | ISetGroupAction 
                        | IAsyncSetGroupAction
                        | ISetGroupErrorAction 
                        | ISetAllGroupsAction
                        | IAsyncSetAllGroupsAction
                        | ISetAllGroupsErrorAction
                        | ISearchGroupsAction
                        | IAsyncSearchGroupsAction
                        | ISearchGroupsErrorAction
                        | IDeleteGroupAction
                        | IAsyncDeleteGroupAction
                        | IDeleteGroupErrorAction
                        // | IAddGroupMemberAction
                        // | IAsyncAddGroupMemberAction
                        // | IAddGroupMemberErrorAction
                        // | IRemoveGroupMemberAction
                        // | IAsyncRemoveGroupMemberAction
                        // | IRemoveGroupMemberErrorAction
                        | ILeaveGroupAction
                        | IAsyncLeaveGroupAction
                        | ILeaveGroupErrorAction;