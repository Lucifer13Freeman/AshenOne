import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import SendInput from '../Inputs/SendInput';
import { useState } from 'react';
import { FormControl, FormControlLabel, FormGroup, Grid, IconButton, 
        Input, InputLabel, Radio, RadioGroup, Slide, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import FormDialogTitle from '../Shared/Dialogs/FormDialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { ACCESS, ROUTES } from '../../utils/constants';
import SlideTransitionUp from '../Shared/Transitions/SlideTransitionUp';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import styles from '../../styles/App.module.scss';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../../graphql/mutations/groups';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TOKEN } from '../../utils/token';
import { useRouter } from 'next/router';


// enum BUTTON_TYPE
// {
//   // CREATE = "create",
//   SETTINGS = "setting",
//   EDIT = "edit",
//   DEFAULT = "default"
// }

interface ICreateGroup 
{
  name: string;
  access: ACCESS | string;
  is_private: boolean;
}

const initial_state: ICreateGroup = 
{
  name: '',
  access: ACCESS.PUBLIC,
  is_private: false
};

interface IError
{
  name?: string;
}

const initial_error: IError = 
{
  name: undefined,
};

// interface IFormContent
// {
//   text?: string;
//   set_text: Function;
//   image?: string;
//   audio?: string;
//   video?: string;
//   is_loading?: boolean;
//   is_with_button?: boolean;
//   groupname_placeholder?: string;
// }

interface FormDialogProps
{
  button_title?: string;
  button_variant?: "text" | "contained" | "outlined";
  dialog_title?: string;
  dialog_description?: string;
  // form_content: IFormContent;
}

const CreateGroupDialog: React.FC<FormDialogProps> = ({ button_title, button_variant,
                                                dialog_title, dialog_description }) =>
{
  const router = useRouter();

  const [open, set_open] = React.useState(false);
  const handle_click_open = () => set_open(true);
  const handle_close = () => 
  {
    set_values(initial_state);
    set_errors(initial_error);
    set_open(false)
  };

  const [values, set_values] = useState(initial_state);
  const [errors, set_errors] = useState(initial_error);

  const { state_group, groups, error: groups_error } = useTypedSelector(state => state.group);
  const { async_set_group, async_create_group, 
          async_set_all_groups, async_logout } = useActions();

  const handle_access_radio_change = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    const is_private = (event.target as HTMLInputElement).value === ACCESS.PRIVATE;
    set_values({ ...values, access: (event.target as HTMLInputElement).value, is_private });
    // update_group({ variables: { input: { id: group.id, is_private }}});
  }

  const [gql_create_group, { loading: create_group_loading, 
                          data: create_group_data }] = useMutation(CREATE_GROUP,   
  {
    onCompleted: data => 
    {
      async_create_group(data.create_group);
      handle_close();
    },
    onError: err => 
    {
        set_errors(err.graphQLErrors[0].extensions?.errors)
        console.log(err);
        
        if (err.message === TOKEN.ERROR_MESSAGE) 
        {
          router.push(ROUTES.LOGIN);
          async_set_group(null);
          async_set_all_groups([]);
          async_logout();
        }
    }
  });

  const create_group = (e: any) =>
  {
    e.preventDefault();
    gql_create_group({ variables: { input: { ...values, access: undefined }}});
  }

  return (
    <div>
      <Grid container direction="column">
        {/* <Button variant={button_variant || 'text'} 
          onClick={handle_click_open}>
          {button_title || 'Create'}
        </Button>  */}
        <Button 
          variant={button_variant || 'text'} 
          onClick={handle_click_open}>
          <Typography 
            variant="h6"
            color="primary"
            className={styles.page_title}
            // style={{ marginRight: 16, marginBottom: 6 }}
            noWrap
          >
            {button_title || 'Create'}
          </Typography>
        <AddBoxRoundedIcon/>
      </Button>
      </Grid>
        <Dialog 
          TransitionComponent={SlideTransitionUp}
          open={open} 
          onClose={handle_close}>
        {/* <DialogTitle>{dialog_title || 'Edit'}</DialogTitle> */}
          <FormDialogTitle id="dialog_title" onClose={handle_close}>
            {dialog_title || 'Create group'}
          </FormDialogTitle>
            <DialogContent style={{padding: 20, width: 340}}>
              <DialogContentText>
                {dialog_description || ''}
              </DialogContentText>
              <FormGroup style={{width: 300}}>
                <FormControl >
                  <InputLabel htmlFor="groupname_input">
                    { errors.name ?? 'Group name' }
                  </InputLabel>
                  <Input 
                    id="groupname_input"
                    value={values.name}
                    fullWidth
                    onChange={ e => set_values({ ...values, name: e.target.value }) }
                  />
                </FormControl>
                <FormControl>
                 <RadioGroup
                  style={{padding: '4px 20px'}}
                  aria-label="quiz"
                  name="access"
                  value={values.access}
                  onChange={handle_access_radio_change}
                >
                  <FormControlLabel style={{marginBottom: 10}}
                    value={ACCESS.PRIVATE} 
                    control={<Radio />} 
                    label="Private" />
                    <FormControlLabel 
                      value={ACCESS.PUBLIC} 
                      control={<Radio />} 
                      label="Public" />
                  </RadioGroup>
                </FormControl>
              </FormGroup>
            </DialogContent>
          <DialogActions>
            {/* {children} */}
            <Button onClick={create_group}>Create</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}


export default CreateGroupDialog;