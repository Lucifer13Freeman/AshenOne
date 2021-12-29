import { IMessage, IMessageState, MessageAction, MessageActionTypes } from "../../types/message"
import { IReaction, ReactionAction, ReactionActionTypes } from "../../types/reaction"


const initial_state: IMessageState = {

    message: null,
    messages: [],
    error: undefined
}


export const message_reducer = (state = initial_state, action: MessageAction | ReactionAction): IMessageState =>
{
    switch (action.type) 
    {
        case MessageActionTypes.CREATE_MESSAGE:
        {
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
        case MessageActionTypes.SET_MESSAGE:
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
        case MessageActionTypes.SET_MESSAGE_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case MessageActionTypes.SET_ALL_MESSAGES:
        {
            return {
                ...state, 
                messages: action.payload,
                error: undefined
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
        case ReactionActionTypes.SET_REACTION:
        {
            const reaction = action.payload;
            let update_message: IMessage | null = state.message;
            let update_messages = [...state.messages];

            const message_index: number = update_messages.findIndex((m: IMessage) => m.id === reaction.message_id);
            update_message = update_messages[message_index];

            if (message_index > -1)
            {
                update_message = {...update_messages[message_index]}
                let update_reactions = [...update_message.reactions];

                const reaction_index: number = update_reactions.findIndex((r: IReaction) => r.id === reaction.id);
                
                if (reaction_index > -1) update_reactions[reaction_index] = reaction;
                else update_reactions = [...update_reactions, reaction];

                update_message = { 
                    ...update_message, 
                    reactions: update_reactions 
                }

                update_messages[message_index] = update_message;
            }
            
            return {
                ...state, 
                message: update_message,
                messages: update_messages,
                error: undefined
            }
        }
        case ReactionActionTypes.SET_REACTION_ERROR:
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