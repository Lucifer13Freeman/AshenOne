import { gql } from '@apollo/client';


const NEW_INVITE = gql`
  subscription new_invite {
    new_invite {
        id 
        user { id username avatar role is_banned }
        sender { id username avatar role is_banned }
        chat { id }
        group { id name avatar }
        created_at 
        updated_at
    }
  }
`;


export {
    NEW_INVITE
}