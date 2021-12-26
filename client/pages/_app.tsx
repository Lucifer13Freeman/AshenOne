import '../styles/globals.scss';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import ApolloProvider from '../graphql/ApolloProvider/ApolloProvider';
//import ApolloProvider from '../graphql/apollo-client';
import { make_store, SagaStore, wrapper } from '../store';
import { END } from 'redux-saga';
import { Provider, useStore } from 'react-redux';
import App from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';
import Navbar from '../layouts/Navbar/Navbar';
import Footer from '../layouts/Footer/Footer';
import { NoSsr } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import store from '../store';


const theme = createTheme(
{
  breakpoints: {
    values: {
      xs: 0, //320, //0,
      sm: 640,//768,//544, //600,
      md: 992,//768, //960,
      lg: 1080,//992, //1280,
      xl: 1200, //1920,
    }
  },
  palette: {
    primary: { main: '#450000bb'}
  },
  typography: {
    h3: { fontFamily: undefined/*, fontSize: undefined*/ },
    h4: { fontFamily: undefined/*, fontSize: undefined */ },
    h6: { fontFamily: undefined/*, fontSize: undefined*/ }
  },
  // overrides: {
  //   MuiOutlinedInput {
  //     '&:hover fieldset': {
  //       borderColor: 'yellow',
  //     },
  //   }
  // }
  // '& .MuiOutlinedInput-root': {
  //   '& fieldset': {
  //     borderColor: 'red',
  //   },
  //   '&:hover fieldset': {
  //     borderColor: 'yellow',
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'green',
  //   },
  // }
  // overrides: {
  //   MuiInput: {
  //     // underline: {
  //     //   '&:hover:not($disabled):before': {
  //     //     //backgroundColor: theme.palette.input.bottomLine,
  //     //     height: 1
  //     //   }
  //     // }
  //     // '&:hover': {
  //     //   border: `1px solid ${theme.palette.primary.main}`,
  //     //   outline: `1px solid ${theme.palette.primary.main}`,
  //     // }
  //   }
  // }
});


//const WrappedApp: React.FC<AppProps> = ({Component, pageProps}) =>
function WrappedApp({Component, pageProps}: AppProps)//: React.FC<AppProps>
{
  const store: any = useStore();
  
  return (
      <PersistGate
        persistor={store.__persistor} 
        loading={<div>Loading...</div>}
      >
        <ThemeProvider theme={theme}>
          <ApolloProvider>
            <Component {...pageProps}/>
          </ApolloProvider>
        </ThemeProvider>
      </PersistGate>
  );
}


WrappedApp.getInitialProps = async ({Component, ctx}: AppContext) => 
{
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  }

  return { pageProps };
}


export default wrapper.withRedux(WrappedApp);


// WrappedApp.getInitialProps = async ({Component, ctx}: AppContext) => 
// {
//   //const { Component, ctx } = appContext;

//   // let pageProps = {};
//   // if (Component.getInitialProps) 
//   // {
//   //   pageProps = await Component.getInitialProps(ctx);
//   // }

//   // const pageProps = Component.getInitialProps
//   //   ? await Component.getInitialProps(ctx)
//   //   : {};

//   const pageProps = {
//     ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//   }

//   //let { store, req, isServer } = ctx;

//   // if (ctx.req) {
//   //   console.log(ctx.req)
//   //   //@ts-ignore
//   //   //ctx.store.dispatch(END);
//   //   //@ts-ignore
//   //   //await (ctx.store as SagaStore).sagaTask.toPromise();
//   // }
  
//   return { pageProps };
// }


// class WrappedApp extends App 
// {
//   static async getInitialProps({ Component, ctx }: AppContext) 
//   {
//     const pageProps = Component.getInitialProps
//       ? await Component.getInitialProps(ctx)
//       : {};
 
//     return { pageProps };
//   }
 
//   render() 
//   {
//     const { Component, pageProps, store } = this.props as any;// as Readonly<typeof this.props & SagaStore>;
 
//     return (
//       <Provider store={store}>
//         <PersistGate persistor={store.__persistor} loading={null}>
//           <ThemeProvider theme={theme}>
//             <ApolloProvider>
//               <Component {...pageProps} />
//             </ApolloProvider>
//           </ThemeProvider>
//         </PersistGate>
//       </Provider>
//     );
//   }
// }


//export default wrapper.withRedux(WrappedApp);
//export default withRedux(make_store)(WrappedApp);

// WrappedApp.getServerSideProps = async ({Component, ctx}: AppContext) => 
// {
//   //const { Component, ctx } = appContext;

//   let pageProps = {};
//   if (Component.getServerSideProps) 
//   {
//     pageProps = await Component.getServerSideProps(ctx);
//   }

//   return { pageProps };
// }

// export const getServerSideProps = wrapper.getServerSideProps(
//   store => async () =>
//   {
//     // regular stuff
//     store.dispatch(ApplicationSlice.actions.updateConfiguration());
//     // end the saga
//     store.dispatch(END);
//     await store.sagaTask.toPromise();
//   }
// );


// class WrappedApp extends App<AppInitialProps> 
// {
//   public static getInitialProps = async ({Component, ctx}: AppContext) => 
//   {
//       // 1. Wait for all page actions to dispatch
//       const pageProps = {
//         ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//       }

//       // 2. Stop the saga if on server
//       if (ctx.req) 
//       {
//         console.log(ctx)
//         /*//@ts-ignore
//         ctx.store.dispatch(END);
//         //@ts-ignore
//         await (ctx.store as SagaStore).sagaTask.toPromise();*/
//       }

//       // 3. Return props
//       return { pageProps }
//   }

//   public render() 
//   {
//     const {Component, pageProps} = this.props;

//     return (
//       <ThemeProvider theme={theme}>
//         <ApolloProvider>
//           <Component {...pageProps} />
//         </ApolloProvider>
//       </ThemeProvider>
//     )
//       // const {Component, pageProps} = this.props;
//       // return <Component {...pageProps} />;
//   }
// }

// export default wrapper.withRedux(WrappedApp);



// import React from 'react';
// import App, {AppInitialProps, /*AppContext*/ } from 'next/app';
// import { END } from 'redux-saga';
// import { SagaStore, wrapper } from '../store';
// import {Store} from "redux";
// import { NextPageContext } from 'next';

// export interface AppPageContext extends NextPageContext 
// {
//   store: Store;
//   isServer: boolean;
// }

// class WrappedApp extends App<AppInitialProps> 
// {
//     public static getInitialProps = async ({Component, ctx}: AppContext) => {
        
//         // 1. Wait for all page actions to dispatch
//         const pageProps = {
//             ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//         };

//         // 2. Stop the saga if on server
//         if (ctx.req) 
//         {
//           ctx.store.dispatch(END);
//           await (ctx.store as SagaStore).sagaTask.toPromise();
//         }

//         // 3. Return props
//         return {
//             pageProps,
//         };
//     };

//     public render() 
//     {
//         const {Component, pageProps} = this.props;

//         return (
//           <ThemeProvider theme={theme}>
//             <ApolloProvider>
//                 <Component {...pageProps} />
//             </ApolloProvider>
//           </ThemeProvider>
//         )
//     }
// }

// export default wrapper.withRedux(WrappedApp);
