import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendInput from '../Inputs/SendInput';
import { useState } from 'react';
import FormDialogTitle from './FormDialogTitle';
import { Badge, FormControl, Grid, IconButton, 
        Input, InputLabel, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { IInvite } from '../../../types/invite';
import { IUser } from '../../../types/user';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SlideTransitionRight from '../Transitions/SlideTransitionRight';
import SlideTransitionUp from '../Transitions/SlideTransitionUp';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { useTypedSelector } from '../../../hooks/useTypedSelector';


enum BUTTON_TYPE
{
  SETTINGS = "setting",
  EDIT = "edit",
  INVITE = "invite",
  INVITE_USER = "invite_user",
  DEFAULT = "default"
}

interface IListContent
{
  value?: string;
  set_value: Function;
  is_loading?: boolean;
  is_with_button?: boolean;
  placeholder?: string;
  users?: IUser[];
  received_invites?: IInvite[];
}

interface ListDialogProps
{
  button_title?: string;
  button_variant?: "text" | "contained" | "outlined" | undefined;
  dialog_title?: string;
  dialog_description?: string;
  // dialog_form?: Function;
  list_content?: IListContent;
  button_type?: "invite" | "invite_user" | "setting" | "edit" | "default" | undefined;
  is_default_input?: boolean;
  transition?: "up" | "right";
}

const ListDialog: React.FC<ListDialogProps> = ({ children, button_title, button_variant,
                                                dialog_title, dialog_description, //is_default_input = true,
                                                transition, list_content, button_type }) =>
{
  const [open, set_open] = React.useState(false);
  const handle_click_open = () => set_open(true);
  const handle_close = () => set_open(false);
  // const [text, set_text] = useState(form_content.text);

  const { auth, error: auth_error } = useTypedSelector(state => state.auth);
  const { invites, error: invites_error } = useTypedSelector(state => state.invite);

  return (
    <div>
      <Grid container direction="column">
        { button_type === BUTTON_TYPE.INVITE ? 
        <ListItem button onClick={handle_click_open}>
            <ListItemIcon>
              <Badge color="primary" badgeContent={invites?.filter((inv: IInvite) => (inv.user.id === auth.user.id)).length}>
                <NotificationsRoundedIcon/>
              </Badge>
            </ListItemIcon>
            <ListItemText primary={button_title || 'Invites'}/>
        </ListItem> :
        button_type === BUTTON_TYPE.INVITE_USER ? 
        <Button variant={button_variant || 'text'}  
                onClick={handle_click_open} 
                startIcon={<PersonAddAlt1RoundedIcon/>}>
            {button_title || 'Invites'}
        </Button> :
        button_type === BUTTON_TYPE.EDIT ? 
        <IconButton onClick={handle_click_open}>
          <EditIcon/>
        </IconButton> :
        button_type === BUTTON_TYPE.SETTINGS ?
        <IconButton onClick={handle_click_open}>
          <SettingsIcon/>
        </IconButton> : 
        <Button variant={button_variant || 'text'} 
          onClick={handle_click_open}>
          {button_title || 'Invites'}
        </Button> 
      }
      </Grid>
        <Dialog open={open} onClose={handle_close} 
            TransitionComponent={ transition === "right" 
                            ? SlideTransitionRight
                            : SlideTransitionUp } >
        {/* <DialogTitle>{dialog_title || 'Edit'}</DialogTitle> */}
          <FormDialogTitle id="dialog_title" onClose={handle_close}>
            {dialog_title || 'Invites'}
          </FormDialogTitle>
            <DialogContent style={{padding: 10, width: 340}}>
              <DialogContentText>
                {dialog_description || ''}
              </DialogContentText>
              {children}
            </DialogContent>
          {/* <DialogActions onClick={handle_close}>
          </DialogActions> */}
      </Dialog>
    </div>
  );
}


export default ListDialog;