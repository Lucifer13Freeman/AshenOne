import { gql } from "@apollo/client";


const CREATE_SUBSCRIPTION = gql`
    mutation create_subscription( $input: CreateSubscriptionInput! ) {
        create_subscription( input: $input ) {
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

const DELETE_SUBSCRIPTION = gql`
    mutation delete_subscription( $input: GetSubscriptionInput! ) {
        delete_subscription( input: $input )
    }
`;


export {
    CREATE_SUBSCRIPTION,
    DELETE_SUBSCRIPTION
}