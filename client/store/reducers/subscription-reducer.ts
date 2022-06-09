import { SubscriptionAction, SubscriptionsActionTypes, ISubscriptionsState, ISubscription } from '../types/subscription';


const initial_state: ISubscriptionsState = {

    subscription: null,
    subscriptions: [],
    error: undefined//''
}


export const subscription_reducer = (state = initial_state, action: SubscriptionAction): ISubscriptionsState =>
{
    switch (action.type) 
    {
        case SubscriptionsActionTypes.CREATE_SUBSCRIPTION:
        {
            return {
                ...state, 
                subscription: action.payload,
                subscriptions: [...state.subscriptions, action.payload],
                error: undefined
            }
        }
        case SubscriptionsActionTypes.CREATE_SUBSCRIPTION_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case SubscriptionsActionTypes.DELETE_SUBSCRIPTION:
        {
            let update_subscriptions = [...state.subscriptions];
            update_subscriptions = update_subscriptions.filter((sub: ISubscription) => sub.id !== action.payload);

            return {
                ...state, 
                subscription: null,
                subscriptions: update_subscriptions,
                error: undefined
            }
        }
        case SubscriptionsActionTypes.DELETE_SUBSCRIPTION_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case SubscriptionsActionTypes.SET_SUBSCRIPTION:
        {
            const update_subscriptions = state.subscriptions.map((subscription: ISubscription) => 
            { 
                if (subscription.id === action.payload.id) subscription = action.payload
                return subscription 
            });
            
            return {
                ...state, 
                subscription: action.payload,
                subscriptions: update_subscriptions,
                error: undefined
            }
        }
        case SubscriptionsActionTypes.SET_SUBSCRIPTION_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case SubscriptionsActionTypes.SET_ALL_SUBSCRIPTIONS:
        {
            return {
                ...state, 
                subscriptions: action.payload,
                error: undefined
            }
        }
        case SubscriptionsActionTypes.SET_ALL_SUBSCRIPTIONS_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
}