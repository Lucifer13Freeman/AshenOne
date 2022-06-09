import { useQuery } from "@apollo/client";
import { Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GET_ALL_SUBSCRIPTIONS } from "../../graphql/queries.ts/subscription";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ISubscription } from "../../store/types/subscription";
import { ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import FollowersList from "./FollowersList/FollowersList";


interface FollowersProps 
{
    // user_id?: string | string[];
    subscriptions: ISubscription[];
}

const Followers: React.FC<FollowersProps> = ({ subscriptions }) => 
{
    // const router = useRouter();

    // const input = { input: { profile_id: user_id } }
    
    // const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    // const { user, users, error: users_error } = useTypedSelector(state => state.user);
    // const { subscriptions, error: subscriptions_error } = useTypedSelector(state => state.subscription);

    // const { async_set_all_subscriptions, async_logout } = useActions();
    

    // const { loading: subscriptions_loading, data: subscriptions_data } = useQuery(GET_ALL_SUBSCRIPTIONS,   
    // {
    //     variables: input,
    //     onCompleted: data => async_set_all_subscriptions(data.get_all_subscriptions),
    //     onError: err => 
    //     {
    //         console.log(err);
    //         async_set_all_subscriptions([]);
                    
    //         if (err.message === TOKEN.ERROR_MESSAGE) 
    //         {
    //             async_logout();
    //             router.push(ROUTES.LOGIN);
    //         }
    //     },
    //     nextFetchPolicy: "cache-first"
    // });


    return (
       
        <Card style={{ marginBottom: 10 }} raised>
            <Typography variant="h5" color='gray' ml={2} mt={1}>Followers</Typography>
            <Grid container direction="column" style={{ margin: 10 }}>
                <FollowersList subscriptions={subscriptions}/>
            </Grid>
        </Card>
    );
}

export default Followers;
