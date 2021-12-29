import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SlideTransitionUp from '../Transitions/SlideTransitionUp';
import { IconButton } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';


// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & { children: React.ReactElement<any, any>; },
//     ref: React.Ref<unknown>,
// ) { return <Slide direction="up" ref={ref} {...props} />; });

enum BUTTON_TYPE
{
  LEAVE = "leave",
  DELETE = "delete",
  REMOVE = "remove",
  DEFAULT = "default"
}

interface ConfirmDialogProps
{
    button_type?: "leave" | "delete" | "remove" | "default";
    button_title?: string;
    button_variant?: "text" | "contained" | "outlined";
    dialog_title?: string;
    dialog_description?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ children, button_title, button_variant,
                                                    dialog_title, dialog_description, button_type }) => 
{
    const [open, set_open] = React.useState(false);
    const handle_click_open = () => set_open(true);
    const handle_close = () => set_open(false);

    return (
        <div>
            { button_type === BUTTON_TYPE.LEAVE ?
                <IconButton onClick={handle_click_open}>
                    <LogoutRoundedIcon/>
                </IconButton> :
            button_type === BUTTON_TYPE.REMOVE ?
                <IconButton onClick={handle_click_open}>
                    <HighlightOffRoundedIcon/>
                </IconButton> :
            button_type === BUTTON_TYPE.DELETE ?
                <IconButton onClick={handle_click_open}>
                    <DeleteForeverRoundedIcon/>
                </IconButton> :
                <Button variant={button_variant || 'contained'}
                    onClick={handle_click_open}>
                    { button_title || 'Delete' }
                </Button> 
            }
            <Dialog
                open={open}
                TransitionComponent={SlideTransitionUp}
                keepMounted
                onClose={handle_close}
                aria-describedby="confirm_dialog_description"
            >
                <DialogTitle>{ dialog_title || 'Alert' }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm_dialog_description">
                        { dialog_description || 'Are you sure?' }
                    </DialogContentText>
                </DialogContent>
                <DialogActions onClick={handle_close}>
                    { children }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmDialog;