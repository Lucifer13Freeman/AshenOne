import { gql } from '@apollo/client';


const NEW_MESSAGE = gql`
  subscription new_message {
    new_message {
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
  }
`;

const UPDATED_MESSAGE = gql`
  subscription updated_message {
    updated_message {
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
  }
`;

const NEW_REACTION = gql`
  subscription new_reaction {
    new_reaction {
      id
      user_id
      message_id
      content
      created_at
      updated_at
    }
  }
`;

const DELETED_MESSAGE = gql`
  subscription deleted_message {
    deleted_message
  }
`;


export {
    NEW_MESSAGE,
    UPDATED_MESSAGE,
    NEW_REACTION,
    DELETED_MESSAGE
}