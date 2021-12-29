import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import MainLayout from '../layouts/MainLayout'
import styles from '../styles/Home.module.scss'
import { IUser } from '../types/user'


const Home: React.FC = () => 
{

  //const users = useSelector<any>(state => state.)
  //const dispatch = useDispatch()

  //const { async_get_all_users } = useActions();

  //const { users, error } = useTypedSelector(state => state.user);

  //const dispatch = useDispatch() as NextThunkDispatch;

  //console.log(users)

  return (
    
    <MainLayout>
      <div /*className={styles.container}*/>
        <main /*className={styles.main}*/>
          <h1 className={styles.title}>
            Welcome, Ashen One!
          </h1>

          <p className={styles.description}>
            New home for every dark soul
          </p>
        </main>
      </div> 
    </MainLayout>
  )
}

export default Home;


/*export const getServerSideProps = wrapper.getServerSideProps(
  store => async () =>
  {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(get_all_users());

    return { props: {} }
  }
);*/