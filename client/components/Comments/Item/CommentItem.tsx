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
import { IComment } from '../../../types/comment';
import { ROUTES, LINKS } from '../../../utils/constants';
import { date_format } from '../../../utils/date-format';
import styles from '../../../styles/App.module.scss';
import { LIKE_COMMENT } from '../../../graphql/mutations/likes';
import { TOKEN } from '../../../utils/token';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useAction';
import { async_set_all_comments } from '../../../store/actions/comment';
import { useRouter } from 'next/router';
import EditPopper from '../../Shared/Poppers/EditPopper';
import { Button, FormGroup, Grid } from '@mui/material';
import ConfirmDialog from '../../Shared/Dialogs/ConfirmDialog';
import { DELETE_COMMENT, UPDATE_COMMENT } from '../../../graphql/mutations/comments';
import FormDialog from '../../Shared/Dialogs/FormDialog';
import SendInput from '../../Shared/Inputs/SendInput';
import { useState } from 'react';
import { GET_POST } from '../../../graphql/queries.ts/posts';
import { NEW_LIKE_COMMENT } from '../../../graphql/subscriptions/comments';


interface CommentItemProps
{
    comment: IComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => 
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { comment: state_comment, error: comments_error } = useTypedSelector(state => state.comment);
    const { async_delete_comment, async_set_comment, 
            async_logout, async_like_comment, async_set_post } = useActions();

    // React.useEffect(() => {
    //     async_set_all_comments(comment);
    // }, [comment]);

    // const { data: new_like_comment_data, error: new_like_comment_error } = useSubscription(NEW_LIKE_COMMENT);

    // React.useEffect(() => 
    // {
    //     if (new_like_comment_error) console.log(new_like_comment_error);
    //     if (new_like_comment_data) async_like_comment(new_like_comment_data.new_like_comment);
    // }, [new_like_comment_data, new_like_comment_error]);

    const [gql_like_comment, { data: like_comment_data, 
                            loading: like_comment_loading }] = useMutation(LIKE_COMMENT, 
    {
        onCompleted: (data) => async_like_comment(data.like_comment),
        onError: (err) => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
    });

    const like_comment = (e: React.FormEvent) =>
    {
        e.preventDefault();

        const input = {
            input: {
                comment_id: comment.id
            }
        }

        gql_like_comment({ variables: input });
    }

    // const [get_post, { loading: post_loading, data: post_data }] = useLazyQuery(GET_POST,   
    // {
    //     onCompleted: data => async_set_post(data.get_post),
    //     onError: (err) => 
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

    // React.useEffect(() => { 
    //     // console.log(comment?.post_id)
    //     // console.log(post.id)
    //     // if (post.id === comment.post_id) 
    //     // {
    //     if (comment.post_id && 
    //         like_comment_data?.like_comment && 
    //         comment.id === like_comment_data?.like_comment.comment_id) 
    //         get_post({ variables: { input: { id: comment.post_id }}}); 
    //     //     console.log("works")
    //     // }
        
    // }, [like_comment_data?.like_comment]);

    const [gql_delete_comment, { loading: delete_comment_loading }] = useMutation(DELETE_COMMENT, 
    {
        onCompleted: (data) => async_delete_comment(data.delete_comment),
        onError: (err) => 
        {
            console.log(err);
    
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
    });

    const delete_comment = (e: any) =>
    {
        e.preventDefault();
        const input = { input: { id: comment.id } }
        gql_delete_comment({ variables: input });
    }

    const [comment_text, set_comment_text] = useState(comment.text);

    const [gql_update_comment, { loading: update_comment_loading }] = useMutation(UPDATE_COMMENT, 
    {
        onCompleted: (data) => async_set_comment(data.update_comment),
        onError: (err) => 
        {
            console.log(err);
        
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
    });

    const update_comment = (e: any) =>
    {
        e.preventDefault();
        const input = { input: { 
            comment_id: comment.id,
            text: comment_text
        } }
        gql_update_comment({ variables: input });
    }


    return (
        <Card /*lassName={styles.card}*/ style={{ margin: '10px 0' }} /*sx={{ maxWidth: 345 }}*/ raised>
            <CardHeader
                avatar={
                    <IconButton onClick={() => router.push(ROUTES.PEOPLE + comment.user.id)}>
                        <Avatar 
                            alt={comment.user?.username} 
                            src={LINKS.STATIC_FILES_LINK + comment.user.avatar}
                        />
                    </IconButton>
                }
                action={
                    auth.user.id === comment.user.id && (
                    <EditPopper>
                        <Grid container direction="column">
                            {/* <Button style={{marginBottom: 6}}>Edit</Button> */}
                            <form onSubmit={update_comment}>
                                <FormGroup>
                                    <FormDialog 
                                        button_title='Edit' 
                                        dialog_title='Edit comment'
                                        button_variant='text'
                                        form_content={{
                                            text: comment_text,
                                            set_text: set_comment_text,
                                            is_loading: update_comment_loading,
                                            is_with_button: false,
                                            placeholder: 'Edit comment...'
                                        }}
                                    >
                                        <Button onClick={update_comment}>Save changes</Button>
                                    </FormDialog>
                                </FormGroup>
                            </form>
                            <ConfirmDialog 
                                button_title='Delete' 
                                dialog_title='Delete comment'
                                button_variant='contained'
                            >
                                <Button onClick={delete_comment}>Delete</Button>
                                <Button>Cancel</Button>
                            </ConfirmDialog>
                        </Grid>
                    </EditPopper> )
                }
                // title=""
                subheader={date_format(comment.created_at)} 
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {comment.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like comment" onClick={like_comment}>
                    <FavoriteIcon />{comment.likes?.length}
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default CommentItem;