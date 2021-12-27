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
        Paper } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useTypedSelector } from "../../../hooks/useTypedSelector";


interface GroupMembersProps
{
    //members?: IUser[];
    group_id?: string | string[];
}

const GroupMembers: React.FC<GroupMembersProps> = ({ /*members,*/ group_id }) =>
{
    const router = useRouter();

    const { group, error: group_error } = useTypedSelector(state => state.group);
    
    const [open_members, set_open_members] = useState(false);
    const anchor_ref = useRef<HTMLButtonElement>(null);
    const prev_open = useRef(open_members);

    const handle_toggle = () => set_open_members((prev_open) => !prev_open);

    const handle_close = (e: React.MouseEvent<EventTarget>) => 
    {
        if (anchor_ref.current && anchor_ref.current.contains(e.target as HTMLElement)) return;

        set_open_members(false);
    };

    const handle_list_key_down = (e: React.KeyboardEvent) => 
    {
        if (e.key === 'Tab') 
        {
            e.preventDefault();
            set_open_members(false);
        }
    }

    useEffect(() => 
    {
        if (prev_open.current === true && open_members === false) anchor_ref.current!.focus();

        prev_open.current = open_members;
    }, [open_members]);


    return (

        <>
            <Button
                ref={anchor_ref}
                aria-controls={open_members ? "members" : undefined}
                aria-haspopup="true"
                onClick={handle_toggle}
                style={{ textTransform: "none", marginTop: 6 }}
            >
                <ListItemIcon>
                    <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
                {open_members ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Popper
                open={open_members}
                anchorEl={anchor_ref.current}
                role={undefined}
                transition
                disablePortal
                style={{ zIndex: 999, opacity: 0.9 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => handle_close}>
                                <MenuList
                                    autoFocusItem={open_members}
                                    id="members"
                                    onKeyDown={handle_list_key_down}
                                >
                                    {group.members.map(({ id, username, avatar }: any) => (
                                        <ListItem
                                            button
                                            key={id}
                                            onClick={() => router.push(ROUTES.PEOPLE + id)}
                                        >
                                            <ListItemIcon>
                                                <Avatar
                                                    alt={username}
                                                    src={LINKS.STATIC_FILES_LINK + avatar}
                                                    style={{ width: 30, height: 30 }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={username}/>
                                        </ListItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}


export default GroupMembers;