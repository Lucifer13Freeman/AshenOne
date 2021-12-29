import { Box, Grid } from "@mui/material";
import React from "react";
import { IInvite } from "../../../types/invite";
import InviteItem from "../Item/InviteItem";


interface InviteListProps 
{
    invites: IInvite[] | null;
}

const InviteList: React.FC<InviteListProps > = ({ invites }) =>
{
    return (
        <Grid container direction="column">
            <Box p={2}>
                { invites && invites.map(invite => 
                    <InviteItem 
                        key={invite.id}
                        invite={invite}
                    />
                )}
            </Box>
        </Grid>
    );
}

export default InviteList;