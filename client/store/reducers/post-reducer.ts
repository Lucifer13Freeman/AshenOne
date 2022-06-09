import { ILikePost, IPost, IPostState, PostAction, PostActionTypes } from "../types/post"


const initial_state: IPostState = {

    post: null,
    posts: [],
    error: undefined//''
}


export const post_reducer = (state = initial_state, action: PostAction): IPostState =>
{
    switch (action.type) 
    {
        case PostActionTypes.CREATE_POST:
        {
            //const posts_copy = [...state.posts];

            return {
                ...state, 
                posts: [action.payload, ...state.posts],
                error: undefined
            }
        }
        case PostActionTypes.CREATE_POST_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case PostActionTypes.SET_POST:
        {
            // const new_post = action.payload;
            // let update_posts = [...state.posts];
            // const post_index = update_posts.findIndex((post: IPost) => post.id === new_post.id);
            // update_posts[post_index] = new_post;

            const update_posts = state.posts.map((post: IPost) => 
            { 
                if (post.id === action.payload.id) post = action.payload
                return post 
            });

            return {
                ...state, 
                post: action.payload,
                posts: update_posts,
                error: undefined
            }
        }
        case PostActionTypes.SET_POST_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case PostActionTypes.SET_ALL_POSTS:
        {
            return {
                ...state, 
                posts: action.payload,
                error: undefined
            }
        }
        case PostActionTypes.SET_ALL_POSTS_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        // case PostActionTypes.UPDATE_POST:
        // {
        //     const update_posts = state.posts.map((post: IPost) => 
        //     { 
        //         if (post.id === action.payload.id) post = action.payload
        //         return post 
        //     });

        //     // const new_post = action.payload;
        //     // let update_posts = [...state.posts];
        //     // const post_index = update_posts.findIndex((post: IPost) => post.id === new_post.id);
        //     // update_posts[post_index] = new_post;

        //     return {
        //         ...state, 
        //         post: action.payload,
        //         posts: update_posts,
        //         error: undefined
        //     }
        // }
        // case PostActionTypes.UPDATE_POST_ERROR:
        // {
        //     return {
        //         ...state,
        //         error: action.payload
        //     }
        // }
        case PostActionTypes.LIKE_POST:
        {
            const new_like = action.payload;

            let update_posts = [...state.posts];
            let post_index = update_posts.findIndex((post: IPost) => post.id === new_like.post_id);

            let likes = [...update_posts[post_index].likes];

            const is_exists = likes.find((like: ILikePost) => like.id === new_like.id);

            if (is_exists) likes = likes.filter((like: ILikePost) => like.id !== new_like.id);
            else likes = [...likes, new_like]

            update_posts[post_index] = { ...update_posts[post_index], likes }

            return {
                ...state, 
                post: update_posts[post_index],
                posts: update_posts,
                error: undefined
            }
        }
        case PostActionTypes.LIKE_POST_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case PostActionTypes.DELETE_POST:
        {
            const updated_posts = state.posts.filter((post: IPost) => post.id !== action.payload);

            return {
                ...state, 
                post: null,
                posts: updated_posts,
                error: undefined
            }
        }
        case PostActionTypes.DELETE_POST_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
}