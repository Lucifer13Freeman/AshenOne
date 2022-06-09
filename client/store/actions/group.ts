import { GroupActionTypes, IGroup } from '../types/group';


export const set_all_groups = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.SET_ALL_GROUPS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.SET_ALL_GROUPS_ERROR, 
            payload: 'Groups loading error!'
        });
    }
}

export const async_set_all_groups = (payload: IGroup[]) => (
{
    type: GroupActionTypes.ASYNC_SET_ALL_GROUPS,
    payload
});

export const set_group = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.SET_GROUP,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.SET_GROUP_ERROR, 
            payload: 'Group loading error!'
        });
    }
}

export const async_set_group = (payload: IGroup | null) => (
{
    type: GroupActionTypes.ASYNC_SET_GROUP,
    payload
});

export const create_group = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.CREATE_GROUP,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.CREATE_GROUP_ERROR, 
            payload: 'Group loading error!'
        });
    }
}

export const async_create_group = (payload: IGroup | null) => (
{
    type: GroupActionTypes.ASYNC_CREATE_GROUP,
    payload
});

export const leave_group = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.LEAVE_GROUP,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.LEAVE_GROUP_ERROR, 
            payload: 'Group loading error!'
        });
    }
}

export const async_leave_group = (payload: IGroup | null) => (
{
    type: GroupActionTypes.ASYNC_LEAVE_GROUP,
    payload
});

export const delete_group = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.DELETE_GROUP,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.DELETE_GROUP_ERROR, 
            payload: 'Group loading error!'
        });
    }
}

export const async_delete_group = (payload: string | null) => (
{
    type: GroupActionTypes.ASYNC_DELETE_GROUP,
    payload
});