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
    is_private?: string;
    is_secure?: string;
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

    ADD_MEMBER = 'ADD_MEMBER',
    ASYNC_ADD_MEMBER = 'ASYNC_ADD_MEMBER',
    ADD_MEMBER_ERROR = 'ADD_MEMBER_ERROR',

    REMOVE_MEMBER = 'REMOVE_MEMBER',
    ASYNC_REMOVE_MEMBER = 'ASYNC_REMOVE_MEMBER',
    REMOVE_MEMBER_ERROR = 'REMOVE_MEMBER_ERROR',

    LEAVE_GROUP = 'LEAVE_GROUP',
    ASYNC_LEAVE_GROUP = 'ASYNC_LEAVE_GROUP',
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

interface IGetGroupAction
{
    type: GroupActionTypes.SET_GROUP;
    payload: IGroup
}

interface IAsyncGetGroupAction
{
    type: GroupActionTypes.ASYNC_SET_GROUP;
    payload: IGroup
}

interface IGetGroupErrorAction
{
    type: GroupActionTypes.SET_GROUP_ERROR;
    payload: string
}

interface IGetAllGroupsAction
{
    type: GroupActionTypes.SET_ALL_GROUPS;
    payload: IGroup[]
}

interface IAsyncGetAllGroupsAction
{
    type: GroupActionTypes.ASYNC_SET_ALL_GROUPS;
    payload: IGroup[];
}

interface IGetAllGroupsErrorAction
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

interface IAddMemberAction
{
    type: GroupActionTypes.ADD_MEMBER;
    payload: IGroup
}

interface IAsyncAddMemberAction
{
    type: GroupActionTypes.ASYNC_ADD_MEMBER;
    payload: IGroup
}

interface IAddMemberErrorAction
{
    type: GroupActionTypes.ADD_MEMBER_ERROR;
    payload: string
}

interface IRemoveMemberAction
{
    type: GroupActionTypes.REMOVE_MEMBER;
    payload: IGroup
}

interface IAsyncRemoveMemberAction
{
    type: GroupActionTypes.ASYNC_REMOVE_MEMBER;
    payload: IGroup
}

interface IRemoveMemberErrorAction
{
    type: GroupActionTypes.REMOVE_MEMBER_ERROR;
    payload: string
}

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
                        | IGetGroupAction 
                        | IAsyncGetGroupAction
                        | IGetGroupErrorAction 
                        | IGetAllGroupsAction
                        | IAsyncGetAllGroupsAction
                        | IGetAllGroupsErrorAction
                        | ISearchGroupsAction
                        | IAsyncSearchGroupsAction
                        | ISearchGroupsErrorAction
                        | IDeleteGroupAction
                        | IAsyncDeleteGroupAction
                        | IDeleteGroupErrorAction
                        | IAddMemberAction
                        | IAsyncAddMemberAction
                        | IAddMemberErrorAction
                        | IRemoveMemberAction
                        | IAsyncRemoveMemberAction
                        | IRemoveMemberErrorAction
                        | ILeaveGroupAction
                        | IAsyncLeaveGroupAction
                        | ILeaveGroupErrorAction;