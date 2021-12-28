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
import { FormControl, Grid, IconButton, Input, InputLabel } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';


enum BUTTON_TYPE
{
  SETTINGS = "setting",
  EDIT = "edit",
  DEFAULT = "default"
}

interface IFormContent
{
  text?: string;
  set_text: Function;
  image?: string;
  audio?: string;
  video?: string;
  is_loading?: boolean;
  is_with_button?: boolean;
  placeholder?: string;
}

interface FormDialogProps
{
  button_title?: string;
  button_variant?: "text" | "contained" | "outlined" | undefined;
  dialog_title?: string;
  dialog_description?: string;
  // dialog_form?: Function;
  form_content: IFormContent;
  button_type?: "setting" | "edit" | "default" | undefined;
  is_default_input?: boolean;
}

const FormDialog: React.FC<FormDialogProps> = ({ children, button_title, button_variant,
                                                dialog_title, dialog_description, is_default_input = true,
                                                /*dialog_form,*/ form_content, button_type }) =>
{
  const [open, set_open] = React.useState(false);
  const handle_click_open = () => set_open(true);
  const handle_close = () => set_open(false);
  // const [text, set_text] = useState(form_content.text);


  return (
    <div>
      <Grid container direction="column">
        { button_type === BUTTON_TYPE.EDIT ? 
        <IconButton onClick={handle_click_open}>
          <EditIcon/>
        </IconButton> :
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
              { !is_default_input ?
                <SendInput 
                  // placeholder="What's up?"
                  loading_placeholder={() => "Editing..."}
                  is_loading={form_content.is_loading} 
                  value={form_content.text} 
                  set_value={form_content.set_text} 
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
                    value={form_content.text}
                    fullWidth
                    onChange={ e => form_content.set_text(e.target.value) }
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
          <DialogActions onClick={handle_close}>
            {children}
          </DialogActions>
      </Dialog>
    </div>
  );
}


export default FormDialog;