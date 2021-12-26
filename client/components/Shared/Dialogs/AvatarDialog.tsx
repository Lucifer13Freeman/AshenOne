import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from 'react';
import { useActions } from '../../../hooks/useAction';
import axios from 'axios';
import router from 'next/router';
import { ROUTES, URL } from '../../../utils/constants';
import { set_auth_token } from '../../../utils/set_auth_token';
import FileUpload from '../../Files/FileUpload';
import { CardMedia } from '@mui/material';
import FormDialogTitle from './FormDialogTitle';


const AvatarDialogStyle = styled(Dialog)(({ theme }) => (
{
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

interface AvatarDialogProps
{
    user_id: string;
    avatar: string;
}

const AvatarDialog: React.FC<AvatarDialogProps> = ({ user_id, avatar }) => 
{
    const [open_avatar_dialog, set_open_avatar_dialog] = useState(false);

    const handle_open_avatar_dialog = () => { set_open_avatar_dialog(true); };
    const handle_close_avatar_dialog = () => { set_open_avatar_dialog(false); };

    const [image, set_image]: any = useState(null);
    const [image_base64, set_image_base64]: any = useState(null);
    const { async_get_user, async_login } = useActions();

    const form_data = new FormData();

    const upload_avatar = () => 
    {
        form_data.append('image', image);
        set_auth_token();
        axios.post(`${URL.HTTP_BASE}${ROUTES.PEOPLE}${user_id}/avatar`, form_data)
                .then(res => 
                {
                    async_get_user({ ...res.data });
                    async_login({ user: res.data, is_auth: true });
                })
                .catch(e => console.log(e));
        set_open_avatar_dialog(false);
    }

    let image_markup;
    if (image_base64) image_markup = <CardMedia component='img' src={image_base64} height = '240' width = '240' alt="New avatar"/>;
    else image_markup = <CardMedia component = 'img' height = '240' width = '240' image = {avatar} alt = 'Current avatar'/>
    

    return (
        <div>
            <IconButton>
                <SettingsIcon onClick={handle_open_avatar_dialog}/>
            </IconButton>
            <AvatarDialogStyle
                onClose={handle_close_avatar_dialog}
                aria-labelledby="avatar_dialog_title"
                open={open_avatar_dialog}
            >
                <FormDialogTitle id="avatar_dialog_title" onClose={handle_close_avatar_dialog}>
                    Edit avatar
                </FormDialogTitle>
                <DialogContent dividers style={{display: 'flex', justifyContent: 'center'}}>
                    {image_markup}
                </DialogContent>
                <DialogActions>
                    <FileUpload
                        set_file={set_image}
                        accept="image/*"
                        set_base64={set_image_base64}
                    >
                        <Button autoFocus>Upload file</Button>
                    </FileUpload>
                    <Button onClick={upload_avatar}>Save changes</Button>
                </DialogActions>
            </AvatarDialogStyle>
        </div>
    );
}

export default AvatarDialog;