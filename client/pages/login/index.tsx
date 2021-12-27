import { useState } from 'react';
import { Button,
        Grid, 
        FormControl, 
        FormGroup, 
        Input, 
        InputLabel, 
        FormHelperText, 
        IconButton, 
        Card} from '@mui/material';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useActions } from '../../hooks/useAction';
import MainLayout from '../../layouts/MainLayout';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ROUTES } from '../../utils/constants';
import { LOGIN_USER } from '../../graphql/mutations/users';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from '../../styles/App.module.scss';


interface ILogin 
{
    email: string;
    password: string;
    show_password: boolean;
}

interface IError
{
    email: string | undefined;
    password: string | undefined;
    is_banned: string | undefined;
}

const initial_state: ILogin = 
{
    email: '',
    password: '',
    show_password: false
};

const initial_error: IError =
{
    email: undefined,
    password: undefined,
    is_banned: undefined
}

/*interface FunctionComponent<P = {}> 
{
    (props: PropsWithChildren<P>, context?: any): ReactElement | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}*/

const LoginPage: React.FC = () =>
{
    const router = useRouter();

    const [values, set_values] = useState(initial_state);
    const [errors, set_errors] = useState(initial_error);

    const { async_login, login } = useActions();

    const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    const [login_user, { loading: login_loading }] = useMutation(LOGIN_USER, 
    {
        onError: (err) => set_errors(err.graphQLErrors[0].extensions?.errors),
        onCompleted: (data) =>
        {
            async_login({ user: data.login.user, is_auth: true });

            //console.log(auth)
            //async_login({ token: data.login.token });

            window.location.href = ROUTES.HOME;
            //router.push(ROUTES.HOME);
        }
    });

    
    /*const [get_current_user, { loading: current_user_loading }] = useLazyQuery(GET_CURRENT_USER, 
    {
        onCompleted: data => 
        {
            //user = { ...data.get_current_user }
            console.log(data.get_current_user)
        },
        onError: err => console.log(err)
    });*/
      

    const submit_login_form = (e: React.FormEvent) =>
    {
        e.preventDefault();
        const input = { input: { ...values, show_password: undefined }}

        login_user({ variables: input });
    }

    return (

        <MainLayout>
            <Grid 
                container 
                direction="column" 
                style={{ padding: 20 }}
            >
                {/* <Card className={styles.card}> */}
                <form onSubmit={submit_login_form}>
                    <FormGroup>
                        <h1>
                            Login
                        </h1>
                        <FormControl style={{marginTop: 20}}>
                            <InputLabel htmlFor="email-input">
                                { errors.email ?? 'Email address' }
                            </InputLabel>
                            <Input 
                                id="email-input" 
                                type="email"
                                aria-describedby="email-helper-text"
                                value={values.email}
                                onChange={ e => set_values({ ...values, email: e.target.value }) }
                            />
                            <FormHelperText id="email-helper-text">
                                We'll never share your email.
                            </FormHelperText>
                        </FormControl>
                        <FormControl style={{marginTop: 20}}>
                            <InputLabel htmlFor="password-input">
                                { errors.password ?? 'Password' }
                            </InputLabel>
                            {/* <Input 
                                id="password-input"
                                type="password"
                                value={values.password}
                                onChange={ e => set_values({ ...values, password: e.target.value }) }
                            /> */}
                            <Input
                                id="password-input"
                                type={values.show_password ? 'text' : 'password'}
                                value={values.password}
                                onChange={ e => set_values({ ...values, password: e.target.value }) }
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ () => set_values({ ...values, show_password: !values.show_password }) }
                                        onMouseDown={ (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault() }
                                    >
                                        { values.show_password ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>}
                            />
                        </FormControl>
                        <div style={{ marginTop: '10px' }}>
                            <small>Don't have an account?  </small>
                            <Link href="/register">
                                <a>Register</a>
                            </Link>
                        </div>
                        <FormControl>
                            <Button 
                                type="submit"
                                disabled={login_loading}
                                style={{ marginTop: '10px' }}
                            >
                                { login_loading ? 'loading...' : 'Login' }
                            </Button>
                            { errors.is_banned ?? '' }
                        </FormControl>
                    </FormGroup>
                </form>
                {/* </Card> */}
            </Grid>
        </MainLayout>
    )
}


export default LoginPage;
