import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import styles from "../../styles/App.module.scss";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Print } from "@mui/icons-material";
import {  Card, Grid, IconButton, Avatar, Typography, Button  } from "@mui/material";
import { useRouter } from 'next/router';
import { IGroup } from '../../types/group';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { LINKS, ROLES } from '../../utils/constants';
import AvatarDialog from '../Shared/Dialogs/AvatarDialog';
import { date_format } from '../../utils/date-format';
import MembersList from '../Shared/Lists/MembersList';


interface GroupProfileProps 
{
    //group_id?: string | string[];
    group: IGroup;
}

const GroupProfile: React.FC<GroupProfileProps> = ({ group /*group_id*/ }) => 
{
    const router = useRouter();

    //const input = { input: { id: group_id } }

    const [is_followed, set_is_followed] = useState(false);
    const [followers_count, set_followers_count] = useState(0);
    // const [open_avatar_dialog, set_open_avatar_dialog] = useState(false);

    // const handle_open_avatar_dialog = () => { set_open_avatar_dialog(true); };
    // const handle_close_avatar_dialog = () => { set_open_avatar_dialog(false); };
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    //const { group, groups, error: groups_error } = useTypedSelector(state => state.group);
    const { subscription, subscriptions, 
            error: subscriptions_error } = useTypedSelector(state => state.subscription);

    const get_all_subscriptions_input = { input: { profile_id: group?.id } }

    const { async_set_group, async_logout, 
            async_set_subscription, async_set_all_subscriptions,
            async_create_subscription, async_delete_subscription } = useActions();

    const check_auth = auth.is_auth && auth.user ? true : false;
    const check_admin = check_auth && auth.user.role === ROLES.ADMIN ? true : false;
    const check_group_admin = check_auth && group.admin_id === auth.user.id ? true : false;
    const check_group_moderator = check_auth && auth.user.role === ROLES.ADMIN ? true : false;

    // const { loading: group_loading, data: group_data } = useQuery(GET_GROUP,   
    // {
    //     variables: input,
    //     onCompleted: data => async_set_group(data.get_group),
    //     onError: err => 
    //     {
    //         console.log(err);
    //         async_set_group(null);
            
    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         {
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     },
    //     nextFetchPolicy: "cache-first"
    // });
    
    // const follow = () =>
    // {
    //     let subscription_input = { input: { profile_id: group.id } }

    //     if (is_followed) delete_subscription({ variables: subscription_input });
    //     else create_subscription({ variables: subscription_input });

    //     // get_subscriptions();
    // }
    
    return (

        <>
        { group ? 
           
            <Card className={styles.card}>
                <Grid 
                    container 
                    //direction="column" 
                    style={{ margin: 20 }}
                >
                    <Grid>
                        <IconButton>
                            <Avatar 
                                variant="square" 
                                alt={group.name} 
                                src={LINKS.STATIC_FILES_LINK + group.avatar}
                                style={{ height: 150, width: 150 }}
                            />
                        </IconButton>
                        {/* <UploadGroupAvatar group_id={group.id}/> */}
                        {auth.user.id === group.admin_id 
                            && <AvatarDialog group_id={group.id} 
                            avatar={LINKS.STATIC_FILES_LINK + group.avatar}/>}
                    </Grid> 
                    <Grid
                        //container
                        //direction="column" 
                        style={{ margin: '0 20px' }}
                    >
                        <Typography variant="h4">
                            {group.name}
                        </Typography>
                        <div style={{
                            fontSize: 12, 
                            color: 'gray'}}
                        >
                            Registered at: { date_format(group.created_at) }
                        </div>
                        { !group.is_private &&
                            <Button
                                //onClick={() => follow()}
                                style={{marginTop: 40}}
                                variant="contained" 
                                color="primary"
                                fullWidth
                                endIcon={ is_followed 
                                    ? <HighlightOffOutlinedIcon/> 
                                    : <AddCircleOutlinedIcon/> }
                            >
                                { is_followed ? `Unfollow | ${followers_count}` 
                                                : `Follow | ${followers_count}` }
                            </Button>
                        } 
                    </Grid>
                </Grid>

                <MembersList members={group.members}/>
            </Card>
            : <div>Group not found!</div> }
        </>
    );
}

export default GroupProfile;