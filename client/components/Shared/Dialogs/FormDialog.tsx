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
import { Grid } from '@mui/material';


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
}

const FormDialog: React.FC<FormDialogProps> = ({ children, button_title, button_variant,
                                                dialog_title, dialog_description, 
                                                /*dialog_form,*/ form_content }) =>
{
  const [open, set_open] = React.useState(false);
  const handle_click_open = () => set_open(true);
  const handle_close = () => set_open(false);
  // const [text, set_text] = useState(form_content.text);


  return (
    <div>
      <Grid container direction="column">
        <Button variant={button_variant || 'text'} 
          onClick={handle_click_open}>
          {button_title || 'Edit'}
        </Button>
      </Grid>
        <Dialog open={open} onClose={handle_close}>
        {/* <DialogTitle>{dialog_title || 'Edit'}</DialogTitle> */}
          <FormDialogTitle id="dialog_title" onClose={handle_close}>
            {dialog_title || 'Edit'}
          </FormDialogTitle>
            <DialogContent style={{padding: 10, width: 400}}>
              <DialogContentText>
                {dialog_description || ''}
              </DialogContentText>
              <SendInput 
                // placeholder="What's up?"
                loading_placeholder={() => "Editing..."}
                is_loading={form_content.is_loading} 
                value={form_content.text} 
                set_value={form_content.set_text} 
                is_with_button={form_content.is_with_button} 
                placeholder={form_content.placeholder}
              />
            </DialogContent>
          <DialogActions onClick={handle_close}>
            {children}
          </DialogActions>
      </Dialog>
    </div>
  );
}


export default FormDialog;