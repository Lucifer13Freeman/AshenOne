// import { useMutation } from '@apollo/client';
// import React, { useState } from 'react';
// import { CREATE_FOLLOWER, DELETE_FOLLOWER } from '../../../graphql/mutations/followers';


// interface FollowButtonProps
// {
//     id_user: string;
//     is_followed: Boolean;
// }

// const FollowButton: React.FC<FollowButtonProps> = ({ user_id, is_followed }) => 
// {
    
//     const [is_followed, set_is_followed] = useState(false);
    
    
//     const [create_follower, { loading: create_follower_loading }] = useMutation(CREATE_FOLLOWER, 
//     {
//         onError: (err) => console.log(err)
//     });
    
//     const [delete_follower, { loading: delete_follower_loading }] = useMutation(DELETE_FOLLOWER, 
//     {
//         onError: (err) => console.log(err)
//     });
    
    
//     const follow = () =>
//     {
//         console.log(is_followed)
//         let follow_input = { input: { user_id } }
    
//         if (is_followed)
//         {
//             delete_follower({ variables: follow_input });
//             set_is_followed(false);
//         }
//         else 
//         {
//             create_follower({ variables: follow_input });
//             set_is_followed(true);
//         }
    
//         console.log(is_followed)
//     }
    

//     return (

//         <div>
            
//         </div>
//     );
// }


// export default FollowButton;
