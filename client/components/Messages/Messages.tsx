import { useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { NEW_MESSAGE } from "../../graphql/subscriptions/messages";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from '../../styles/Messages.module.scss';
import { IMessage } from "../../store/types/message";
import MessageList from './List/MessageList';


interface MessagesProps
{
    messages: IMessage[];
    //chat_id?: string | string[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) =>
{
    //const { chat, error: chat_error } = useTypedSelector(state => state.chat);
    // const { messages, error: messages_error } = useTypedSelector(state => state.message);

    // const { async_set_all_messages, async_set_chat, 
    //         async_create_message, async_set_message,
    //         async_delete_message, async_set_reaction,
    //         async_logout, async_leave_chat } = useActions();

    // const { data: message_data, error: message_error } = useSubscription(NEW_MESSAGE);

    // // useEffect(() => 
    // // {
    // //     if (message_error) console.log(message_error);
    // //     if (message_data) async_create_message(message_data.new_message);
    // // }, [message_data, message_error]);

    // useEffect(() => 
    // {
    //     if (message_error) console.log(message_error);
    //     if (message_data) 
    //     { 
    //         //async_create_message(message_data.new_message);//
    //         if (message_data.is_create) async_create_message(message_data.new_message); //async_set_all_messages([...messages, message_data.new_message]);
    //         else if (message_data.is_update) async_set_message(message_data.new_message);
    //         // else if (message_data.is_delete)
    //         //     async_delete_message(message_data.new_message);
    //         // async_create_message(message_data.new_message);
    //         //get_current_chat();
    //         //update_chats();
    //     }
    // }, [message_data, message_error]);
    
    return (
        <Grid className={styles.messages_container}>
            { messages?.length > 0 
                ? <MessageList messages={messages}/>
                : <div className={styles.no_messages}>Send your first message...</div>
            }
        </Grid>
    );
}

export default Messages;