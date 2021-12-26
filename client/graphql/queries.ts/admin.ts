import { gql } from "@apollo/client";


const GET_STATISTICS_REPORT = gql`
    query get_statistics_report {
        get_statistics_report {
            total_users
            total_banned_users
            total_messages
            total_reactions
            total_posts
            total_post_likes
            total_comments
            total_comment_likes
            total_groups
            total_subscriptions
            created_at
        }
    }
`;

export {
    GET_STATISTICS_REPORT
}