import { ChatActionTypes, IChat } from '../../types/chat';


export const set_all_chats = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.SET_ALL_CHATS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.SET_ALL_CHATS_ERROR, 
            payload: 'Chats loading error!'
        });
    }
}

export const async_set_all_chats = (payload: IChat[]) => (
{
    type: ChatActionTypes.ASYNC_SET_ALL_CHATS,
    payload
});

export const set_chat = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.SET_CHAT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.SET_CHAT_ERROR, 
            payload: 'Chat loading error!'
        });
    }
}

export const async_set_chat = (payload: IChat | null) => (
{
    type: ChatActionTypes.ASYNC_SET_CHAT,
    payload
});

export const create_chat = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.CREATE_CHAT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.CREATE_CHAT_ERROR, 
            payload: 'Chat loading error!'
        });
    }
}

export const async_create_chat = (payload: IChat | null) => (
{
    type: ChatActionTypes.ASYNC_CREATE_CHAT,
    payload
});

export const leave_chat = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.LEAVE_CHAT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.LEAVE_CHAT_ERROR, 
            payload: 'Chat loading error!'
        });
    }
}

export const async_leave_chat = (payload: IChat | null) => (
{
    type: ChatActionTypes.ASYNC_LEAVE_CHAT,
    payload
});

export const delete_chat = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.DELETE_CHAT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.DELETE_CHAT_ERROR, 
            payload: 'Chat loading error!'
        });
    }
}

export const async_delete_chat = (payload: string | null) => (
{
    type: ChatActionTypes.ASYNC_DELETE_CHAT,
    payload
});