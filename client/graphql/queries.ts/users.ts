import { gql } from '@apollo/client';


const GET_CURRENT_USER = gql`
  query get_current_user {
    get_current_user {
      id 
      email 
      username 
      avatar 
      role
      is_banned
      created_at
      updated_at
    }
  }
`;

const GET_ALL_USERS = gql`
  query get_all_users( $input: GetAllUsersInput! ) {
    get_all_users( input: $input ) {
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

const GET_USER = gql`
  query get_user( $input: GetUserInput! ) {
    get_user( input: $input ) {
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

const SEARCH_USERS = gql`
  query search_users( $input: SearchUserInput! ) {
    search_users( input: $input ) {
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
  GET_USER,
  GET_CURRENT_USER,
  GET_ALL_USERS,
  SEARCH_USERS
}