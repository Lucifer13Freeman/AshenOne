import { Container, NoSsr } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import Head from "next/head";
import Footer from "./Footer/Footer";
import styles from '../styles/App.module.scss';
import { useRouter } from "next/router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ROUTES } from "../utils/constants";


interface MainLayoutProps
{
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = (
    { children, 
        title, 
        description,
        keywords
    }: any) =>
{
    //const router = useRouter();

    //const { async_get_user, async_logout } = useActions();
    // const { auth, error: auth_error } = useTypedSelector(state => state.auth);

    // if (!auth.user || !auth.is_auth) 
    // {
    //     router.push(ROUTES.LOGIN);
    //     return;
    // }

    // const [get_current_user, 
    //         { data: current_user, 
    //         loading: current_user_loading }] = useLazyQuery(GET_CURRENT_USER, 
    // {
    //     onCompleted: data => async_get_user(data.get_current_user),
    //     onError: err => 
    //     {
    //         if (err.message === 'Unauthorized') 
    //         {
    //             router.push('/login');
    //             async_logout();
    //         }
    //         console.log(err);
    //     },
    //     nextFetchPolicy: "cache-first"
    // });


    return (
        <>
            <Head>
                <title>{title || 'AshenOne'}</title>
                <meta name="description" content={'AshenOne. New home for every dark soul' + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "AshenOne"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <NoSsr>
              <Navbar/>
            </NoSsr>
            <Container
                maxWidth={false}
                //className={styles.content}
            > 
            {/* <div style={{ margin: '0 20px' }}> */}
                <main className={styles.main}>
                    { children }
                </main>
            {/* </div> */}
            </Container>
            <NoSsr>
                <Footer/>
            </NoSsr>
        </>
    );
}

export default MainLayout;