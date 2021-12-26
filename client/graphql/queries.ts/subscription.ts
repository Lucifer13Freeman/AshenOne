import { gql } from '@apollo/client';


const GET_SUBSCRIPTION = gql`
    query get_subscription( $input: GetSubscriptionInput! ) {
        get_subscription( input: $input ) {
            id
            follower {
                id
                username
                email
                avatar
                role
                created_at
                updated_at
            }
            profile {
                id
                username
                email
                avatar
                role
                created_at
                updated_at
            }
            created_at
            updated_at
        }
    }
`;

const GET_ALL_SUBSCRIPTIONS = gql`
    query get_all_subscriptions( $input: GetAllSubscriptionsInput! ) {
        get_all_subscriptions( input: $input ) {
            id
            follower {
                id
                username
                email
                avatar
                role 
                is_banned
                created_at
                updated_at
            }
            profile {
                id
                username
                email
                avatar
                role
                is_banned
                created_at
                updated_at
            }
            created_at
            updated_at
        }
    }
`;

const CHECK_SUBSCRIPTION = gql`
    query check_subscription( $input: GetSubscriptionInput! )
    {
        check_subscription( input: $input )
    }
`;


export {
    GET_SUBSCRIPTION,
    GET_ALL_SUBSCRIPTIONS,
    CHECK_SUBSCRIPTION
}