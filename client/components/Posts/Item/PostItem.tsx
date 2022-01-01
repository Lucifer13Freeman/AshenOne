import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IPost } from '../../../types/post';
import { ROUTES, LINKS } from '../../../utils/constants';
import { date_format } from '../../../utils/date-format';
import styles from '../../../styles/App.module.scss';
import { LIKE_POST } from '../../../graphql/mutations/likes';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { TOKEN } from '../../../utils/token';
import { async_logout } from '../../../store/actions/auth';
import router from 'next/router';
import { useActions } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Comments from '../../Comments/Comments';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Button, FormGroup, Grid, Icon } from '@mui/material';
import CommentForm from '../../Comments/CommentForm';
import { GET_POST } from '../../../graphql/queries.ts/posts';
import { IComment } from '../../../types/comment';
import ConfirmDialog from '../../Shared/Dialogs/ConfirmDialog';
import EditPopper from '../../Shared/Poppers/EditPopper';
import FormDialog from '../../Shared/Dialogs/FormDialog';
import { DELETE_POST, UPDATE_POST } from '../../../graphql/mutations/posts';
import { useState } from 'react';
import { NEW_LIKE_POST } from '../../../graphql/subscriptions/posts';


interface ExpandMoreProps extends IconButtonProps { expand: boolean; }

const ExpandMore = styled((props: ExpandMoreProps) => 
{
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    // maxWidth: 780,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface PostItemProps
{
    post: IPost;
    is_for_group?: boolean;
    // expanded: boolean;
    // set_expanded: Function;
    // handle_expand_click: Function;
}

const PostItem: React.FC<PostItemProps> = ({ post, is_for_group = false/*, expanded, set_expanded*/ }) => 
{
    const [expanded, set_expanded] = React.useState(false);
    const handle_expand_click = () => { set_expanded(!expanded); };

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { group, error: group_error } = useTypedSelector(state => state.group);
    const { post: state_post, error: posts_error } = useTypedSelector(state => state.post);
    const { comments, comment, error: comments_error } = useTypedSelector(state => state.comment);
    const { async_logout, async_delete_post, async_like_post, 
            async_set_post } = useActions();

    

    // const { data: new_like_post_data, error: new_like_post_error } = useSubscription(NEW_LIKE_POST);

    // React.useEffect(() => 
    // {
    //     if (new_like_post_error) console.log(new_like_post_error);
    //     if (new_like_post_data) async_like_post(new_like_post_data.new_like_post);
    // }, [new_like_post_data, new_like_post_error]);

    // React.useEffect(() => {
    //     async_set_all_comments(post.comments);
    // }, [post]);

    const [gql_like_post, { data: like_post_data, loading: like_post_loading }] = useMutation(LIKE_POST, 
    {
        onCompleted: (data) => async_like_post(data.like_post),
        onError: (err) => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
        }
    });

    const [get_post, { loading: post_loading, data: post_data }] = useLazyQuery(GET_POST,   
    {
        onCompleted: data => async_set_post(data.get_post),
        onError: (err) => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });

    React.useEffect(() => { 
        // console.log(comment?.post_id)
        // console.log(post.id)
        // if (post.id === comment.post_id) 
        // {
        // if (like_post_data?.like_post && 
        //     post.id === like_post_data?.like_post.post_id) 
            // get_post({ variables: { input: { id: post.id/*like_post_data.like_post.post_id*/ }}}); 
        //     console.log("works")
        // }

        get_post({ variables: { input: { id: post.id }}});
        
    }, [comment/*like_post_data?.like_post*/]);

    const like_post = (e: React.FormEvent) =>
    {
        e.preventDefault();
        const input = { input: { post_id: post.id }}
        gql_like_post({ variables: input });
    }

    const [gql_delete_post, { loading: delete_post_loading }] = useMutation(DELETE_POST, 
    {
        onCompleted: (data) => async_delete_post(data.delete_post),
        onError: (err) => 
        {
            console.log(err);
        
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
        },
    });
    
    const delete_post = (e: any) =>
    {
        e.preventDefault();
        const input = { input: { id: post.id } }
        gql_delete_post({ variables: input });
    }
    
    const [post_text, set_post_text] = useState(post.text);
    
    const [gql_update_post, { loading: update_post_loading }] = useMutation(UPDATE_POST, 
    {
        onCompleted: (data) => async_set_post(data.update_post),
        onError: (err) => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
        },
    });
    
    const update_post = (e: any) =>
    {
        e.preventDefault();
        const input = { input: { 
            post_id: post.id,
            text: post_text
        }}
        gql_update_post({ variables: input });
    }


    return (
        <Card className={styles.card} sx={{ maxWidth: 345 }} style={{marginBottom: 10}} raised>
            <CardHeader
                avatar={
                    <IconButton onClick={() => router.push(ROUTES.PEOPLE + (is_for_group 
                                                                            ? group?.id 
                                                                            : post.user?.id))}>
                        <Avatar 
                            alt={is_for_group ? group?.name : post.user?.username} 
                            src={LINKS.STATIC_FILES_LINK + (is_for_group 
                                                            ? group?.avatar 
                                                            : post.user?.avatar)}
                        />
                    </IconButton>
                }
                action={
                    auth.user?.id === post.user?.id && (
                    <EditPopper>
                        <Grid container direction="column">
                            {/* <Button style={{marginBottom: 6}}>Edit</Button> */}
                            <form onSubmit={update_post}>
                                <FormGroup>
                                    <FormDialog 
                                        button_title='Edit' 
                                        dialog_title='Edit post'
                                        button_variant='text'
                                        is_default_input={false}
                                        form_content={{
                                            text: post_text,
                                            set_text: set_post_text,
                                            is_loading: update_post_loading,
                                            is_with_button: false,
                                            placeholder: 'Edit post...'
                                        }}
                                    >
                                        <Button onClick={update_post}>Save changes</Button>
                                    </FormDialog>
                                </FormGroup>
                            </form>
                            <ConfirmDialog 
                                button_title='Delete' 
                                dialog_title='Delete post'
                                button_variant='contained'
                            >
                                <Button onClick={delete_post}>Delete</Button>
                                <Button>Cancel</Button>
                            </ConfirmDialog>
                        </Grid>
                    </EditPopper> )
                }
                // title=""
                subheader={date_format(post.created_at)} 
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like post" onClick={like_post}>
                    <FavoriteIcon />{post.likes?.length}
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handle_expand_click}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {post.comments && <Comments 
                        //comments={comments.filter((comment: IComment) => comment.post_id === post.id)} 
                        comments={post.comments}
                        post_id={post.id}/>}
                    <CommentForm post_id={post.id}/>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default PostItem;