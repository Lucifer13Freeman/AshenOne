import { Box, Grid } from "@mui/material";
import React from "react";
import { IReaction } from "../../../types/reaction";
import ReactionItem from "../Item/ReactionItem";


interface ReactionListProps 
{
    reactions: IReaction[] | null;
}

const ReactionList: React.FC<ReactionListProps > = ({ reactions }) =>
{
    // const [expanded, set_expanded] = React.useState(false);
    // const handle_expand_click = () => { set_expanded(!expanded); };

    return (
        <Grid container direction="column">
            <Box p={2}>
                {reactions && reactions.map(reaction => 
                    <ReactionItem 
                        key={reaction.id}
                        reaction={reaction}
                    />
                )}
            </Box>
        </Grid>
    );
}

export default ReactionList;