import { gql } from "@apollo/client";


const CREATE_CHAT = gql`
    mutation create_chat( $input: CreateChatInput! ) {
        create_chat( input: $input ) {
            id 
            admin_id
            members { id username avatar role is_banned }
            messages { 
                id 
                chat_id 
                user { id username avatar role is_banned } 
                text 
                image
                audio
                video
                created_at 
                updated_at 
            }
            is_open
            is_secure
            created_at 
            updated_at
        }
    }
`;

const DELETE_CHAT = gql`
    mutation delete_chat( $input: GetChatInput! ) {
        delete_chat( input: $input )
    }
`;

const ADD_MEMBER = gql`
    mutation add_member( $input: GetMemberInput! ) {
        add_member( input: $input ) {
            id 
            admin_id
            members { id username avatar role is_banned }
            messages { 
                id 
                chat_id 
                user { id username avatar role is_banned } 
                text 
                image
                audio
                video
                created_at 
                updated_at 
            }
            is_open
            is_secure
            created_at 
            updated_at
        }
    }
`;

const REMOVE_MEMBER = gql`
    mutation remove_member( $input: GetMemberInput! ) {
        remove_member( input: $input ) {
            id 
            admin_id
            members { id username avatar }
            messages { 
                id 
                chat_id 
                user { id username avatar } 
                text 
                image
                audio
                video
                created_at 
                updated_at 
            }
            is_open
            is_secure
            created_at 
            updated_at
        }
    }
`;


export {
    CREATE_CHAT,
    DELETE_CHAT,
    ADD_MEMBER,
    REMOVE_MEMBER
}