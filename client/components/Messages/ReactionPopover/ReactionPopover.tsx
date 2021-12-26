import { IconButton, Popover, Typography  } from "@mui/material";
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';



const ReactionPopover: React.FC = () => 
{
    return (
        <div>
            <IconButton >
                <SentimentSatisfiedIcon/>
            </IconButton>
            <Popover
                // id={id}
                // open={open}
                // anchorEl={anchorEl}
                // onClose={handleClose}
                open={true}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Typography>The content of the Popover.</Typography>
            </Popover>
        </div>
    )
}


export default ReactionPopover;