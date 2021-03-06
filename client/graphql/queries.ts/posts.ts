import { gql } from '@apollo/client';


const GET_POST = gql`
    query get_post( $input: GetPostInput! ) {
        get_post( input: $input )
        {
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

const GET_ALL_POSTS = gql`
    query get_all_posts( $input: GetAllPostsInput! ) {
        get_all_posts( input: $input )
        {
            id 
            user { id username avatar role is_banned }
            group_id
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

const GET_USER_POSTS = gql`
    query get_user_posts( $input: GetAllPostsInput! ) {
        get_user_posts( input: $input )
        {
            id 
            user { id username avatar role is_banned }
            group_id
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

const GET_GROUP_POSTS = gql`
    query get_group_posts( $input: GetAllPostsInput! ) {
        get_all_posts( input: $input )
        {
            id 
            user { id username avatar role is_banned }
            group_id
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

const SEARCH_POSTS = gql`
    query search_posts( $input: SearchPostInput! ) {
        search_posts( input: $input )
        {
            id 
            user { id username avatar role is_banned }
            group_id
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

const SEARCH_USER_POSTS = gql`
    query search_user_posts( $input: SearchPostInput! ) {
        search_user_posts( input: $input )
        {
            id 
            user { id username avatar role is_banned }
            group_id
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

const SEARCH_GROUP_POSTS = gql`
    query search_group_posts( $input: SearchPostInput! ) {
        search_group_posts( input: $input )
        {
            id 
            user { id username avatar role is_banned }
            group_id
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


export {
    GET_POST,
    GET_ALL_POSTS,
    SEARCH_POSTS,
    GET_GROUP_POSTS,
    GET_USER_POSTS,
    SEARCH_USER_POSTS,
    SEARCH_GROUP_POSTS
}