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

const DELETE_USER = gql`
    mutation delete_user( $input: GetUserInput! ) {
        delete_user( input: $input )
    }
`;


export {
    REGISTER_USER,
    LOGIN_USER,
    UPDATE_USER,
    DELETE_USER
}