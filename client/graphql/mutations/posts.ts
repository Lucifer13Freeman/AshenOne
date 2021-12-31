import { gql } from "@apollo/client";


const CREATE_POST = gql`
    mutation create_post( $input: CreatePostInput! ) {
        create_post( input: $input ) {
            id 
            user { id username avatar role is_banned }
            text 
            image
            audio
            video
            views
            comments { 
                id 
                post_id
                user { id username avatar role is_banned } 
                text 
                image
                audio
                video
                likes { id user_id comment_id }
                created_at
                updated_at
            }
            likes { id user_id post_id }
            created_at
            updated_at
        }
    }
`;

const UPDATE_POST = gql`
    mutation update_post( $input: UpdatePostInput! ) {
        update_post( input: $input ) {
            id 
            user { id username avatar role is_banned }
            text 
            image
            audio
            video
            views
            comments { 
                id 
                post_id
                user { id username avatar role is_banned } 
                text 
                image
                audio
                video
                likes { id user_id comment_id }
                created_at
                updated_at
            }
            likes { id user_id post_id }
            created_at
            updated_at
        }
    }
`;

const DELETE_POST = gql`
    mutation delete_post( $input: GetPostInput! ) {
        delete_post( input: $input )
    }
`;


export {
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
}