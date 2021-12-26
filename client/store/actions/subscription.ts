import { SubscriptionsActionTypes, ISubscription } from '../../types/subscription';


export const get_all_subscriptions = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: SubscriptionsActionTypes.GET_ALL_SUBSCRIPTIONS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: SubscriptionsActionTypes.GET_ALL_SUBSCRIPTIONS_ERROR, 
            payload: 'Users loading error!'
        });
    }
}

export const async_get_all_subscriptions = (payload: ISubscription[]) => (
{
    type: SubscriptionsActionTypes.ASYNC_GET_ALL_SUBSCRIPTIONS,
    payload
});

export const get_subscription = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: SubscriptionsActionTypes.GET_SUBSCRIPTION,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: SubscriptionsActionTypes.GET_SUBSCRIPTION_ERROR, 
            payload: 'Users loading error!'
        });
    }
}

export const async_get_subscription = (payload: ISubscription | null) => (
{
    type: SubscriptionsActionTypes.ASYNC_GET_SUBSCRIPTION,
    payload
});

export const create_subscription = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: SubscriptionsActionTypes.CREATE_SUBSCRIPTION,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: SubscriptionsActionTypes.CREATE_SUBSCRIPTION_ERROR, 
            payload: 'Users loading error!'
        });
    }
}

export const async_create_subscription = (payload: ISubscription | null) => (
{
    type: SubscriptionsActionTypes.ASYNC_CREATE_SUBSCRIPTION,
    payload
});

export const delete_subscription = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: SubscriptionsActionTypes.DELETE_SUBSCRIPTION,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: SubscriptionsActionTypes.DELETE_SUBSCRIPTION_ERROR, 
            payload: 'Users loading error!'
        });
    }
}

export const async_delete_subscription = (payload: string | null) => (
{
    type: SubscriptionsActionTypes.ASYNC_DELETE_SUBSCRIPTION,
    payload
});