import { useRouter } from "next/router";
import {  Card, Grid, IconButton, Avatar, Typography, Button  } from "@mui/material";
import { date_format } from "../../utils/date-format";
import { LINKS } from "../../utils/constants";
import { IUser } from "../../types/user";
import AvatarDialog from "../Shared/Dialogs/AvatarDialog";
import styles from "../../styles/App.module.scss";


interface AdminProfileProps 
{
    //user_id?: string | string[];
    user: IUser;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ user }) => 
{
    const router = useRouter();

    //const input = { input: { id: user_id } }
    
    // const { auth, error: auth_error } = useTypedSelector(state => state.auth);
    // const { async_get_user, async_logout, async_get_subscription } = useActions();

    
    return (

        <div>
        { user ? 
            <>
            <Card className={styles.card}>
                <Grid 
                    container 
                    //direction="column" 
                    style={{ margin: 20 }}
                >
                    <Grid>
                        <IconButton>
                            <Avatar 
                                variant="square" 
                                alt={user.username} 
                                src={LINKS.STATIC_FILES_LINK + user.avatar}
                                style={{ 
                                    height: 150,
                                    width: 150
                                }}
                            />
                        </IconButton>
                        <AvatarDialog user_id = {user.id} avatar={LINKS.STATIC_FILES_LINK + user.avatar}/>
                    </Grid> 
                    <Grid
                        //container
                        //direction="column" 
                        style={{ margin: '0 20px' }}
                    >
                        <Typography variant="h4">
                            {user.username}
                        </Typography>
                        <div style={{
                            fontSize: 12, 
                            color: 'gray'}}
                        >
                            Registered at: { date_format(user.created_at) }
                        </div>
                        <Button variant="contained" style={{ margin: '60px 0' }}
                            onClick={() => {window.location.href = LINKS.DB_ADMIN_LINK}}
                        >
                            DB Admin Panel
                        </Button>
                    </Grid>
                </Grid>
            </Card>
            </>
            : <div>User not found!</div> }
        </div>
    );
}


export default AdminProfile;