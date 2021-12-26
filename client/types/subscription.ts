import { IUser } from "./user";


export interface ISubscription
{
    id: string;
    follower: IUser;
    profile: IUser;
    created_at?: Date;
    updated_at?: Date;
}

export interface ISubscriptionsState 
{ 
    is_subscription?: Boolean | null;
    subscription: ISubscription | null;
    subscriptions: ISubscription[];
    error?: string;
}

export enum SubscriptionsActionTypes
{
    CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION',
    ASYNC_CREATE_SUBSCRIPTION = 'ASYNC_CREATE_SUBSCRIPTION',
    CREATE_SUBSCRIPTION_ERROR = 'CREATE_SUBSCRIPTION_ERROR',

    GET_SUBSCRIPTION = 'GET_SUBSCRIPTION',
    ASYNC_GET_SUBSCRIPTION = 'ASYNC_GET_SUBSCRIPTION',
    GET_SUBSCRIPTION_ERROR = 'GET_SUBSCRIPTION_ERROR',

    GET_ALL_SUBSCRIPTIONS = 'GET_ALL_SUBSCRIPTIONS',
    ASYNC_GET_ALL_SUBSCRIPTIONS = 'ASYNC_GET_ALL_SUBSCRIPTIONS',
    GET_ALL_SUBSCRIPTIONS_ERROR = 'GET_ALL_SUBSCRIPTIONS_ERROR',

    DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION',
    ASYNC_DELETE_SUBSCRIPTION = 'ASYNC_DELETE_SUBSCRIPTION',
    DELETE_SUBSCRIPTION_ERROR = 'DELETE_SUBSCRIPTION_ERROR'
}

interface ICreateSubscriptionAction
{
    type: SubscriptionsActionTypes.CREATE_SUBSCRIPTION;
    payload: ISubscription
}

interface IAsyncCreateSubscriptionAction
{
    type: SubscriptionsActionTypes.ASYNC_CREATE_SUBSCRIPTION;
    payload: ISubscription
}

interface ICreateSubscriptionErrorAction
{
    type: SubscriptionsActionTypes.CREATE_SUBSCRIPTION_ERROR;
    payload: string
}

interface IGetSubscriptionAction
{
    type: SubscriptionsActionTypes.GET_SUBSCRIPTION;
    payload: ISubscription
}

interface IAsyncGetSubscriptionAction
{
    type: SubscriptionsActionTypes.ASYNC_GET_SUBSCRIPTION;
    payload: ISubscription
}

interface IGetSubscriptionErrorAction
{
    type: SubscriptionsActionTypes.GET_SUBSCRIPTION_ERROR;
    payload: string
}

interface IGetAllSubscriptionsAction
{
    type: SubscriptionsActionTypes.GET_ALL_SUBSCRIPTIONS;
    payload: ISubscription[]
}

interface IAsyncGetAllSubscriptionsAction
{
    type: SubscriptionsActionTypes.ASYNC_GET_ALL_SUBSCRIPTIONS;
    payload: ISubscription[];
}

interface IGetAllSubscriptionsErrorAction
{
    type: SubscriptionsActionTypes.GET_ALL_SUBSCRIPTIONS_ERROR;
    payload: string
}

interface IDeleteSubscriptionAction
{
    type: SubscriptionsActionTypes.DELETE_SUBSCRIPTION;
    payload: string
}

interface IAsyncDeleteSubscriptionAction
{
    type: SubscriptionsActionTypes.ASYNC_DELETE_SUBSCRIPTION;
    payload: string
}

interface IDeleteSubscriptionErrorAction
{
    type: SubscriptionsActionTypes.DELETE_SUBSCRIPTION_ERROR;
    payload: string
}


export type SubscriptionAction = ICreateSubscriptionAction
                            | IAsyncCreateSubscriptionAction
                            | ICreateSubscriptionErrorAction
                            | IGetSubscriptionAction 
                            | IAsyncGetSubscriptionAction
                            | IGetSubscriptionErrorAction 
                            | IGetAllSubscriptionsAction
                            | IAsyncGetAllSubscriptionsAction
                            | IGetAllSubscriptionsErrorAction
                            | IDeleteSubscriptionAction
                            | IAsyncDeleteSubscriptionAction
                            | IDeleteSubscriptionErrorAction;