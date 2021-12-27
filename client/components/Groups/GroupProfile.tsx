import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import styles from "../../styles/App.module.scss";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Print } from "@mui/icons-material";
import {  Card, Grid, IconButton, Avatar, Typography, 
            Button, RadioGroup, FormControlLabel, Radio  } from "@mui/material";
import { useRouter } from 'next/router';
import { IGroup } from '../../types/group';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { LINKS, ROLES, ROUTES } from '../../utils/constants';
import AvatarDialog from '../Shared/Dialogs/AvatarDialog';
import { date_format } from '../../utils/date-format';
import MembersSelect from '../Shared/Selects/MembersSelect';
import { ADD_GROUP_MEMBER, REMOVE_GROUP_MEMBER, UPDATE_GROUP } from '../../graphql/mutations/groups';
import { TOKEN } from '../../utils/token';
import { GET_GROUP } from '../../graphql/queries.ts/groups';
import ItemsSelect from '../Shared/Selects/ItemsSelect';


enum ACCESS
{
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC"
}

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

    const [access, set_access] = useState('');

    const handle_access_radio_change = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const is_private = (event.target as HTMLInputElement).value === ACCESS.PRIVATE;
        set_access((event.target as HTMLInputElement).value);
        update_group({ variables: { input: { id: group.id, is_private }}});
    }

    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { state_group, groups, error: groups_error } = useTypedSelector(state => state.group);
    const { async_set_group, async_logout } = useActions();

    const check_auth = auth.is_auth && auth.user;
    const check_admin = check_auth && auth.user.role === ROLES.ADMIN;
    const check_group_admin = check_auth && group.admin_id === auth.user.id;
    const check_group_moderator = check_auth 
        && group.moderator_ids.find(id => id === auth.user.id) !== undefined;
    const check_member = () => group.members.find(mem => mem.id === auth.user.id) !== undefined;

    const is_available = check_admin || check_group_admin || check_group_moderator;

    useEffect(() => {
        group.is_private 
            ? set_access(ACCESS.PRIVATE) 
            : set_access(ACCESS.PUBLIC);
        set_is_followed(check_member());
        set_followers_count(group.members.length);
    }, []);

    const [become_member, 
        { loading: become_member_loading }] = useMutation(ADD_GROUP_MEMBER, 
    {
        onCompleted: (data) => 
        {
            async_set_group(data.add_group_member)
            set_is_followed(true);
            set_followers_count(followers_count + 1);
        },
        onError: (err) => console.log(err)
    });

    const [leave_group, 
        { loading: leave_group_loading }] = useMutation(REMOVE_GROUP_MEMBER, 
    {
        onCompleted: (data) => 
        { 
            async_set_group(data.remove_group_member)
            set_is_followed(false);
            set_followers_count(followers_count - 1);
        },
        onError: (err) => console.log(err)
    });

    const { loading: group_loading, data: group_data } = useQuery(GET_GROUP,   
    {
        variables: { input: { id: group.id }},
        onCompleted: data => 
        {
            async_set_group(data.get_group)
        },
        onError: err => 
        {
            console.log(err);
            // async_set_group(null);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
        nextFetchPolicy: "cache-first"
    });

    const [update_group, { loading: update_group_loading, 
            data: update_group_data }] = useMutation(UPDATE_GROUP,   
    {
        onCompleted: data => 
        {
            async_set_group(data.update_group)
        },
        onError: err => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_set_group(null);
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        }
    });
    
    const follow = () =>
    {
        const input = { input: { group_id: group.id } }
        if (is_followed) leave_group({ variables: input });
        else become_member({ variables: input });
        // get_subscriptions();
    }
    
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
                        {is_available 
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
                        { !group.is_private || check_member() ?
                            <Button
                                onClick={() => follow()}
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
                            </Button> : null } 
                        { check_group_admin && <ItemsSelect title='Access'>
                            <RadioGroup
                                style={{padding: '4px 20px'}}
                                aria-label="quiz"
                                name="access"
                                value={access}
                                onChange={handle_access_radio_change}
                            >
                                <FormControlLabel style={{marginBottom: 10}}
                                    value={ACCESS.PRIVATE} 
                                    control={<Radio />} 
                                    label="Private" />
                                <FormControlLabel 
                                    value={ACCESS.PUBLIC} 
                                    control={<Radio />} 
                                    label="Public" />
                            </RadioGroup>
                        </ItemsSelect> }
                    </Grid>
                </Grid>
                {/* <MembersList members={group.members}/> */}
            </Card>
            : <div>Group not found!</div> }
        </>
    );
}

export default GroupProfile;