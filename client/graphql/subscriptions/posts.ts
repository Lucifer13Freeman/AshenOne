import { gql } from '@apollo/client';


const NEW_POST = gql`
  subscription new_post {
    new_post {
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

const NEW_LIKE_POST = gql`
  subscription new_like_post {
    new_like_post {
      id 
      post_id
      user_id
      created_at
      updated_at
    }
  }
`;


export {
    NEW_POST,
    NEW_LIKE_POST
}