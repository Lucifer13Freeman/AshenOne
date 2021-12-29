import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Avatar, CardActionArea, 
        createStyles, 
        Divider, Grid, Hidden,
        Theme, useMediaQuery, useTheme } from '@mui/material';
import styles from '../../styles/Navbar.module.scss'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { NavMenu, NAV_MENU, ROLES, ROUTES, LINKS } from '../../utils/constants';
import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, 
        ListItemText, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link';
import ListDialog from '../../components/Shared/Dialogs/ListDialog';
import Invites from '../../components/Invites/Invites';


/*const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles(
    {
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }))*/


// interface NavbarProps 
// {
//   window?: () => Window;
// }



const menu_items: Array<NavMenu> = [

  { text: NAV_MENU.HOME, href: ROUTES.HOME, icon: <HomeIcon/> },
  { text: NAV_MENU.FEED, href: ROUTES.FEED, icon: <FeedIcon/> },
  { text: NAV_MENU.INVITES, href: ROUTES.INVITES, icon: <NotificationsRoundedIcon/> },
  { text: NAV_MENU.CHATS, href: ROUTES.CHATS, icon: <ChatBubbleIcon/> },
  { text: NAV_MENU.PEOPLE, href: ROUTES.PEOPLE, icon: <PeopleAltIcon/> },
  { text: NAV_MENU.GROUPS, href: ROUTES.GROUPS, icon: <GroupsIcon/> },
  { text: NAV_MENU.ADMIN, href: ROUTES.ADMIN, icon: <AdminPanelSettingsIcon/> },
  // { text: 'Track list', href: '/tracks', icon: <StarOutlineOutlinedIcon/> },
  // { text: 'Album list', href: '/albums', icon: <StarOutlineOutlinedIcon/> },
  { text: NAV_MENU.LOGIN, href: ROUTES.LOGIN, icon: <LoginRoundedIcon/> },
  { text: NAV_MENU.REGISTER, href: ROUTES.REGISTER, icon: <AccountBoxIcon/> },
  { text: NAV_MENU.LOGOUT, href: ROUTES.LOGOUT, icon: <LogoutRoundedIcon/> }
];


const Navbar: React.FC = () => 
{
  const router = useRouter();
  const theme = useTheme();

  const is_md = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const is_lg = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  //const is_xl = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const { auth, error: auth_error } = useTypedSelector(state => state.auth);
  const { async_logout } = useActions();

  const [open, set_open] = React.useState(false);
  const handle_drawer_toggle = () => set_open(!open);

  // const handle_drawer_toggle = (
  //   //event: React.KeyboardEvent | React.MouseEvent
  // ) => {
  //   /*if (
  //     event &&
  //     event.type === 'keydown' &&
  //     ((event as React.KeyboardEvent).key === 'Tab' ||
  //       (event as React.KeyboardEvent).key === 'Shift')
  //   ) return;*/

  //   set_open(!open);// set_open({ ...state, [anchor]: open });
  // };

  const check_auth = auth.is_auth && auth.user;
  const check_admin = check_auth && auth.user.role === ROLES.ADMIN;

  let menu: Array<NavMenu>

  if (check_auth) menu = menu_items.filter(
    (item: NavMenu) => item.text !== NAV_MENU.LOGIN && item.text !== NAV_MENU.REGISTER);
  else menu = menu_items.filter(
    (item: NavMenu) => item.text !== NAV_MENU.LOGOUT);

  if (!check_admin) menu = menu.filter((item: NavMenu) => item.text !== NAV_MENU.ADMIN);
  
  // const check_private_routes = (text: string) => text !== NAV_MENU.INVITES || text !== NAV_MENU.CHATS || text !== NAV_MENU.FEED

  const user_profile = (
    check_auth &&
      <>
        <ListItem 
          button 
          style={{ padding: '16px' }}
          onClick={() => router.push(ROUTES.PEOPLE + auth.user.id)}
        >
          <ListItemIcon>
            <Avatar 
              alt={auth.user.username} 
              src={LINKS.STATIC_FILES_LINK + auth.user.avatar}
              style={{ width: 30, height: 30 }}
            />
          </ListItemIcon>
          <ListItemText primary={auth.user.username}/><Divider/> 
        </ListItem>
        <Divider/>
      </>
  );


  const drawer_menu = (

    <div className={ is_lg && !open 
                  ? styles.short_drawer_menu 
                  : styles.drawer_menu }
    >
      { is_md || is_lg ? 
        <div>
          <IconButton 
            style={{ display: 'flex', marginLeft: 'auto', padding: '20px' }}
            onClick={handle_drawer_toggle}
          >
            {/* { theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/> } */}
            { open ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
          </IconButton>
          <Divider/>
        </div> 
        : 
        <div>
          { check_auth && user_profile }
        </div>
      }
      <nav>
        { is_lg && !is_md && check_auth && user_profile }
        <List style={{ paddingTop: 0 }}>
          { menu.map(({ text, href, icon }, index) => (
            <div key={index}>
              { text !== NAV_MENU.INVITES ?
              <ListItem button onClick={ () => 
                {
                  if (text === NAV_MENU.LOGOUT && check_auth)
                  {
                    async_logout();
                    window.location.href = href;
                  }
                      
                  router.push(href);
                  set_open(false);
                }}> 
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem> : 
              // <Grid onClick={() => set_open(false)}>
              check_auth && <Invites />
              // </Grid> 
              }
              {/* // <ListDialog 
              //     button_title='Edit' 
              //     dialog_title='Edit post'
              //     button_variant='text'
              //     is_default_input={false}
              //     form_content={{
              //         value: post_text,
              //         set_value: set_post_text,
              //         is_loading: update_post_loading,
              //         is_with_button: false,
              //         placeholder: 'Edit post...'
              //     }}
              // >
              //   <ListItem button onClick={ () => 
              //   { set_open(false);
              //   }}> 
              //     {/* <Button onClick={update_post}>Save changes</Button> 
               </ListDialog> } */}

              {/* <ListItem button onClick={ () => 
                {
                  // if (text === NAV_MENU.LOGOUT && check_auth)
                  // {
                  //   async_logout();
                  //   window.location.href = href;
                  // }
                      
                  // router.push(href);
                  set_open(false);
                }}> 
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem> } */}
              {text === NAV_MENU.GROUPS && <Divider/>}
              {text === NAV_MENU.ADMIN && <Divider/>}
            </div>
          )) }
        </List>
      </nav>
    </div>
  );
  
  //console.log(auth)

  //const logout = () => async_logout()
  
  // const is_xs = useMediaQuery(theme.breakpoints.down("xs"));
  // const is_sm = useMediaQuery(theme.breakpoints.down("sm"));
  // const is_md = useMediaQuery(theme.breakpoints.down("md"));
  // const is_lg = useMediaQuery(theme.breakpoints.down("lg"));
  // const is_xl = useMediaQuery(theme.breakpoints.down("xl"));

  // type NavVariant = 'permanent' | 'persistent' | 'temporary' | undefined;

  // let nav_variant: NavVariant = is_xs ? 'temporary' :
  //                             is_sm ? 'persistent' :
  //                             is_md || is_lg || is_xl ? 'permanent' 
  //                             : undefined;

  //if (is_md || is_lg || is_xl) //handle_drawer_open();
  //const classes = useStyles();     

  // useEffect(() => 
  // {
  //   if (is_md || is_lg || is_xl) set_open(true);
  //   else set_open(false);
  // }, [is_md, is_lg, is_xl]);

  //const container = window !== undefined ? () => window().document.body : undefined;


  return (

    <header>
      <CssBaseline/>
      <AppBar 
        position="fixed"
        className={  open ? styles.app_bar_shift : styles.app_bar }
      >
        <Toolbar>
          { is_md && !open &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handle_drawer_toggle}
              edge="start"
            >
              <MenuIcon/>
            </IconButton> }
          <Link href="/">
            <a>
              <Typography 
                className={styles.logo}
                variant="h4" 
                noWrap
              >
                Ashen One
              </Typography>
            </a>
          </Link>
          { is_md && check_auth &&
          <div style={{ marginLeft: 'auto' }}>
            <IconButton onClick={() => router.push(ROUTES.PEOPLE + auth.user.id)}>
              <Avatar alt={auth.user.username} src={LINKS.STATIC_FILES_LINK + auth.user.avatar}/>
            </IconButton>
          </div> }
        </Toolbar>
      </AppBar>
      { is_md || is_lg ?
        <SwipeableDrawer
          variant={ is_md || is_lg && open ? "temporary" : "permanent" }
          //anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={handle_drawer_toggle}
          onOpen={handle_drawer_toggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer_menu}
        </SwipeableDrawer> 
        :
        <Drawer
          variant="permanent"
          open
        >
          {drawer_menu}
        </Drawer> }
    </header>
  );
}

export default Navbar;