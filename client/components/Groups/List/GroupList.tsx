import { Box, Grid } from "@mui/material";
import React from "react";
import { IGroup } from "../../../types/group";
import GroupItem from "../Item/GroupItem";


interface GroupListProps 
{
    groups: IGroup[] | null;
}

const GroupList: React.FC<GroupListProps > = ({ groups }) =>
{
    return (
        <Grid container direction="column">
            <Box p={2}>
                {groups && groups.map(group => 
                    <GroupItem 
                        key={group.id}
                        group={group}
                    />
                )}
            </Box>
        </Grid>
    );
}


export default GroupList;