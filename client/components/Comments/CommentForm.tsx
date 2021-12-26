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
import { CREATE_COMMENT } from "../../graphql/mutations/comments";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import SendInput from "../Shared/Inputs/SendInput";
import { ROUTES } from "../../utils/constants";
import { TOKEN } from "../../utils/token";
import { useRouter } from "next/router";


interface CommentFormProps 
{
    post_id: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ post_id }) => 
{
    const router = useRouter();

    const [comment_text, set_comment_text] = useState('');
    // const handle_comment_text = (event: React.ChangeEvent<HTMLInputElement>) => set_comment_text(event.target.value);

    const { comment, error: comments_error } = useTypedSelector(state => state.comment);
    const { async_logout, async_get_user, async_create_comment } = useActions();

    const [create_comment, { loading: comment_loading }] = useMutation(CREATE_COMMENT, 
    {
        onCompleted: (data) => async_create_comment(data.create_comment),
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

    const send_comment = (e: React.FormEvent) =>
    {
        e.preventDefault();

        const input = {
            input: {
                post_id, text: comment_text
            }
        }

        create_comment({ variables: input });
        set_comment_text('');
    }
    

    return (
        <Card style={{marginTop: 10}} raised>
            <Grid className={styles.message_input_box}>
                <form onSubmit={send_comment}>
                    <FormGroup>
                        <SendInput 
                            placeholder="Comment..."
                            loading_placeholder={() => "Sending..."}
                            is_loading={comment_loading} 
                            value={comment_text} 
                            set_value={set_comment_text} 
                        />
                    </FormGroup>
                </form>
            </Grid>
      </Card>
    );
}


export default CommentForm;
