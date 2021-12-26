import { gql } from "@apollo/client";


const CREATE_MESSAGE = gql`
    mutation create_message( $input: CreateMessageInput! ) {
        create_message( input: $input ) {
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
    }
`;

const UPDATE_MESSAGE = gql`
    mutation update_message($input: UpdateMessageInput!) {
        update_message( input: $input ) {
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
    }
`;

const DELETE_MESSAGE = gql`
    mutation delete_message( $input: GetMessageInput! ) {
        delete_message( input: $input )
}
`;


export {
    CREATE_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE
}