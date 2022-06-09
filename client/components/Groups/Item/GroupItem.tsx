import { Card, Grid, IconButton, Avatar, Typography, CardContent, CardActionArea, Button } from "@mui/material";
import { useRouter } from "next/router";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import styles from "../../../styles/Item.module.scss";
import { ROUTES, LINKS } from "../../../utils/constants";
import { IGroup } from "../../../store/types/group";
import { IPost } from "../../../store/types/post";
import { date_format } from "../../../utils/date-format";
import { IUser } from "../../../store/types/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useActions } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TOKEN } from "../../../utils/token";
import { GET_ALL_POSTS } from "../../../graphql/queries.ts/posts";
import React, { useEffect } from "react";
import { GET_GROUP } from "../../../graphql/queries.ts/groups";
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_GROUP, REMOVE_GROUP_MEMBER } from "../../../graphql/mutations/groups";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ConfirmDialog from "../../Shared/Dialogs/ConfirmDialog";


interface GroupItemProps 
{
    group: IGroup;
}

const GroupItem: React.FC<GroupItemProps> = ({ group }) => 
{
    const router = useRouter();

    const { async_logout, async_leave_group, async_delete_group } = useActions();

    // const { group, error: group_error } = useTypedSelector(state => state.group);
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    let latest_post: IPost | undefined;
    let is_member = group?.members.find((mem: IUser) => mem.id === auth.user?.id) !== undefined;

    if (!group.is_private && group.posts && group.posts?.length > 0) 
        latest_post = group.posts[group.posts?.length - 1];

    useEffect(() => 
    {
        is_member = group?.members.find((mem: IUser) => mem.id === auth.user?.id) !== undefined;
        if (!group.is_private && group.posts && group.posts?.length > 0) 
            latest_post = group.posts[group.posts?.length - 1];
    }, [group]);

    // if (!group.is_private && group.posts && group.posts?.length > 0) 
    //     latest_post = group.posts[group.posts.length - 1];
    

    const [gql_leave_group, { loading: leave_group_loading }] = useMutation(REMOVE_GROUP_MEMBER, 
    {
        onCompleted: (data) => async_leave_group(data.remove_group_member),
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

    const [gql_delete_group, { loading: delete_group_loading }] = useMutation(DELETE_GROUP, 
    {
        onCompleted: (data) => async_delete_group(data.delete_group),
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

    const leave_group = (e: any) =>
    {
        e.stopPropagation();
        const input = { input: { 
            group_id: group.id,
            user_id: auth.user?.id
        }}
        gql_leave_group({ variables: input });
    }

    const delete_group = (e: any) =>
    {
        e.stopPropagation();
        gql_delete_group({ variables: { input: { id: group?.id }}});
    }


    return (

        <Card className={styles.item} style={{ padding: '0 10px' }} raised>
            <IconButton onClick={() => router.push(ROUTES.GROUPS + group?.id)}>
                <Avatar 
                    alt={group?.name} 
                    src={LINKS.STATIC_FILES_LINK + group?.avatar}
                />
            </IconButton>
            <CardActionArea style={{ borderRadius: 10, padding: 4 }}>
                <Grid 
                    container 
                    direction="column" 
                    onClick={() => /*get_selected_group()*/router.push(ROUTES.GROUPS + group?.id)}
                >
                    <Typography 
                        className={styles.name} 
                        //variant="body2" 
                        component="p"
                    >
                        {group?.name}
                    </Typography>
                    <Typography 
                        className={styles.latest_post} 
                        variant="body2" 
                        component="p"
                    >
                        {group?.posts 
                            && !group?.is_private 
                            && group?.posts?.length > 0 
                                ? latest_post?.text 
                                : ''}
                    </Typography>
                    <Typography 
                        className={styles.latest_post} 
                        variant="body2" 
                        component="p"
                    >
                        {date_format(latest_post?.created_at)}
                    </Typography>
                    {/* <IconButton 
                    // onClick={ e => e.stopPropagation() } 
                        style={{marginLeft: 'auto'}}
                    >
                        <DeleteIcon
                            //onClick={delete_track}
                        />
                    </IconButton> */}
                </Grid>
            </CardActionArea>
            {/* <IconButton 
                onClick={leave_group} 
                style={{marginLeft: 'auto'}}
            >
                <MeetingRoomIcon/>
            </IconButton> */}
            { is_member &&
            <Grid style={{marginLeft: 'auto'}}>
                <ConfirmDialog 
                    button_title='Leave' 
                    dialog_title='Leave group'
                    button_variant='contained'
                    button_type="leave"
                >
                    <Button onClick={leave_group}>Leave</Button>
                    <Button>Cancel</Button>
                </ConfirmDialog>
            </Grid> }
            { auth.user?.id === group?.admin_id && 
            <Grid style={{marginLeft: 'auto'}}>
                <ConfirmDialog 
                    button_title='Delete' 
                    dialog_title='Delete group'
                    button_variant='contained'
                    button_type="delete"
                >
                    <Button onClick={delete_group}>Delete</Button>
                    <Button>Cancel</Button>
                </ConfirmDialog>
           </Grid> }
            {/* <IconButton 
                onClick={delete_group} 
                style={{marginLeft: 'auto'}}
            >
                <DeleteForeverRoundedIcon/>
            </IconButton> */}
        </Card>
    );
}

export default GroupItem;