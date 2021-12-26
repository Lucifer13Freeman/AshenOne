import { Card, CardContent, Grid, IconButton, Avatar, 
        Typography, CardActionArea, Button, FormGroup } from "@mui/material";
import { useRouter } from "next/router";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import styles from "../../../styles/MessageItem.module.scss";
import { ROUTES, URL } from "../../../utils/constants";
import { IChat } from "../../../types/chat";
import { IMessage } from "../../../types/message";
import { date_format } from "../../../utils/date-format";
import { IUser } from "../../../types/user";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EditPopper from "../../Shared/Poppers/EditPopper";
import ConfirmDialog from "../../Shared/Dialogs/ConfirmDialog";
import FormDialog from "../../Shared/Dialogs/FormDialog";
import { useActions } from "../../../hooks/useAction";
import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE, UPDATE_MESSAGE } from "../../../graphql/mutations/messages";
import { TOKEN } from "../../../utils/token";
import { useState } from "react";


interface MessageItemProps 
{
    message: IMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => 
{
    const router = useRouter();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    const { message: state_message, error: messages_error } = useTypedSelector(state => state.message);
    const { async_delete_message, async_update_message, async_logout } = useActions();

    const check_sender = () =>
    {
        if (auth.user?.id === message.user?.id) return true;
        else return false;
    }

    const [gql_delete_message, { loading: delete_message_loading }] = useMutation(DELETE_MESSAGE, 
    {
        onCompleted: (data) => async_delete_message(data.delete_message),
        onError: (err) => 
        {
            console.log(err);
        
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        }
    });
    
    const delete_message = (e: any) =>
    {
        e.preventDefault();
        const input = { input: { id: message.id } }
        gql_delete_message({ variables: input });
    }
    
    const [message_text, set_message_text] = useState(message.text);
    
    const [gql_update_message, { loading: update_message_loading }] = useMutation(UPDATE_MESSAGE, 
    {
        onCompleted: (data) => async_update_message(data.update_message),
        onError: (err) => 
        {
            console.log(err);
            
            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        },
    });
    
    const update_message = (e: any) =>
    {
        e.preventDefault();
        const input = { input: { 
            message_id: message.id,
            text: message_text
        }}
        gql_update_message({ variables: input });
    }
    
    return (

        // <Card 
        //     style={{width: '75vw'}}
        //     //raised
        // >
        <Grid
            container
            direction="row"
            justifyContent={check_sender() ? "flex-end" : "flex-start"}
            //alignItems={check_sender() ? "flex-end" : "flex-start"}
            // className={check_sender() 
            //         ? styles.sent_message_container 
            //         : styles.recieved_message_container }
            // className={ check_sender() 
            //             ? styles.sent_message_box 
            //             : styles.recieved_message_box }
        >
            <Grid
                // container
                // direction="row"
                className={check_sender() 
                        ? styles.sent_message_box 
                        : styles.recieved_message_box}
            >
                { !check_sender() && 
                    <Grid className={styles.avatar}>
                        <IconButton 
                            onClick={() => router.push(ROUTES.PEOPLE + message.user?.id)}
                        >
                            <Avatar 
                                alt={message.user?.username} 
                                src={URL.STATIC_FILES_LINK + message.user?.avatar}
                            />
                        </IconButton>
                    </Grid>
                }
                <Grid 
                    container 
                    direction="column" 
                    //className={styles.message_content}
                >
                    <div className={styles.username}>
                        {message.user?.username}
                    </div>
                    <div className={styles.message_content}>
                        {/* <Card ><CardActionArea> */}
                        {/* <CardContent> */}
                        {/* <div className={styles.message}> */}
                        <Typography 
                            className={styles.message} 
                            gutterBottom 
                            variant="body1" 
                            component="p"
                        >
                            {message.text 
                            ? message.text  
                            : 'Send your first message!'}
                        </Typography>
                        {/* </div> */}
                        
                        {/* <div className={styles.message_date}> */}
                        <Typography className={styles.message_date} variant="body2" component="p">
                            {date_format(message?.created_at)}
                        </Typography>
                        {/* </div> */}
                        {/* </CardContent></CardActionArea> */}
                        {/* </Card> */}
                    </div>
                </Grid>
                { check_sender() && 
                <>
                    <Grid className={styles.avatar}>
                        <IconButton 
                            onClick={() => router.push(ROUTES.PEOPLE + message.user?.id)}
                        >
                            <Avatar 
                                alt={message.user?.username} 
                                src={URL.STATIC_FILES_LINK + message.user?.avatar}
                            />
                        </IconButton>
                    </Grid>
                    <Grid>
                        <EditPopper>
                            <Grid container direction="column">
                                {/* <Button style={{marginBottom: 6}}>Edit</Button> */}
                                <form onSubmit={update_message}>
                                    <FormGroup>
                                        <FormDialog 
                                            button_title='Edit' 
                                            dialog_title='Edit message'
                                            button_variant='text'
                                            form_content={{
                                                text: message_text,
                                                set_text: set_message_text,
                                                is_loading: update_message_loading,
                                                is_with_button: false,
                                                placeholder: 'Edit message...'
                                            }}
                                        >
                                            <Button onClick={update_message}>Save changes</Button>
                                        </FormDialog>
                                    </FormGroup>
                                </form>
                                <ConfirmDialog 
                                    button_title='Delete' 
                                    dialog_title='Delete message'
                                    button_variant='contained'
                                >
                                    <Button onClick={delete_message}>Delete</Button>
                                    <Button>Cancel</Button>
                                </ConfirmDialog>
                            </Grid>
                        </EditPopper>
                    </Grid>
                </>
                }
                {/* <IconButton 
                    onClick={ e => e.stopPropagation() } 
                    style={{marginLeft: 'auto'}}
                >
                    <AddCircleOutlinedIcon />
                </IconButton> */}
            </Grid>
        </Grid>
        // </Card>
    );
}


export default MessageItem;