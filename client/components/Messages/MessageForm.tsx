import { Reference, StoreObject, useMutation } from "@apollo/client";
import { Button, 
        Grid, 
        TextField,
        FormGroup,
        useTheme,
        Theme} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { CREATE_MESSAGE } from "../../graphql/mutations/messages";
import styles from '../../styles/Inputs.module.scss';
import { createStyles, makeStyles } from '@mui/styles';
import SendInput from "../Shared/Inputs/SendInput";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 20,
        
        //   '&:hover': {
        //     borderColor: theme.palette.primary.main,
        //     //border: '1px solid'
        //   },
            // '& .MuiOutlinedInput-root': {
            //     '&:hover fieldset': {
            //         borderColor: 'yellow',
            //     },
            // }
        },
        notchedOutline: {
            '&:hover': {
                borderColor: undefined
            }
        }
        // no_border: {
        //     '&:hover': {
        //         borderColor: undefined
        //     }
        // }
    })
);

interface MessageFormProps 
{
    chat_id?: string | string[];
}

const MessageForm: React.FC<MessageFormProps> = ({ chat_id }) => 
{
    // const theme = useTheme();
    const classes = useStyles();

    const [message_text, set_message_text] = useState('');
    const handle_message_text = (event: React.ChangeEvent<HTMLInputElement>) => set_message_text(event.target.value);

    const [create_message, { loading: message_loading }] = useMutation(CREATE_MESSAGE, 
    {
        // update: (cache, { data }) => 
        // {
        //     const message_id = cache.identify(data.create_message);

        //     //const cache_data = cache.identify(data.data);

        //     // const chat_id = cache.identify(data.get_chat);

        //     // const chats_id = cache.identify(data.get_all_chats);

        //     // cache.modify(
        //     // {
        //     //     fields: 
        //     //     {
        //     //         create_message: (existingFieldData, { toReference }) => 
        //     //         {
        //     //             //return [...existingFieldData, toReference(message_id)]
        //     //         }
        //     //     }
        //     // })

        //     // console.log(message_id)
        //     // console.log(cache)
        //     //console.log(cache_data)
        //     //console.log(chat_id)
        //     //console.log(chats_id)
        // },
        onError: (err) => console.log(err)
    });

    const send_message = (e: React.FormEvent) =>
    {
        e.preventDefault();

        const input = {
            input: {
                chat_id,
                text: message_text
            }
        }

        create_message({ variables: input });
        set_message_text('');
    }
    

    return (

      <Grid className={styles.send_input_box}>
            <form onSubmit={send_message}>
                <FormGroup>
                    <SendInput 
                        placeholder="Enter message..."
                        loading_placeholder={() => "Sending..."}
                        is_loading={message_loading} 
                        value={message_text} 
                        set_value={set_message_text} 
                    />
                    {/* <Grid
                        container
                        direction="row"
                        //style={{width: '100%'}}
                    >
                        <Grid
                            className={styles.message_input}
                            //style={{marginRight: 20, width: '100%'}}
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
                                    notchedOutline: classes.notchedOutline
                                }}}
                                minRows={2}
                                maxRows={2}
                                label={"Type a message..."}
                                value={message_text}
                                onChange={(e) => set_message_text(e.target.value)}
                                //onChange={handle_change}
                            />
                        </Grid>
                        <Grid
                            //className={styles.send_button}
                            style={{ marginLeft: 10 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={message_loading || message_text === ""}
                                //onClick={send_message}
                                className={styles.send_button}
                                //classes={styles.send_button}
                                style={{ borderRadius: 20 }}
                                //endIcon={<Icon>send</Icon>}
                            >
                                { message_loading ? "Sending..." : <SendIcon /> }
                            </Button>
                        </Grid>
                    </Grid> */}
                </FormGroup>
            </form>
      </Grid>
    );
}


export default MessageForm;
