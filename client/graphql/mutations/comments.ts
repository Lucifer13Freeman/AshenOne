import { gql } from "@apollo/client";


const CREATE_COMMENT = gql`
    mutation create_comment( $input: CreateCommentInput! ) {
        create_comment( input: $input ) {
            id 
            user { id username avatar role is_banned }
            text 
            image
            audio
            video
            likes { id user_id comment_id }
            created_at
            updated_at
        }
    }
`;

const UPDATE_COMMENT = gql`
    mutation update_comment( $input: UpdateCommentInput! ) {
        update_comment( input: $input ) {
            id 
            user { id username avatar role is_banned }
            text 
            image
            audio
            video
            likes { id user_id comment_id }
            created_at
            updated_at
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation delete_comment( $input: GetCommentInput! ) {
        delete_comment( input: $input )
    }
`;


export {
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
}