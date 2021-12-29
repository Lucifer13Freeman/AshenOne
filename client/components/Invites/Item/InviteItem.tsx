import { Card, Grid, IconButton, Avatar, Typography, CardContent, CardActionArea, Button } from "@mui/material";
import { useRouter } from "next/router";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import styles from "../../../styles/Item.module.scss";
import { ROUTES, LINKS } from "../../../utils/constants";
import { IInvite } from "../../../types/invite";
import { IPost } from "../../../types/post";
import { date_format } from "../../../utils/date-format";
import { IUser } from "../../../types/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useActions } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TOKEN } from "../../../utils/token";
import { GET_ALL_POSTS } from "../../../graphql/queries.ts/posts";
import React, { useEffect } from "react";
import { GET_INVITE } from "../../../graphql/queries.ts/invites";
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_INVITE } from "../../../graphql/mutations/invites";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ConfirmDialog from "../../Shared/Dialogs/ConfirmDialog";
import { ADD_GROUP_INVITED_MEMBER } from "../../../graphql/mutations/groups";
import { ADD_CHAT_INVITED_MEMBER } from "../../../graphql/mutations/chats";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


interface InviteItemProps 
{
    invite: IInvite;
}

const InviteItem: React.FC<InviteItemProps> = ({ invite }) => 
{
    const router = useRouter();

    const { async_logout, async_delete_invite, 
            async_set_chat, async_set_group } = useActions();

    // const { invite, error: invite_error } = useTypedSelector(state => state.invite);
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    // let latest_post: IPost | undefined;

    // if (invite.posts && invite.posts?.length > 0) 
    // {
    //     latest_post = invite.posts[invite.posts.length - 1];
    // }

    const [gql_add_group_invite_member, 
            { loading: add_group_invite_member_loading }] = useMutation(ADD_GROUP_INVITED_MEMBER, 
    {
        onCompleted: (data) => 
        {
            async_set_group(data.add_group_invited_member);
            async_delete_invite(invite.id);
        },
        onError: (err) => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        }
    });

    const [gql_add_chat_invite_member, 
            { loading: add_chat_invite_member_loading }] = useMutation(ADD_CHAT_INVITED_MEMBER, 
    {
        onCompleted: (data) => 
        {
            async_set_chat(data.add_chat_invited_member);
            async_delete_invite(invite.id);
        },
        onError: (err) => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        }
    });

    const [gql_delete_invite, { loading: delete_invite_loading }] = useMutation(DELETE_INVITE, 
    {
        onCompleted: (data) => async_delete_invite(data.delete_invite),
        onError: (err) => 
        {
            console.log(err);
                
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
         }
    });

    const accept_invite = (e: any) =>
    {
        e.stopPropagation();
        if (invite.group?.id) accept_group_invite();
        else if (invite.chat?.id) accept_chat_invite();
    }

    const accept_group_invite = () =>
    {
        const input = { input: { user_id: auth.user.id, group_id: invite.group?.id }}
        gql_add_group_invite_member({ variables: input });
    }

    const accept_chat_invite = () =>
    {
        const input = { input: { user_id: auth.user.id, chat_id: invite.chat?.id }}
        gql_add_chat_invite_member({ variables: input });
    }

    const reject_invite = (e: any) =>
    {
        e.stopPropagation();
        gql_delete_invite({ variables: { input: { id: invite.id }}});
    }


    return (

        <Card className={styles.item} raised>
            <IconButton onClick={() => router.push(ROUTES.PEOPLE + invite.sender.id)}>
                <Avatar 
                    alt={invite.sender.avatar} 
                    src={LINKS.STATIC_FILES_LINK + invite.sender.avatar}
                />
            </IconButton>
            <CardActionArea style={{ borderRadius: 10, padding: 4 }} 
                            disabled={invite.group?.id === undefined}>
                <Grid 
                    container 
                    direction="column" 
                    onClick={() => invite.group?.id && router.push(ROUTES.GROUPS + invite.group?.id)}
                                                //router.push(invite.group?.id ? (ROUTES.GROUPS + invite.group?.id) : '')}
                                                //: invite.chat?.id ? (ROUTES.CHATS + invite.chat?.id) : '')}
                >
                    <Typography 
                        className={styles.name} 
                        //variant="body2" 
                        component="p"
                    >
                        {'Invite to ' + (invite.group?.id ? 'group ' + invite.group?.name
                                        : invite.chat?.id ? 'chat' : '...')}
                    </Typography>
                    <Typography 
                        className={styles.latest_post} 
                        variant="body2" 
                        component="p"
                    >
                        {'From user:  ' + invite.sender?.username}
                    </Typography>
                    <Typography 
                        className={styles.latest_post} 
                        variant="body2" 
                        component="p"
                    >
                        {date_format(invite?.created_at)}
                    </Typography>
                </Grid>
            </CardActionArea>
            <Grid style={{marginLeft: 'auto'}}>
                <IconButton onClick={accept_invite}>
                    <CheckRoundedIcon />
                </IconButton>
                <IconButton onClick={reject_invite}>
                    <CloseRoundedIcon />
                </IconButton>
            </Grid>
        </Card>
    );
}

export default InviteItem;