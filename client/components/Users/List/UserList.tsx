import { Box, Grid } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IInvite } from "../../../store/types/invite";
import { IUser } from "../../../store/types/user";
import UserItem from "../Item/UserItem";


interface UserListProps 
{
    users: IUser[];// | null;
    is_for_invites?: boolean;
    chat_id?: string;
    group_id?: string;
    invites?: IInvite[];
}

const UserList: React.FC<UserListProps > = ({ users, is_for_invites, 
                                                chat_id, group_id, invites }) =>
{
    // let users_markup;

    // if (users && users.length > 0) 
    //     users_markup = users.map(user => 
    //         <UserItem 
    //             key={user.id}
    //             user={user}
    //         />)
    // else users_markup = <div>Users not found!</div>

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    const find_invite = (user_id: string) =>
    {
        let found_invite;

        if (group_id)
            found_invite = invites?.find((inv: IInvite) => inv.user.id === user_id 
                                                        && inv.group?.id === group_id 
                                                        && inv.sender.id === auth.user?.id);
        else if (chat_id)
            found_invite = invites?.find((inv: IInvite) => inv.user.id === user_id 
                                                            && inv.chat?.id === chat_id 
                                                            && inv.sender.id === auth.user?.id);
        return found_invite;
    }

    return (
        <Grid container direction="column">
            <Box p={2}>
                { users && users.map(user => 
                    <UserItem 
                        key={user.id}
                        user={user}
                        is_for_invites={is_for_invites}
                        chat_id={chat_id}
                        group_id={group_id}
                        invite={find_invite(user.id)}
                    />
                ) }
                {/* {users_markup} */}
            </Box>
        </Grid>
    );
}

export default UserList;