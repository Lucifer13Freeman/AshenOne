import { ChatActionTypes, IChat } from '../../types/chat';


export const get_all_chats = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.GET_ALL_CHATS,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.GET_ALL_CHATS_ERROR, 
            payload: 'Chats loading error!'
        });
    }
}

export const async_get_all_chats = (payload: IChat[]) => (
{
    type: ChatActionTypes.ASYNC_GET_ALL_CHATS,
    payload
});

export const get_chat = ({ payload }: any) =>
{
    try
    { 
        return (
        {
            type: ChatActionTypes.GET_CHAT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ChatActionTypes.GET_CHAT_ERROR, 
            payload: 'Chat loading error!'
        });
    }
}

export const async_get_chat = (payload: IChat | null) => (
{
    type: ChatActionTypes.ASYNC_GET_CHAT,
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
