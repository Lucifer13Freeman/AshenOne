import { gql } from '@apollo/client';


const LIKE_POST = gql`
    mutation like_post($input: LikeInput!) {
        like_post(input: $input) {
            id 
            post_id
            user_id
            created_at
            updated_at
        }
    }
`;

const LIKE_COMMENT = gql`
    mutation like_comment($input: LikeInput!) {
        like_comment(input: $input) {
            id 
            comment_id
            user_id
            created_at
            updated_at
        }
    }
`;

export {
    LIKE_POST,
    LIKE_COMMENT
}