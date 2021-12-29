import { gql } from '@apollo/client';


const GET_INVITE = gql`
    query get_invite( $input: GetInviteInput! ) {
        get_invite( input: $input ) {
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

const GET_ALL_INVITES = gql`
    query get_all_invites( $input: GetAllInvitesInput! ) {
        get_all_invites( input: $input ) {
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

const GET_ALL_RECEIVED_INVITES = gql`
    query get_received_invites( $input: GetAllInvitesInput! ) {
        get_received_invites( input: $input ) {
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

const GET_ALL_SENT_INVITES = gql`
    query get_sent_invites( $input: GetAllInvitesInput! ) {
        get_sent_invites( input: $input ) {
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
    GET_INVITE,
    GET_ALL_RECEIVED_INVITES,
    GET_ALL_SENT_INVITES,
    GET_ALL_INVITES
}