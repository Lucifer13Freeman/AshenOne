import { IMessage, MessageActionTypes } from '../../types/message';


export const get_all_messages = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.GET_ALL_MESSAGES,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.GET_ALL_MESSAGES_ERROR, 
            payload: 'Messages loading error!'
        });
    }
}

export const async_get_all_messages = (payload: IMessage[]) => (
{
    type: MessageActionTypes.ASYNC_GET_ALL_MESSAGES,
    payload
});

export const get_message = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.GET_MESSAGE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.GET_MESSAGE_ERROR, 
            payload: 'Message loading error!'
        });
    }
}

export const async_get_message = (payload: IMessage | null) => (
{
    type: MessageActionTypes.ASYNC_GET_MESSAGE,
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

export const update_message = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: MessageActionTypes.UPDATE_MESSAGE,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: MessageActionTypes.UPDATE_MESSAGE_ERROR, 
            payload: 'Message loading error!'
        });
    }
}

export const async_update_message = (payload: IMessage | null) => (
{
    type: MessageActionTypes.ASYNC_UPDATE_MESSAGE,
    payload
});

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