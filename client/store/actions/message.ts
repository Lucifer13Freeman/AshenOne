import { IMessage, MessageActionTypes } from '../types/message';
import { IReaction, ReactionActionTypes } from '../types/reaction';


export const set_all_messages = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.SET_ALL_MESSAGES,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.SET_ALL_MESSAGES_ERROR, 
            payload: 'Messages loading error!'
        });
    }
}

export const async_set_all_messages = (payload: IMessage[]) => (
{
    type: MessageActionTypes.ASYNC_SET_ALL_MESSAGES,
    payload
});

export const set_message = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.SET_MESSAGE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.SET_MESSAGE_ERROR, 
            payload: 'Message loading error!'
        });
    }
}

export const async_set_message = (payload: IMessage | null) => (
{
    type: MessageActionTypes.ASYNC_SET_MESSAGE,
    payload
});

export const create_message = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.CREATE_MESSAGE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.CREATE_MESSAGE_ERROR, 
            payload: 'Message loading error!'
        });
    }
}

export const async_create_message = (payload: IMessage | null) => (
{
    type: MessageActionTypes.ASYNC_CREATE_MESSAGE,
    payload
});

// export const update_message = ({ payload }: any) =>
// {
//     try
//     { 
//         return (
//         {
//             type: MessageActionTypes.UPDATE_MESSAGE,
//             payload
//         });
//     } 
//     catch (err) 
//     {
//         return (
//         { 
//             type: MessageActionTypes.UPDATE_MESSAGE_ERROR, 
//             payload: 'Message loading error!'
//         });
//     }
// }

// export const async_update_message = (payload: IMessage | null) => (
// {
//     type: MessageActionTypes.ASYNC_UPDATE_MESSAGE,
//     payload
// });

export const delete_message = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.DELETE_MESSAGE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.DELETE_MESSAGE_ERROR, 
            payload: 'Message loading error!'
        });
    }
}

export const async_delete_message = (payload: IMessage | null) => (
{
    type: MessageActionTypes.ASYNC_DELETE_MESSAGE,
    payload
});

export const set_reaction = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ReactionActionTypes.SET_REACTION,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ReactionActionTypes.SET_REACTION_ERROR, 
            payload: 'Reaction loading error!'
        });
    }
}

export const async_set_reaction = (payload: IReaction | null) => (
{
    type: ReactionActionTypes.ASYNC_SET_REACTION,
    payload
});