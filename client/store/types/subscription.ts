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

    SET_SUBSCRIPTION = 'SET_SUBSCRIPTION',
    ASYNC_SET_SUBSCRIPTION = 'ASYNC_SET_SUBSCRIPTION',
    SET_SUBSCRIPTION_ERROR = 'SET_SUBSCRIPTION_ERROR',

    SET_ALL_SUBSCRIPTIONS = 'SET_ALL_SUBSCRIPTIONS',
    ASYNC_SET_ALL_SUBSCRIPTIONS = 'ASYNC_SET_ALL_SUBSCRIPTIONS',
    SET_ALL_SUBSCRIPTIONS_ERROR = 'SET_ALL_SUBSCRIPTIONS_ERROR',

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

interface ISetSubscriptionAction
{
    type: SubscriptionsActionTypes.SET_SUBSCRIPTION;
    payload: ISubscription
}

interface IAsyncSetSubscriptionAction
{
    type: SubscriptionsActionTypes.ASYNC_SET_SUBSCRIPTION;
    payload: ISubscription
}

interface ISetSubscriptionErrorAction
{
    type: SubscriptionsActionTypes.SET_SUBSCRIPTION_ERROR;
    payload: string
}

interface ISetAllSubscriptionsAction
{
    type: SubscriptionsActionTypes.SET_ALL_SUBSCRIPTIONS;
    payload: ISubscription[]
}

interface IAsyncSetAllSubscriptionsAction
{
    type: SubscriptionsActionTypes.ASYNC_SET_ALL_SUBSCRIPTIONS;
    payload: ISubscription[];
}

interface ISetAllSubscriptionsErrorAction
{
    type: SubscriptionsActionTypes.SET_ALL_SUBSCRIPTIONS_ERROR;
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
                            | ISetSubscriptionAction 
                            | IAsyncSetSubscriptionAction
                            | ISetSubscriptionErrorAction 
                            | ISetAllSubscriptionsAction
                            | IAsyncSetAllSubscriptionsAction
                            | ISetAllSubscriptionsErrorAction
                            | IDeleteSubscriptionAction
                            | IAsyncDeleteSubscriptionAction
                            | IDeleteSubscriptionErrorAction;