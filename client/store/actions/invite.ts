import { IInvite, InviteActionTypes } from '../types/invite';


export const set_all_invites = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: InviteActionTypes.SET_ALL_INVITES,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: InviteActionTypes.SET_ALL_INVITES_ERROR, 
            payload: 'Invites loading error!'
        });
    }
}

export const async_set_all_invites = (payload: IInvite[]) => (
{
    type: InviteActionTypes.ASYNC_SET_ALL_INVITES,
    payload
});

// export const set_received_invites = ({ payload }: any) =>
// {
//     try
//     { 
//         return (
//         {
//             type: InviteActionTypes.SET_RECEIVED_INVITES,
//             payload
//         });
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: InviteActionTypes.SET_RECEIVED_INVITES_ERROR, 
//             payload: 'Invites loading error!'
//         });
//     }
// }

// export const async_set_received_invites = (payload: IInvite[]) => (
// {
//     type: InviteActionTypes.ASYNC_SET_RECEIVED_INVITES,
//     payload
// });

// export const set_sent_invites = ({ payload }: any) =>
// {
//     try
//     { 
//         return (
//         {
//             type: InviteActionTypes.SET_SENT_INVITES,
//             payload
//         });
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: InviteActionTypes.SET_SENT_INVITES_ERROR, 
//             payload: 'Invites loading error!'
//         });
//     }
// }

// export const async_set_sent_invites = (payload: IInvite[]) => (
// {
//     type: InviteActionTypes.ASYNC_SET_SENT_INVITES,
//     payload
// });

export const set_invite = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: InviteActionTypes.SET_INVITE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: InviteActionTypes.SET_INVITE_ERROR, 
            payload: 'Invite loading error!'
        });
    }
}

export const async_set_invite = (payload: IInvite | null) => (
{
    type: InviteActionTypes.ASYNC_SET_INVITE,
    payload
});

export const create_invite = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: InviteActionTypes.CREATE_INVITE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: InviteActionTypes.CREATE_INVITE_ERROR, 
            payload: 'Invite loading error!'
        });
    }
}

export const async_create_invite = (payload: IInvite | null) => (
{
    type: InviteActionTypes.ASYNC_CREATE_INVITE,
    payload
});

export const delete_invite = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: InviteActionTypes.DELETE_INVITE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: InviteActionTypes.DELETE_INVITE_ERROR, 
            payload: 'Invite loading error!'
        });
    }
}

export const async_delete_invite = (payload: string | null) => (
{
    type: InviteActionTypes.ASYNC_DELETE_INVITE,
    payload
});