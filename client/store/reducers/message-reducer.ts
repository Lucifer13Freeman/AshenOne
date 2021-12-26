import { IMessage, IMessageState, MessageAction, MessageActionTypes } from "../../types/message"


const initial_state: IMessageState = {

    message: null,
    messages: [],
    error: undefined//''
}


export const message_reducer = (state = initial_state, action: MessageAction): IMessageState =>
{
    switch (action.type) 
    {
        case MessageActionTypes.CREATE_MESSAGE:
        {
            //const messages_copy = [...state.messages];

            return {
                ...state, 
                message: action.payload,
                messages: [action.payload, ...state.messages],
                error: undefined
            }
        }
        case MessageActionTypes.CREATE_MESSAGE_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case MessageActionTypes.GET_MESSAGE:
        {
            const update_messages = state.messages.map((message: IMessage) => 
            { 
                if (message.id === action.payload.id) message = action.payload
                return message 
            });
            
            return {
                ...state, 
                message: action.payload,
                messages: update_messages,
                error: undefined
            }
        }
        case MessageActionTypes.GET_MESSAGE_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case MessageActionTypes.GET_ALL_MESSAGES:
        {
            return {
                ...state, 
                messages: action.payload,
                error: undefined
            }
        }
        case MessageActionTypes.GET_ALL_MESSAGES_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        case MessageActionTypes.UPDATE_MESSAGE:
        {
            const update_messages = state.messages.map((message: IMessage) => 
            { 
                if (message.id === action.payload.id) message = action.payload
                return message 
            });

            return {
                ...state, 
                message: action.payload,
                messages: update_messages,
                error: undefined
            }
        }
        case MessageActionTypes.UPDATE_MESSAGE_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case MessageActionTypes.DELETE_MESSAGE:
        {
            const update_messages = state.messages.filter((message: IMessage) => message.id !== action.payload);

            return {
                ...state, 
                message: null,
                messages: update_messages,
                error: undefined
            }
        }
        case MessageActionTypes.DELETE_MESSAGE_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
}