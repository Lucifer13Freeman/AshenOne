import { gql } from "@apollo/client";


const CREATE_GROUP = gql`
    mutation create_group( $input: CreateGroupInput! ) {
        create_group( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderators { id }
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

const UPDATE_GROUP = gql`
    mutation update_group( $input: UpdateGroupInput! ) {
        update_group( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderators { id }
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

const DELETE_GROUP = gql`
    mutation delete_group( $input: GetGroupInput! ) {
        delete_group( input: $input )
    }
`;

const ADD_GROUP_MEMBER = gql`
    mutation add_group_member( $input: GetGroupMemberInput! ) {
        add_group_member( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderators { id }
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

const ADD_GROUP_INVITED_MEMBER = gql`
    mutation add_group_invited_member( $input: GetGroupMemberInput! ) {
        add_group_invited_member( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderators { id }
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

const REMOVE_GROUP_MEMBER = gql`
    mutation remove_group_member( $input: GetGroupMemberInput! ) {
        remove_group_member( input: $input ) {
            id 
            name
            avatar
            admin_id
            moderators { id }
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
    CREATE_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP,
    ADD_GROUP_MEMBER,
    ADD_GROUP_INVITED_MEMBER,
    REMOVE_GROUP_MEMBER
}