import { useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { NEW_MESSAGE } from "../../graphql/subscriptions/messages";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from '../../styles/Messages.module.scss';
import { IMessage } from "../../types/message";
import MessageList from './List/MessageList';


interface MessagesProps
{
    messages: IMessage[];
    //chat_id?: string | string[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) =>
{
    //const { chat, error: chat_error } = useTypedSelector(state => state.chat);
    //const { messages, error: messages_error } = useTypedSelector(state => state.message);
    
    return (
        <Grid className={styles.messages_container}>
            { messages.length > 0 
                ? <MessageList messages={messages}/>
                : <div className={styles.no_messages}>Send your first message...</div>
            }
        </Grid>
    );
}


export default Messages;