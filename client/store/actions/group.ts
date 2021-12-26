import { GroupActionTypes, IGroup } from '../../types/groups';


export const get_all_groups = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.GET_ALL_GROUPS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.GET_ALL_GROUPS_ERROR, 
            payload: 'Groups loading error!'
        });
    }
}

export const async_get_all_groups = (payload: IGroup[]) => (
{
    type: GroupActionTypes.ASYNC_GET_ALL_GROUPS,
    payload
});

export const get_group = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: GroupActionTypes.GET_GROUP,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: GroupActionTypes.GET_GROUP_ERROR, 
            payload: 'Group loading error!'
        });
    }
}

export const async_get_group = (payload: IGroup | null) => (
{
    type: GroupActionTypes.ASYNC_GET_GROUP,
    payload
});

