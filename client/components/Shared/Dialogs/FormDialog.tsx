import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendInput from '../Inputs/SendInput';
import { useEffect, useState } from 'react';
import FormDialogTitle from './FormDialogTitle';
import { FormControl, FormGroup, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


enum BUTTON_TYPE
{
  SETTINGS = "settings",
  NAV_SETTINGS = "nav_settings",
  EDIT = "edit",
  DEFAULT = "default"
}

interface IErrors
{
  text?: string;
  username?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
  confirm_new_password?: string;
  image?: string;
  audio?: string;
  video?: string;
}

interface IValues
{
  text?: string;
  username?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
  confirm_new_password?: string;
  image?: string;
  audio?: string;
  video?: string;
}

interface IPasswordVisibility
{
  old_password?: boolean;
  new_password?: boolean;
  confirm_new_password?: boolean;
}

const password_visibility_initial_state: IPasswordVisibility =
{
  old_password: false,
  new_password: false,
  confirm_new_password: false
}

interface IFormContent
{
  values?: IValues;
  set_values: Function;
  errors?: IValues;
  set_errors?: Function;
  // text?: string;
  // set_text: Function;
  // image?: string;
  // audio?: string;
  // video?: string;
  is_loading?: boolean;
  is_with_button?: boolean;
  placeholder?: string;
}

interface FormDialogProps
{
  button_title?: string;
  button_variant?: "text" | "contained" | "outlined";
  dialog_title?: string;
  dialog_description?: string;
  // dialog_form?: Function;
  form_content: IFormContent;
  button_type?: "settings" | "nav_settings" | "edit" | "default";
  is_default_input?: boolean;
  is_user_settings?: boolean;
  // is_open?: boolean;
}

const FormDialog: React.FC<FormDialogProps> = ({ children, button_title, button_variant,
                                                dialog_title, dialog_description, 
                                                is_default_input = true, is_user_settings = false,
                                                /*dialog_form,*/ form_content, button_type }) =>
{
  const [open, set_open] = React.useState(false);
  const handle_click_open = () => set_open(true);
  const handle_close = () => set_open(false);

  const [show_password, set_show_password] = useState(password_visibility_initial_state);

  // let is_with_errors;

  // useEffect(() => {
  //   is_with_errors = form_content.errors?.text !== undefined || 
  //                   form_content.errors?.username !== undefined || 
  //                   form_content.errors?.email !== undefined || 
  //                   form_content.errors?.old_password !== undefined ||
  //                   form_content.errors?.new_password !== undefined || 
  //                   form_content.errors?.confirm_new_password !== undefined ||
  //                   form_content.errors?.image !== undefined || 
  //                   form_content.errors?.audio !== undefined || 
  //                   form_content.errors?.video !== undefined;
  // }, [form_content.errors]);

  return (
    <div>
      <Grid container direction="column">
        { button_type === BUTTON_TYPE.EDIT ? 
        <IconButton onClick={handle_click_open}>
          <EditIcon/>
        </IconButton> :
        button_type === BUTTON_TYPE.NAV_SETTINGS ?
        <ListItem button onClick={handle_click_open}>
          <ListItemIcon>
              <SettingsIcon/>
          </ListItemIcon>
          <ListItemText primary={button_title || 'Settings'}/>
        </ListItem> :
        button_type === BUTTON_TYPE.SETTINGS ?
        <IconButton onClick={handle_click_open}>
          <SettingsIcon/>
        </IconButton> : 
        <Button variant={button_variant || 'text'} 
          onClick={handle_click_open}>
          {button_title || 'Edit'}
        </Button> 
      }
      </Grid>
        <Dialog open={open} onClose={handle_close}>
        {/* <DialogTitle>{dialog_title || 'Edit'}</DialogTitle> */}
          <FormDialogTitle id="dialog_title" onClose={handle_close}>
            {dialog_title || 'Edit'}
          </FormDialogTitle>
            <DialogContent style={{padding: 10, width: 340}}>
              <DialogContentText>
                {dialog_description || ''}
              </DialogContentText>
              { is_user_settings ?
                <FormGroup>
                  <FormControl style={{marginTop: 20}}>
                      <InputLabel htmlFor="username_input">
                        { form_content.errors?.username ?? 'Username' }
                      </InputLabel>
                      <Input 
                          id="username_input"
                          value={form_content.values?.username}
                          onChange={ e => form_content.set_values({ ...form_content.values, username: e.target.value }) }
                      />
                  </FormControl>
                  <FormControl style={{marginTop: 20}}>
                      <InputLabel htmlFor="email_input">
                          { form_content.errors?.email ?? 'Email address' }
                      </InputLabel>
                      <Input 
                          id="email_input"
                          type="email"
                          value={form_content.values?.email}
                          onChange={ e => form_content.set_values({ ...form_content.values, email: e.target.value }) }
                      />
                  </FormControl>
                  <FormControl style={{marginTop: 20}}>
                      <InputLabel htmlFor="old_password_input">
                          { form_content.errors?.old_password ?? 'Old password' }
                      </InputLabel>
                      <Input
                          id="old_password_input"
                          type={show_password.old_password ? 'text' : 'password'}
                          value={form_content.values?.old_password}
                          onChange={ e => form_content.set_values({ ...form_content.values, old_password: e.target.value }) }
                          endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={ () => set_show_password({ ...show_password, old_password: !show_password.old_password }) }
                                    onMouseDown={ (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault() }
                                >
                                    { show_password.old_password ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                            </InputAdornment>}
                      />
                  </FormControl>
                  <FormControl style={{marginTop: 20}}>
                      <InputLabel htmlFor="new_password_input">
                          { form_content.errors?.new_password ?? 'New password' }
                      </InputLabel>
                      <Input
                          id="new_password_input"
                          type={show_password.new_password ? 'text' : 'password'}
                          value={form_content.values?.new_password}
                          onChange={ e => form_content.set_values({ ...form_content.values, new_password: e.target.value }) }
                          endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={ () => set_show_password({ ...show_password, new_password: !show_password.new_password }) }
                                    onMouseDown={ (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault() }
                                >
                                    { show_password.new_password ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                            </InputAdornment>}
                      />
                  </FormControl>
                  <FormControl style={{marginTop: 20}}>
                      <InputLabel htmlFor="confirm_new_password_input">
                          { form_content.errors?.confirm_new_password ?? 'Confirm new password' }
                      </InputLabel>
                      <Input
                          id="confirm_new_password_input"
                          type={show_password.confirm_new_password ? 'text' : 'password'}
                          value={form_content.values?.confirm_new_password}
                          onChange={ e => form_content.set_values({ ...form_content.values, confirm_new_password: e.target.value }) }
                          endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={ () => set_show_password({ ...show_password, confirm_new_password: !show_password.confirm_new_password }) }
                                    onMouseDown={ (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault() }
                                >
                                    { show_password.confirm_new_password ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                            </InputAdornment>}
                      />
                  </FormControl>
                </FormGroup> :
                !is_default_input ?
                <SendInput 
                  // placeholder="What's up?"
                  loading_placeholder={() => "Editing..."}
                  is_loading={form_content.is_loading} 
                  value={form_content.values?.text} 
                  set_value={form_content.set_values} 
                  is_with_button={form_content.is_with_button} 
                  placeholder={form_content.placeholder}
                /> :
                // <Grid container direction="column" justifyContent="center">
                <FormControl style={{width: 300}}>
                  <InputLabel htmlFor="edit_input">
                      {form_content.placeholder}
                  </InputLabel>
                  <Input 
                    id="edit_input"
                    value={form_content.values?.text}
                    fullWidth
                    onChange={ e => form_content.set_values({ ...form_content.values, text: e.target.value }) /*form_content.set_text(e.target.value)*/ }
                  />
                </FormControl>
                // </Grid>
                // <TextField
                //   variant="outlined"
                //   fullWidth
                //   //style={{ outline: 'none' }}
                //   label={form_content.placeholder ? form_content.placeholder : 'Enter message...'}
                //   value={form_content.text}
                //   onChange={(e) => form_content.set_text(e.target.value)}
                //   //onChange={handle_change}
                // /> 
                }
            </DialogContent>
          <DialogActions onClick={!is_user_settings ? handle_close : () => null}>
            {children}
          </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;