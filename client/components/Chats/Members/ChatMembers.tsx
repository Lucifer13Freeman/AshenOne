import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IUser } from "../../../types/user";
import { ROUTES, LINKS } from "../../../utils/constants";
import { Button, 
        Avatar, 
        MenuList, 
        Grow, 
        Popper, 
        ClickAwayListener, 
        ListItem, 
        ListItemIcon, 
        ListItemText, 
        Paper, 
        Grid} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import ItemsSelect from "../../Shared/Selects/ItemsSelect";
import { IChat } from "../../../types/chat";
import ConfirmDialog from "../../Shared/Dialogs/ConfirmDialog";
import { useMutation } from "@apollo/client";
import { TOKEN } from "../../../utils/token";
import { REMOVE_CHAT_MEMBER } from "../../../graphql/mutations/chats";
import { useActions } from "../../../hooks/useAction";


interface ChatMembersProps
{
    // members?: IUser[];
    chat?: IChat;
}

const ChatMembers: React.FC<ChatMembersProps> = ({ /*chat*/ }) =>
{
    const router = useRouter();

    const { chat, error: chat_error } = useTypedSelector(state => state.chat);
    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    const { async_set_chat, async_logout, async_leave_chat } = useActions();

    const [gql_remove_chat_member, { loading: remove_chat_member_loading }] = useMutation(REMOVE_CHAT_MEMBER, 
    {
        onCompleted: (data) => 
        {
            // const is_leave = data.remove_chat_member.members.find((mem: IUser) => mem.id === auth.user.id);
            // if (is_leave === undefined) 
            // {
            //     async_leave_chat(data.remove_chat_member);
            //     router.push(ROUTES.CHATS)
            // } else
           async_set_chat(data.remove_chat_member);
        },
        onError: (err) => 
        {
            console.log(err);
                    
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                router.push(ROUTES.LOGIN);
                async_logout();
            }
        }
    });
        
    const remove_chat_member = (id: string) =>
    {
        // e.stopPropagation();
        const input = { input: { 
            chat_id: chat.id,
            user_id: id
        }}
        gql_remove_chat_member({ variables: input });

        if (id === auth.user?.id)
        {
            router.push(ROUTES.CHATS);
            async_leave_chat(chat);
        }
    }
    

    return (
      <ItemsSelect>
        {chat?.members &&
          chat?.members.map(({ id, username, avatar }: any) => (
            <ListItem button key={id}>
              <ListItemIcon onClick={() => router.push(ROUTES.PEOPLE + id)}>
                <Avatar
                  alt={username}
                  src={LINKS.STATIC_FILES_LINK + avatar}
                  style={{ width: 30, height: 30 }}
                  onClick={() => router.push(ROUTES.PEOPLE + id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={username}
                onClick={() => router.push(ROUTES.PEOPLE + id)}
              />
              {
                id !== auth.user?.id && auth.user?.id === chat?.admin_id && (
                  <Grid style={{ marginLeft: 10 }}>
                    <ConfirmDialog
                      button_title="Remove"
                      dialog_title="Remove member"
                      button_variant="contained"
                      button_type="remove"
                    >
                      <Button onClick={() => remove_chat_member(id)}>
                        Remove
                      </Button>
                      <Button>Cancel</Button>
                    </ConfirmDialog>
                  </Grid>
                )
                // <IconButton style={{ marginLeft: 10 }}>
                //     <HighlightOffRoundedIcon/>
                // </IconButton>
              }
              {id == auth.user?.id && (
                <Grid style={{ marginLeft: 10 }}>
                  <ConfirmDialog
                    button_title="Leave"
                    dialog_title="Leave chat"
                    button_variant="contained"
                    button_type="leave"
                  >
                    <Button onClick={() => remove_chat_member(id)}>
                      Leave
                    </Button>
                    <Button>Cancel</Button>
                  </ConfirmDialog>
                </Grid>
              )}
            </ListItem>
          ))}
      </ItemsSelect>
    );
}

export default ChatMembers;