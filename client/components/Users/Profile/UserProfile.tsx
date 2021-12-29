import { useRouter } from "next/router";
import { IUser } from "../../../types/user";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import styles from "../../../styles/App.module.scss";
import { date_format } from '../../../utils/date-format';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries.ts/users";
import { TOKEN } from "../../../utils/token";
import { ROUTES, LINKS } from "../../../utils/constants";
import { GET_ALL_SUBSCRIPTIONS } from "../../../graphql/queries.ts/subscription";
import { CREATE_SUBSCRIPTION, DELETE_SUBSCRIPTION } from "../../../graphql/mutations/subscription";
import { useEffect, useState } from "react";
import { ISubscription } from "../../../types/subscription";
import Followers from '../../Subscriptions/Followers';
import { Print } from "@mui/icons-material";
import PrinterForm from "../../Printer/PrinterForm";
import Printer from "../../Printer/Printer";
import {  Card, Grid, IconButton, Avatar, Typography, Button  } from "@mui/material";
import ImageDialog from "../../Shared/Dialogs/ImageDialog";


interface UserProfileProps 
{
    //user_id?: string | string[];
    user: IUser;
}


const UserProfile: React.FC<UserProfileProps> = ({ user /*user_id*/ }) => 
{
    const router = useRouter();

    //const input = { input: { id: user_id } }

    const [is_followed, set_is_followed] = useState(false);
    const [followers_count, set_followers_count] = useState(0);
    // const [open_avatar_dialog, set_open_avatar_dialog] = useState(false);

    // const handle_open_avatar_dialog = () => { set_open_avatar_dialog(true); };
    // const handle_close_avatar_dialog = () => { set_open_avatar_dialog(false); };
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    //const { user, users, error: users_error } = useTypedSelector(state => state.user);
    const { subscription, subscriptions, 
            error: subscriptions_error } = useTypedSelector(state => state.subscription);

    const get_all_subscriptions_input = { input: { profile_id: user?.id } }

    const { async_set_user, async_logout, 
            async_set_subscription, async_set_all_subscriptions,
            async_create_subscription, async_delete_subscription } = useActions();


    // const { loading: user_loading, data: user_data } = useQuery(GET_USER,   
    // {
    //     variables: input,
    //     onCompleted: data => async_set_user(data.get_user),
    //     onError: err => 
    //     {
    //         console.log(err);
    //         async_set_user(null);
            
    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         {
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     },
    //     nextFetchPolicy: "cache-first"
    // });

    const [get_subscriptions, 
        { loading: follower_loading, 
            data: follower_data }] = useLazyQuery(GET_ALL_SUBSCRIPTIONS,   
    {
        variables: get_all_subscriptions_input,
        onCompleted: data => 
        {
            // let profile = data.get_all_subscriptions.find(
            //     (sub: ISubscription) => sub.follower.id === user_id || sub.profile.id == user_id
            // );

            // if (profile) async_set_user({ ...profile });

            async_set_all_subscriptions(data.get_all_subscriptions);

            let check_subscription = data.get_all_subscriptions.find(
                (sub: ISubscription) => sub.follower.id === auth.user?.id
            );

            set_is_followed(check_subscription !== undefined);
            set_followers_count(data.get_all_subscriptions.length);
            //console.log(data.get_all_subscriptions.length)
        },
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

    const [create_subscription, 
        { loading: create_subscription_loading }] = useMutation(CREATE_SUBSCRIPTION, 
    {
        onCompleted: (data) => 
        {
            async_create_subscription(data.create_subscription);
            set_is_followed(true);
            set_followers_count(followers_count + 1);
        },
        onError: (err) => console.log(err)
    });

    const [delete_subscription, 
        { loading: delete_subscription_loading }] = useMutation(DELETE_SUBSCRIPTION, 
    {
        onCompleted: (data) => 
        { 
            async_delete_subscription(data.delete_subscription);
            set_is_followed(false);
            set_followers_count(followers_count - 1);
        },
        onError: (err) => console.log(err)
    });

    
    useEffect(() => { get_subscriptions(); }, []);

    const follow = () =>
    {
        let subscription_input = { input: { profile_id: user?.id } }

        if (is_followed) delete_subscription({ variables: subscription_input });
        else create_subscription({ variables: subscription_input });

        // get_subscriptions();
    }

    
    return (

        <div>
        { user ? 
            <>
            <Card className={styles.card} sx={{ maxWidth: 345 }}>
                <Grid 
                    container 
                    //direction="column" 
                    style={{ margin: 20 }}
                >
                    <Grid>
                        {/* <IconButton>
                            <Avatar 
                                variant="square" 
                                alt={user.username} 
                                src={LINKS.STATIC_FILES_LINK + user.avatar}
                                style={{ height: 150, width: 150 }}
                            />
                        </IconButton> */}
                        {/* <UploadUserAvatar user_id={user.id}/> */}
                        { auth.user?.id === user?.id ?
                            <ImageDialog user_id={user.id} avatar={LINKS.STATIC_FILES_LINK + user.avatar}>
                                <Avatar 
                                    variant="square" 
                                    alt={user.username} 
                                    src={LINKS.STATIC_FILES_LINK + user.avatar}
                                    style={{ height: 150, width: 150 }}
                                />
                            </ImageDialog> :
                            <Avatar 
                                variant="square" 
                                alt={user.username} 
                                src={LINKS.STATIC_FILES_LINK + user.avatar}
                                style={{ height: 150, width: 150 }}
                            /> }
                    </Grid> 
                    <Grid
                        //container
                        //direction="column" 
                        style={{ margin: '0 20px' }}
                    >
                        <Typography variant="h4">
                            {user.username}
                        </Typography>
                        <div style={{
                            fontSize: 12, 
                            color: 'gray'}}
                        >
                            Registered at: { date_format(user.created_at) }
                        </div>
                        { user.id !== auth.user?.id &&
                            <Button
                                onClick={() => follow()}
                                style={{marginTop: 40}}
                                variant="contained" 
                                color="primary"
                                fullWidth
                                endIcon={ is_followed ? <HighlightOffOutlinedIcon/> : <AddCircleOutlinedIcon/> }
                            >
                                { is_followed ? `Unfollow | ${followers_count}` 
                                                : `Follow | ${followers_count}` }
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Card>
            {/* <Card style={{ margin: '10px 0' }}> */}
            { subscriptions.length > 0 && <Followers subscriptions={subscriptions} /*user_id={user.id}*//> }
            {/* </Card> */}
            </>
            : <div>User not found!</div> }
        </div>
    );
}

export default UserProfile;