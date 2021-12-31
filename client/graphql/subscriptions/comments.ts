import { gql } from '@apollo/client';


const NEW_COMMENT = gql`
  subscription new_comment {
    new_comment {
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
  }
`;

const NEW_LIKE_COMMENT = gql`
  subscription new_like_comment {
    new_like_comment {
      id 
      user_id 
      comment_id 
      created_at 
      updated_at
    }
  }
`;


export {
    NEW_COMMENT,
    NEW_LIKE_COMMENT
}