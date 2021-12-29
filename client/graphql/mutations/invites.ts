import { gql } from "@apollo/client";


const CREATE_INVITE = gql`
    mutation create_invite( $input: CreateInviteInput! ) {
        create_invite( input: $input ) {
            id 
            user { id username avatar role is_banned }
            sender { id username avatar role is_banned }
            chat { id }
            group { id name avatar }
            created_at 
            updated_at
        }
    }
`;

const UPDATE_INVITE = gql`
    mutation update_invite( $input: UpdateInviteInput! ) {
        update_invite( input: $input ) {
            id 
            user { id username avatar role is_banned }
            sender { id username avatar role is_banned }
            chat { id }
            group { id name avatar }
            created_at 
            updated_at
        }
    }
`;

const DELETE_INVITE = gql`
    mutation delete_invite( $input: GetInviteInput! ) {
        delete_invite( input: $input )
    }
`;


const UPDATE_AND_DELETE_INVITE = gql`
    mutation update_and_delete_invite( $input: UpdateInviteInput! ) {
        update_and_delete_invite( input: $input ) {
            id 
            user { id username avatar role is_banned }
            sender { id username avatar role is_banned }
            chat { id }
            group { id name avatar }
            created_at 
            updated_at
        }
    }
`;


export {
    CREATE_INVITE,
    UPDATE_INVITE,
    DELETE_INVITE,
    UPDATE_AND_DELETE_INVITE
}