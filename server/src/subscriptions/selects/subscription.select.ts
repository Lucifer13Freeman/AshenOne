import { ISelectUser, select_user } from "src/user/selects/user.select";


export interface ISelectSubscription
{
    id: boolean;
    profile_id: boolean;
    follower_id: boolean;
    follower: { select: ISelectUser };
    profile: { select: ISelectUser };
    created_at: boolean;
    updated_at: boolean;
}

export const select_subscription: ISelectSubscription = {
    id: true,
    profile_id: true,
    follower_id: true,
    follower: { select: select_user },
    profile: { select: select_user },
    created_at: true,
    updated_at: true,
}