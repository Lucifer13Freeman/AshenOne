import { useState } from 'react';
import { Button, 
        Grid, 
        FormControl, 
        FormGroup, 
        Input, 
        InputLabel, 
        FormHelperText,
        IconButton } from '@mui/material';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from "next/router";
import MainLayout from '../../layouts/MainLayout';
import { ROUTES } from '../../utils/constants';
import { REGISTER_USER } from '../../graphql/mutations/users';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


interface IRegist 
{
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    show_password: boolean;
    show_confirm_password: boolean;
}

interface IError
{
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirm_password: string | undefined;
}

const initial_state: IRegist = 
{
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    show_password: false,
    show_confirm_password: false
};

const initial_error: IError =
{
    username: undefined,
    email: undefined,
    password: undefined,
    confirm_password: undefined
}


const RegisterPage: React.FC = () =>
{
    const router = useRouter();

    const [values, set_values] = useState(initial_state);
    const [errors, set_errors] = useState(initial_error);

    const [register_user, { loading }] = useMutation(REGISTER_USER, 
    {
        update: (_, __) => router.push(ROUTES.LOGIN),  //window.location.href = '/login',
        onError: (err) => set_errors(err.graphQLErrors[0].extensions?.errors)
    });
      
    const submit_register_form = (e: React.FormEvent) =>
    {
        e.preventDefault();

        const input = {
            input: {
                ...values, 
                show_password: undefined,
                show_confirm_password: undefined
            }
        }

        register_user({ variables: input });
        //set_values(initialState);
    }

    
    return (

        <MainLayout>
            <Grid 
                container 
                direction="column" 
                style={{ padding: 20, maxWidth: 400 }}
            >
                <form onSubmit={submit_register_form}>
                    <FormGroup>
                        <h1>
                            Register
                        </h1>
                        <FormControl style={{marginTop: 20}}>
                            <InputLabel htmlFor="username-input">
                                Username
                            </InputLabel>
                            <Input 
                                id="username-input"
                                value={values.username}
                                onChange={ e => set_values({ ...values, username: e.target.value }) }
                            />
                        </FormControl>
                        <FormControl style={{marginTop: 20}}>
                            <InputLabel htmlFor="email-input">
                                { errors.email ?? 'Email address' }
                            </InputLabel>
                            <Input 
                                id="email-input" 
                                aria-describedby="email-helper-text"
                                type="email"
                                value={values.email}
                                onChange={ e => set_values({ ...values, email: e.target.value }) }
                            />
                            <FormHelperText id="email-helper-text">
                                    We'll never share your email.
                            </FormHelperText>
                        </FormControl>
                        <FormControl style={{marginTop: 20}}>
                            <InputLabel htmlFor="password-input">
                                Password
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
                                        { values.show_password ? <Visibility /> : <VisibilityOff /> }
                                    </IconButton>
                                </InputAdornment>}
                            />
                        </FormControl>
                        <FormControl style={{marginTop: 20}}>
                            <InputLabel htmlFor="confirm-password-input">
                                Confirm password
                            </InputLabel>
                            {/* <Input 
                                id="confirm-password-input"
                                type="password"
                                value={values.confirm_password}
                                onChange={ e => set_values({ ...values, confirm_password: e.target.value }) }
                            /> */}
                            <Input
                                id="confirm-password-input"
                                type={values.show_confirm_password ? 'text' : 'password'}
                                value={values.confirm_password}
                                onChange={ e => set_values({ ...values, confirm_password: e.target.value }) }
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ () => set_values({ ...values, show_confirm_password: !values.show_confirm_password }) }
                                        onMouseDown={ (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault() }
                                    >
                                        { values.show_confirm_password ? <Visibility /> : <VisibilityOff /> }
                                    </IconButton>
                                </InputAdornment>}
                            />
                        </FormControl>
                        <div style={{ marginTop: '10px' }}>
                            <small>Alredy have an account?  </small>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </div>
                        <FormControl>
                            <Button 
                                type="submit"
                                style={{ marginTop: '10px' }}
                                disabled={loading}
                            >
                                { loading ? 'loading...' : 'Register' }
                            </Button>
                        </FormControl>
                    </FormGroup>
                </form>
            </Grid>
        </MainLayout>
    )
}

export default RegisterPage;