import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { FormControl, Grid, IconButton, Input, InputLabel, ListItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ListDialog from '../Shared/Dialogs/ListDialog';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_ALL_INVITES, GET_ALL_RECEIVED_INVITES } from '../../graphql/queries.ts/invites';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { TOKEN } from '../../utils/token';
import { ROUTES } from '../../utils/constants';
import { IInvite } from '../../types/invite';
import InviteList from './List/InviteList';
import styles from '../../styles/Invites.module.scss';
import { NEW_INVITE } from '../../graphql/subscriptions/invites';



const Invites: React.FC = () =>
{
    const router = useRouter();
    
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { invites, error: invites_error } = useTypedSelector(state => state.invite);

    const { async_set_all_invites, async_logout } = useActions();

    const input = {
        input: {
            // limit: 300,
            // offset: 0
        }
    }

    const { loading: invites_loading, data: invites_data } = useQuery(GET_ALL_RECEIVED_INVITES,   
    {
        variables: input,
        onCompleted: data => async_set_all_invites(data.get_received_invites),
        onError: err => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            { 
                router.push(ROUTES.LOGIN);
                async_set_all_invites([]);
                async_logout();
            }
        },
        nextFetchPolicy: "cache-first"
    });


    const { data: invite_data, error: invite_error } = useSubscription(NEW_INVITE);

    useEffect(() => 
    {
        if (invite_error) console.error(invite_error);
        if (invite_data && invite_data.new_invite.user.id === auth.user.id) async_set_all_invites([...invites, invite_data.new_invite]);
    }, [invite_data, invite_error]);
    

    return (
        <Grid>
            <ListDialog 
                // button_title='Invites' 
                transition='right'
                dialog_title='Invites'
                button_type='invite'
                // list_content={{
                //     // value: invites.,
                //     // set_value: set_post_text,
                //     // is_loading: update_post_loading,
                //     // placeholder: 'Edit post...'
                // }}
            >
                { invites?.length > 0 ?
                    <InviteList invites={invites?.filter((inv: IInvite) => (inv.user.id === auth.user.id))}/> :
                    <Grid className={styles.no_invites}>No invites...</Grid> }
            </ListDialog> 
        </Grid>
    );
}

export default Invites;