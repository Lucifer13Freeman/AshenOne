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

const UPDATE_USER = gql`
  mutation update_user( $input: UpdateUserInput! ) {
        update_user( input: $input ) {
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


export {
    REGISTER_USER,
    LOGIN_USER,
    UPDATE_USER
}