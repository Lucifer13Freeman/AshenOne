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
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { useTypedSelector } from "../../../hooks/useTypedSelector";


enum ICON_TYPE
{
    PEOPLE = 'people',
    PRIVATE = 'private'
}

interface ItemsSelectProps
{
    icon?: 'people' | 'private'
    title?: string;
    users?: IUser[];
}

const ItemsSelect: React.FC<ItemsSelectProps> = ({ users, title, icon, children }) =>
{
    const router = useRouter();

    const [open_items, set_open_items] = useState(false);
    const anchor_ref = useRef<HTMLButtonElement>(null);
    const prev_open = useRef(open_items);

    const handle_toggle = () => set_open_items((prev_open) => !prev_open);

    const handle_close = (e: React.MouseEvent<EventTarget>) => 
    {
        if (anchor_ref.current && anchor_ref.current.contains(e.target as HTMLElement)) return;
        set_open_items(false);
    };

    const handle_list_key_down = (e: React.KeyboardEvent) => 
    {
        if (e.key === 'Tab') 
        {
            e.preventDefault();
            set_open_items(false);
        }
    }

    useEffect(() => 
    {
        if (prev_open.current === true && open_items === false) anchor_ref.current!.focus();
        prev_open.current = open_items;
    }, [open_items]);


    return (

        <>
            <Button
                ref={anchor_ref}
                aria-controls={open_items ? "items" : undefined}
                aria-haspopup="true"
                onClick={handle_toggle}
                style={{ textTransform: "none", marginTop: 6 }}
            >
                <ListItemIcon>
                    { icon === ICON_TYPE.PRIVATE ?
                        <ShieldRoundedIcon /> :
                        <PeopleAltIcon /> }
                </ListItemIcon>
                <ListItemText primary={title ? title : "Members"} />
                {open_items ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Popper
                open={open_items}
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
                                    autoFocusItem={open_items}
                                    id="items"
                                    onKeyDown={handle_list_key_down}
                                >
                                    { users ? users.map(({ id, username, avatar }: any) => (
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
                                    )) : (children)}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default ItemsSelect;