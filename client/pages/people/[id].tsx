import { Box, Button, Card, Grid, TextField } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { wrapper } from "../../store";
import UserList from '../../components/Users/List/UserList';
import { useLazyQuery, useQuery } from "@apollo/client";
import { useActions } from "../../hooks/useAction";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { IUser } from "../../types/user";
import UserProfile from "../../components/Users/Profile/UserProfile";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import { GET_USER } from "../../graphql/queries.ts/users";
import { GET_ALL_POSTS } from "../../graphql/queries.ts/posts";
import Posts from "../../components/Posts/Posts";
import Followers from "../../components/Subscriptions/Followers";
import { GET_ALL_SUBSCRIPTIONS } from "../../graphql/queries.ts/subscription";
import { ISubscription } from "../../types/subscription";
import { IPost } from "../../types/post";
import PostForm from "../../components/Posts/PostForm";
import { IComment } from "../../types/comment";


// interface UserProps 
// {
//     user_id: string;
// }

const UserPage: React.FC/*<UserProps>*/ = (/*{ user_id }*/) =>
{
    const router = useRouter();
    const user_id = router?.query?.id;

    //const input = { input: { id: user_id } }

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { user, error: users_error } = useTypedSelector(state => state.user);
    const { posts, error: posts_error } = useTypedSelector(state => state.post);
    const { subscription, subscriptions, error: subscriptions_error } = useTypedSelector(state => state.subscription);
    const { async_get_user, async_logout, async_get_all_posts, async_get_all_comments,
            async_get_subscription, async_get_all_subscriptions } = useActions();

    const { loading: user_loading, data: user_data } = useQuery(GET_USER,   
    {
        variables: { input: { id: user_id } },
        onCompleted: data => async_get_user(data.get_user),
        onError: err => 
        {
            console.log(err);
            async_get_user(null);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.reload();
                router.push(ROUTES.LOGIN);
                //window.location.href = ROUTES.LOGIN;
            }
        },
        nextFetchPolicy: "cache-first"
    });

    const { loading: posts_loading, data: posts_data } = useQuery(GET_ALL_POSTS,   
    {
        variables: { input: { user_id, is_order_by_desc: true } },
        onCompleted: data => 
        {
            const posts = data.get_all_posts;
            async_get_all_posts(posts);
            
            if (posts)
            {
                const comments: IComment[] = [].concat(...posts.map((post: IPost) => post.comments));
                //comments.concat([...posts.map((post: IPost) => post.comments));
                // console.log(posts)
                // comments = [...posts.map((post: IPost) => post.comments)];
                // comments = comments.map((arr: IComment[]) )
                // if (comments?.length > 1) comments = [...comments].reverse();
                // console.log(comments)
                async_get_all_comments(comments);
            }
        },
        onError: err => 
        {
            console.log(err);
            async_get_user(null);
                
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.reload();
                router.push(ROUTES.LOGIN);
                //window.location.href = ROUTES.LOGIN;
            }
        },
        nextFetchPolicy: "cache-first"
    });

    // console.log(user_data)

    //const [user, set_user] = useState();
    
    //let user: IUser | undefined = users?.find((u: IUser) => u.id === user_id);

    //set_user(users?.find((u: IUser) => u.id === user_id))
    
     //const find_user = users?.find((u: IUser) => u.id === user_id);

    //if (find_user !== undefined) async_get_user(find_user);
    // if (user && user.id !== user_id)
    // //else
    // {   
        // const input = { input: { id: user_id } }

        // const { loading: user_loading, data: user_data } = useQuery(GET_USER,   
        // {
        //     variables: input,
        //     onCompleted: data => async_get_user(data.get_user),
        //     onError: err => console.log(err),
        //     nextFetchPolicy: "cache-first"
        // });
    // }

    //console.log(user)

    // const input = { input: { id: user_id } }

    // const [gql_get_user, { loading: user_loading, data: user_data } ]= useLazyQuery(GET_USER,   
    // {
    //     //variables: input,
    //     onCompleted: data => async_get_user(data.get_user),
    //     onError: err => console.log(err),
    //     nextFetchPolicy: "cache-first"
    // });

    // if (user && user.id !== user_id) gql_get_user();

    // if (!auth.user || !auth.is_auth) 
    // {
    //     //router.push(ROUTES.LOGIN);
    //     window.location.href = ROUTES.LOGIN;
    //     return null;
    // }

    

    // const { loading: follower_loading, data: follower_data } = useQuery(GET_ALL_SUBSCRIPTIONS,   
    // {
    //     variables: { input: { profile_id: user.id } },
    //     onCompleted: data => 
    //     {
    //         // let profile = data.get_all_subscriptions.find(
    //         //     (sub: ISubscription) => sub.follower.id === user_id || sub.profile.id == user_id
    //         // );
    
    //         // if (profile) async_get_user({ ...profile });
    
    //         async_get_all_subscriptions(data.get_all_subscriptions);
    
    //         let check_subscription = data.get_all_subscriptions.find(
    //             (sub: ISubscription) => sub.follower.id === auth.user.id
    //         );
    //     },
    //     onError: err => 
    //     {
    //         console.log(err);
                        
    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         {
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     },
    //     nextFetchPolicy: "cache-first"
    // });

    
    return (

        <MainLayout>
            <Grid container justifyContent='center'>
            { /*user &&*/ <UserProfile user={user} /*user_id={user_id}*//>}
            {/* {user
                ? <UserProfile user={user} />
                : <div>User not found!</div>
            } */}
            </Grid>
            {/* <Grid container justifyContent='center'> */}
                {/* <Followers subscriptions={subscriptions} /*user_id={user.id}/> */}
            {/* </Grid> */}
            { auth.user.id === user?.id && 
            <Grid>
                <PostForm />
            </Grid> }
            <Grid container justifyContent='center'>
                <Posts posts={posts}/>
            </Grid>
        </MainLayout>
    )
}


export default UserPage;

// export const getServerSideProps: GetServerSideProps = async ({ params }: any) => 
// {
//     return {
//         props: { user_id: params.id }
//     }
// }

/*export const getServerSideProps: GetServerSideProps = async ({ params }: any) => 
{
    const response = await axios.get('http://localhost:5000/tracks/' + params.id);

    return {
        props: {
            server_track: response.data
        }
    }
}*/