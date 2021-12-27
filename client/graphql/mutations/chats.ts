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
            is_private
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

const ADD_CHAT_MEMBER = gql`
    mutation add_chat_member( $input: GetChatMemberInput! ) {
        add_chat_member( input: $input ) {
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
            is_private
            is_secure
            created_at 
            updated_at
        }
    }
`;

const REMOVE_CHAT_MEMBER = gql`
    mutation remove_chat_member( $input: GetChatMemberInput! ) {
        remove_chat_member( input: $input ) {
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
            is_private
            is_secure
            created_at 
            updated_at
        }
    }
`;


export {
    CREATE_CHAT,
    DELETE_CHAT,
    ADD_CHAT_MEMBER,
    REMOVE_CHAT_MEMBER
}