import { gql } from '@apollo/client';


const GET_CHAT = gql`
    query get_chat( $input: GetChatInput! ) {
        get_chat( input: $input ) {
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
                reactions { content } 
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

const GET_ALL_CHATS = gql`
    query get_all_chats( $input: GetAllChatsInput! ) {
        get_all_chats( input: $input ) {
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
                reactions { content } 
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

const SEARCH_CHATS = gql`
    query search_chats( $input: SearchChatInput! ) {
        search_chats( input: $input ) {
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
                reactions { content } 
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
    GET_CHAT,
    GET_ALL_CHATS,
    SEARCH_CHATS
}