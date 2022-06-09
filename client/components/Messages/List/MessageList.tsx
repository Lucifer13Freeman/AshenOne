import { Box, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { IMessage } from "../../../store/types/message";
import MessageItem from "../Item/MessageItem";


interface MessageListProps 
{
    messages: IMessage[] | null;
}

const MessageList: React.FC<MessageListProps > = ({ messages }) =>
{
    const lastMessageRef = useRef(null);

    const scroll_down = () => (lastMessageRef?.current as any).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

    useEffect(() => 
    {
        scroll_down();
    }, [messages?.length]);
    

    return (
        <Grid container direction="column">
            <Box p={2}>
                {messages && messages.map((message: IMessage, index: number) => 
                    // <>
                    // {index === messages.length - 4 || index === messages.length - 1 && 
                    // }
                    <MessageItem 
                        key={message.id + index}
                        message={message}
                    />
                    // </>
                )}
                <div ref={lastMessageRef}></div>
            </Box>
        </Grid>
    );
}


export default MessageList;