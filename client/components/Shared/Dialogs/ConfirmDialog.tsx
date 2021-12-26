import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) { return <Slide direction="up" ref={ref} {...props} />; });


interface ConfirmDialogProps
{
    button_title?: string;
    button_variant?: "text" | "contained" | "outlined" | undefined;
    dialog_title?: string;
    dialog_description?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ children, button_title, button_variant,
                                                    dialog_title, dialog_description }) => 
{
    const [open, set_open] = React.useState(false);
    const handle_click_open = () => set_open(true);
    const handle_close = () => set_open(false);

    return (
        <div>
            <Button variant={button_variant || 'contained'}
                onClick={handle_click_open}>
                { button_title || 'Delete' }
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
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