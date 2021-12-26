import { Reference, StoreObject, useMutation } from "@apollo/client";
import { Button, 
        Grid, 
        TextField,
        FormGroup,
        useTheme,
        Theme,
        Card} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import styles from '../../styles/Messages.module.scss';
import app_styles from '../../styles/App.module.scss';
import { createStyles, makeStyles } from '@mui/styles';
import { CREATE_POST } from "../../graphql/mutations/posts";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import SendInput from "../Shared/Inputs/SendInput";
import { TOKEN } from "../../utils/token";
import { async_logout } from "../../store/actions/auth";
import { ROUTES } from "../../utils/constants";
import { useRouter } from "next/router";


interface PostFormProps 
{
    // chat_id?: string | string[];
}

const PostForm: React.FC<PostFormProps> = () => 
{
    const router = useRouter();

    // const [body, set_body] = useState('');
    const [post_text, set_post_text] = useState('');
    const handle_post_text = (event: React.ChangeEvent<HTMLInputElement>) => set_post_text(event.target.value);

    const { post, error: posts_error } = useTypedSelector(state => state.post);
    const { async_logout, async_get_user, async_create_post } = useActions();

    const [create_post, { loading: post_loading }] = useMutation(CREATE_POST, 
    {
        onCompleted: (data) => async_create_post(data.create_post),
        onError: (err) => 
        {
            console.log(err);

            if (err.message === TOKEN.ERROR_MESSAGE) 
            {
                async_logout();
                router.push(ROUTES.LOGIN);
            }
        }
    });

    const share_post = (e: React.FormEvent) =>
    {
        e.preventDefault();

        const input = {
            input: {
                text: post_text
            }
        }

        create_post({ variables: input });
        set_post_text('');
    }
    

    return (
        <Card className={app_styles.card} sx={{ maxWidth: 345 }} style={{marginBottom: 10}}>
            <Grid className={styles.message_input_box}>
                    <form onSubmit={share_post}>
                        <FormGroup>
                            <SendInput 
                                placeholder="What's up?"
                                loading_placeholder={() => "Sharing..."}
                                is_loading={post_loading} 
                                value={post_text} 
                                set_value={set_post_text} 
                            />
                        </FormGroup>
                    </form>
            </Grid>
      </Card>
    );
}


export default PostForm;
