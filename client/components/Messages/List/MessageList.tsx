import { Box, Grid } from "@mui/material";
import React from "react";
import { IMessage } from "../../../types/message";
import MessageItem from "../Item/MessageItem";


interface MessageListProps 
{
    messages: IMessage[] | null;
}

const MessageList: React.FC<MessageListProps > = ({ messages }) =>
{
    return (
        <Grid container direction="column">
            <Box p={2}>
                {messages && messages.map(message => 
                    <MessageItem 
                        key={message.id}
                        message={message}
                    />
                )}
            </Box>
        </Grid>
    );
}


export default MessageList;