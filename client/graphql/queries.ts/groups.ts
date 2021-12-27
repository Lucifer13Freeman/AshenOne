import { gql } from '@apollo/client';


const GET_GROUP = gql`
    query get_group( $input: GetGroupInput! ) {
        get_group( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderator_ids
            members { id username avatar role is_banned }
            posts { 
                id 
                group_id 
                text 
                image
                audio
                video
                created_at 
                updated_at 
            }
            is_private
            is_secure
            created_at 
            updated_at
        }
    }
`;

const GET_ALL_GROUPS = gql`
    query get_all_groups( $input: GetAllGroupsInput! ) {
        get_all_groups( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderator_ids
            members { id username avatar role is_banned }
            posts { 
                id 
                group_id 
                text 
                image
                audio
                video
                created_at 
                updated_at 
            }
            is_private
            is_secure
            created_at 
            updated_at
        }
    }
`;

const SEARCH_GROUPS = gql`
    query search_groups( $input: SearchGroupInput! ) {
        search_groups( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderator_ids
            members { id username avatar role is_banned }
            posts { 
                id 
                group_id 
                text 
                image
                audio
                video
                created_at 
                updated_at 
            }
            is_private
            is_secure
            created_at 
            updated_at
        }
    }
`;


export {
    GET_GROUP,
    GET_ALL_GROUPS,
    SEARCH_GROUPS
}