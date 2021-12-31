import { gql } from '@apollo/client';


const REGISTER_USER = gql`
  mutation register( $input: RegisterUserInput! ) {
        register( input: $input ) {
            id
            username
            email
            avatar
            role
            is_banned
            created_at
            updated_at
        }
    }
`;

const LOGIN_USER = gql`
  mutation login( $input: LoginUserInput!) {
        login( input: $input ) {
            cookie
            token
            user { 
                id
                username
                email
                avatar
                role
                is_banned
                created_at
                updated_at
            }
        }
    }
`;

// const SEND_MESSAGE = gql`
//   mutation send_message($to: String!, $content: String!) {
//     send_message(to: $to, content: $content) {
//       id 
//       from 
//       to 
//       content 
//       created_at
//       updated_at
//     }
//   }
// `;

// const REACT_TO_MESSAGE = gql`
//     mutation react_to_message($id: String! $content: String!) {
//         react_to_message(id: $id content: $content) {
//             id
//         }
//     }
// `;


export {
    REGISTER_USER,
    LOGIN_USER,
    // SEND_MESSAGE,
    // REACT_TO_MESSAGE
}