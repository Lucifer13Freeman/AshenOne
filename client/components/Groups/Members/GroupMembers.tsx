import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IUser } from "../../../store/types/user";
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
import { IGroup } from "../../../store/types/group";
import { useMutation } from "@apollo/client";
import { REMOVE_GROUP_MEMBER } from "../../../graphql/mutations/groups";
import { TOKEN } from "../../../utils/token";
import ConfirmDialog from "../../Shared/Dialogs/ConfirmDialog";
import ItemsSelect from "../../Shared/Selects/ItemsSelect";
import { useActions } from "../../../hooks/useAction";


interface GroupMembersProps
{
    //members?: IUser[];
    group: IGroup;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ /*members,*/ group }) =>
{
    const router = useRouter();

    // const { group, error: group_error } = useTypedSelector(state => state.group);

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    const { async_set_group, async_logout, async_leave_group } = useActions();
    
    const [gql_remove_group_member, { loading: remove_group_member_loading }] = useMutation(REMOVE_GROUP_MEMBER, 
    {
        onCompleted: (data) => async_set_group(data.remove_group_member),
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
            
    const remove_group_member = (id: string) =>
    {
        // e.stopPropagation();
        const input = { input: { 
            group_id: group?.id,
            user_id: id
        }}
        gql_remove_group_member({ variables: input });
    
        if (id === auth.user.id && group)
        {
            async_leave_group(group);
            router.push(ROUTES.GROUPS);
        }
    }

    let is_member = group?.members.find((mem: IUser) => mem.id === auth.user?.id) !== undefined;

    useEffect(() => 
    {
        is_member = group?.members.find((mem: IUser) => mem.id === auth.user?.id) !== undefined;
    }, [group]);
    

    return (
      is_member ? 
      (<ItemsSelect>
        {group && group.members &&
          group.members.map(({ id, username, avatar }: any) => (
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
                id !== auth.user?.id && auth.user?.id === group.admin_id && (
                  <Grid style={{ marginLeft: 10 }}>
                    <ConfirmDialog
                      button_title="Remove"
                      dialog_title="Remove member"
                      button_variant="contained"
                      button_type="remove"
                    >
                      <Button onClick={() => remove_group_member(id)}>
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
                    dialog_title="Leave group"
                    button_variant="contained"
                    button_type="leave"
                  >
                    <Button onClick={() => remove_group_member(id)}>
                      Leave
                    </Button>
                    <Button>Cancel</Button>
                  </ConfirmDialog>
                </Grid>
              )}
            </ListItem>
          ))}
      </ItemsSelect>) : null
    );
}

export default GroupMembers;