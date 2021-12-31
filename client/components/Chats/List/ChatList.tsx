import { Box, Grid } from "@mui/material";
import React from "react";
import { IChat } from "../../../types/chat";
import ChatItem from "../Item/ChatItem";


interface ChatListProps 
{
    chats: IChat[] | null;
}

const ChatList: React.FC<ChatListProps > = ({ chats }) =>
{
    return (
        <Grid container direction="column">
            <Box p={2}>
                {chats && chats.map(chat => 
                    <ChatItem 
                        key={chat.id}
                        chat={chat}
                    />
                )}
            </Box>
        </Grid>
    );
}


export default ChatList;