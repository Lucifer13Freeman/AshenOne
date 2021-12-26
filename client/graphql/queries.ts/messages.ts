import { gql } from '@apollo/client';


const GET_MESSAGE = gql`
    query get_message( $input: GetMessageInput! ) {
        get_message( input: $input ) {
            id 
            chat_id 
            user { id username avatar role is_banned }
            text 
            image
            audio
            video
            reactions { user_id message_id content } 
            created_at
            updated_at
        }
    }
`;

const GET_ALL_MESSAGES = gql`
    query get_all_messages( $input: GetAllMessagesInput! ) {
        get_all_messages( input: $input ) {
            id 
            chat_id 
            user { id username avatar role is_banned }
            text 
            image
            audio
            video
            reactions { user_id message_id content } 
            created_at
            updated_at
        }
    }
`;


const SEARCH_MESSAGES = gql`
  query search_messages( $input: SearchMessageInput! ) {
    search_messages( input: $input ) {
        id 
        chat_id 
        user { id username avatar role is_banned }
        text 
        image
        audio
        video
        reactions { user_id message_id content } 
        created_at
        updated_at
    }
  }
`;


export {
    GET_MESSAGE,
    GET_ALL_MESSAGES,
    SEARCH_MESSAGES
}