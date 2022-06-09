import { Box, Grid } from "@mui/material";
import React from "react";
import { ISubscription } from "../../../store/types/subscription";
import FollowersItem from "../FollowersItem/FollowersItem";


interface FollowersListProps 
{
    subscriptions: ISubscription[];
}

const FollowersList: React.FC<FollowersListProps > = ({ subscriptions }) =>
{
    return (
        <Grid container direction="row" >
            {/* <Box p={2}> */}
                {subscriptions && subscriptions.map(subscription => 
                    <FollowersItem
                        key={subscription.id}
                        subscription={subscription}
                    />
                )}
            {/* </Box> */}
        </Grid>
    );
}


export default FollowersList;