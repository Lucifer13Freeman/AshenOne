import { Box, Grid } from "@mui/material";
import React from "react";
import { IUser } from "../../../types/user";
import UserItem from "../Item/UserItem";


interface UserListProps 
{
    users: IUser[];// | null;
}

const UserList: React.FC<UserListProps > = ({ users }) =>
{
    // let users_markup;

    // if (users && users.length > 0) 
    //     users_markup = users.map(user => 
    //         <UserItem 
    //             key={user.id}
    //             user={user}
    //         />)
    // else users_markup = <div>Users not found!</div>

    return (
        <Grid container direction="column">
            <Box p={2}>
                { users && users.map(user => 
                    <UserItem 
                        key={user.id}
                        user={user}
                    />
                ) }
                {/* {users_markup} */}
            </Box>
        </Grid>
    );
}

export default UserList;