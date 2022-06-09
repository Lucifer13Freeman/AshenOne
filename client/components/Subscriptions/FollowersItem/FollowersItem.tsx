import { Card, Grid, IconButton, Avatar, Typography, CardContent, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../../styles/Item.module.scss";
import { ROUTES, LINKS } from "../../../utils/constants";
import React, { useEffect } from "react";
import { ISubscription } from "../../../store/types/subscription";


interface FollowersItemProps 
{
    subscription: ISubscription;
}

const FollowersItem: React.FC<FollowersItemProps> = ({ subscription }) => 
{
    const router = useRouter();

    return (

        <Card className={styles.item} style={{ padding: 6, margin: 10, width: 80, height: 100 }} raised>
            <Grid
                container
                direction="column"
            >
                <IconButton onClick={() => router.push(ROUTES.PEOPLE + subscription.follower.id)}>
                    <Avatar 
                        alt={subscription.follower.username} 
                        src={LINKS.STATIC_FILES_LINK + subscription.follower.avatar}
                    />
                </IconButton>
                <Typography 
                    className={styles.username} 
                    style={{textAlign: 'center'}}
                    variant="body2" 
                    component="p"
                >
                    {subscription.follower.username}
                </Typography>
            </Grid>
        </Card>
    );
}


export default FollowersItem;