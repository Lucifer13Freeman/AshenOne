import { Reference, StoreObject, useMutation } from "@apollo/client";
import { Button, 
        Grid, 
        TextField,
        FormGroup,
        useTheme,
        Theme,
        Card} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import styles from '../../../styles/Inputs.module.scss';
import app_styles from '../../../styles/App.module.scss';
import { createStyles, makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 20,
        },
        notchedOutline: {
            '&:hover': {
                borderColor: undefined
            }
        }
    })
);

// interface IFormContent
// {
//   text?: string;
//   image?: string;
//   audio?: string;
//   video?: string;
// }

interface SendInputProps
{
    placeholder?: string;
    loading_placeholder?: Function;
    value?: string | undefined
    set_value: Function;
    is_loading?: boolean;
    is_with_button?: boolean;
    //form_content?: IFormContent;
}

const SendInput: React.FC<SendInputProps> = ({ value, set_value, 
                                            is_loading, placeholder, 
                                            loading_placeholder, 
                                            is_with_button = true/*, form_content*/ }) =>
{
    const classes = useStyles();

    return (
      <Grid
        container
        direction={is_with_button ? "row" : "column"}
        //style={{width: '100%'}}
      >
        <Grid
          className={is_with_button ? styles.send_input : ''}
          // style={is_with_button ? { width: '100%', borderRadius: 20 } 
          //       : { width: 'calc(100% - 90px)', borderRadius: 20 }}
        >
          <TextField
            //{...message_text}
            //{ ...message_text.value, message_text.onChange }
            variant="outlined"
            multiline
            fullWidth
            //style={{ outline: 'none' }}
            InputProps={{
              //notched: false,
              classes: {
                root: classes.root,
                notchedOutline: classes.notchedOutline,
              },
            }}
            minRows={2}
            maxRows={2}
            label={placeholder ? placeholder : 'Enter message...'}
            value={value}
            onChange={(e) => set_value(e.target.value)}
            //onChange={handle_change}
          />
        </Grid>
        { is_with_button &&
        <Grid style={{ marginLeft: 10 }}>
           <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={is_loading || value === ""}
            className={styles.send_button}
            style={{ borderRadius: 20 }}
          >
            { is_loading ? (loading_placeholder ? 
                          loading_placeholder() : 
                          'Sending...') : <SendIcon />}
          </Button> 
        </Grid> }
      </Grid>
    );
}

export default SendInput;