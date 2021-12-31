import { Box, Grid, IconButton, Popover, Typography  } from "@mui/material";
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import EditPopper from "../Shared/Poppers/EditPopper";
import { REACTIONS } from "../../utils/constants";
import styles from "../../styles/Reactions.module.scss";
import { useMutation } from "@apollo/client";
import { CREATE_REACTION } from "../../graphql/mutations/reactions";
import { IMessage } from "../../types/message";
import { useActions } from "../../hooks/useAction";


interface ReactionPopperProps
{
    message_id: string;
}

const ReactionPopper: React.FC<ReactionPopperProps> = ({ message_id }) => 
{
    const { async_set_reaction, async_logout } = useActions();

    const [create_reaction] = useMutation(CREATE_REACTION,
    {
        // onCompleted: data => async_set_reaction(data.create_reaction),
        onError: err => console.log(err)
    });

    const react_to_message = (reaction: string) =>
    {
        create_reaction({ variables: { input: { message_id, content: reaction }}});
    }
    
    return (
        <EditPopper icon="reaction" place="top">
            {/* {...REACTIONS} */}
            <Grid container direction="row">
                {/* <Box p={2}> */}
                    { REACTIONS.map((reaction: string) => 
                        <IconButton 
                            key={reaction}
                            onClick={() => react_to_message(reaction)}
                        >
                            <div className={styles.reaction_icon}>
                                {reaction}
                            </div>
                        </IconButton>
                    )}
                {/* </Box>  */}
            </Grid>
        </EditPopper>
        // <div>
        //     <IconButton >
        //         <SentimentSatisfiedIcon/>
        //     </IconButton>
        //     <Popover
        //         // id={id}
        //         // open={open}
        //         // anchorEl={anchorEl}
        //         // onClose={handleClose}
        //         open={true}
        //         anchorOrigin={{
        //             vertical: 'bottom',
        //             horizontal: 'center'
        //         }}
        //         transformOrigin={{
        //             vertical: 'top',
        //             horizontal: 'center'
        //         }}
        //     >
        //         <Typography>The content of the Popover.</Typography>
        //     </Popover>
        // </div>
    )
}

export default ReactionPopper;