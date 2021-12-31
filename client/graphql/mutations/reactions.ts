import { gql } from "@apollo/client";


const CREATE_REACTION = gql`
    mutation create_reaction($input: CreateReactionInput!) {
    create_reaction(input: $input) {
        id 
        user_id
        message_id 
        content 
        created_at 
        updated_at
    }
    }
`;

const DELETE_REACTION = gql`
    mutation delete_reaction( $input: GetReactionInput! ) {
        delete_reaction(input: $input) {
            id 
            user_id
            message_id 
            content 
            created_at 
            updated_at
        }
    }
`;

export 
{
    CREATE_REACTION,
    DELETE_REACTION
}