import * as React from 'react';
import Box from '@mui/material/Box';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { ClickAwayListener, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface EditPopperProps
{
    place?: PopperPlacementType;
}

const EditPopper: React.FC<EditPopperProps> = ({ children, place = 'bottom-end' }) => 
{
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, set_open] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

    const handle_click =
    (new_placement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      set_open((prev) => placement !== new_placement || !prev);
      setPlacement(new_placement);
    };

    const handle_click_away = () => set_open(false);

    return (
        <ClickAwayListener onClickAway={handle_click_away}>
            <Box /*sx={{ width: 500 }}*/>
                <Popper open={open} anchorEl={anchorEl} 
                        placement={placement} transition >
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{padding: 10}}>
                            <Grid container direction="column">
                                {children}
                            </Grid>
                        </Paper>
                    </Fade>
                    )}
                </Popper>
                <Grid container justifyContent="center">
                    <Grid item>
                        <IconButton aria-label="settings" onClick={handle_click(place)}>
                            <MoreVertIcon />
                        </IconButton >
                    </Grid>
                </Grid>
            </Box>
        </ClickAwayListener>
    );
}

export default EditPopper;