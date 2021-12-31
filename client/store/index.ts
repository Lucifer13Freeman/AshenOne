import { createStore, applyMiddleware, Store, compose } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { root_reducer, RootState } from '../store/reducers';
//import reducer, { State } from './reducer';
import root_saga from '../saga';
import storage from 'redux-persist/lib/storage';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
//import { composeWithDevTools } from 'redux-devtools-extension';


export interface SagaStore extends Store 
{
    __persistor: Persistor;
    saga_task?: Task;
}

const bind_middleware = (middleware: any) =>
{
    if (process.env.NODE_ENV !== 'production') 
    {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware)
}

export const make_store = (context: Context) => 
{
    let store: SagaStore;
    //1: Create the middleware
    const saga_middleware = createSagaMiddleware();

    const is_client = typeof window !== 'undefined';

    if (is_client) 
    {
        const persist_config = {
            key: 'root',
            storage,
            // whitelist: ['auth']
        }
        
        const persisted_reducer = persistReducer(persist_config, root_reducer);
        
        // 2: Add an extra parameter for applying middleware with persisted reducer:
        store = createStore(persisted_reducer, 
                                bind_middleware([saga_middleware]));
        
        store.__persistor = persistStore(store);
    }   // 2: Add an extra parameter for applying middleware:
    else store = createStore(root_reducer, 
                            bind_middleware([saga_middleware]));

    // 3: Run sagas on server
    store.saga_task = saga_middleware.run(root_saga);

    //4: now return the store:
    return store;
};

export const wrapper = createWrapper<Store<RootState>>(make_store, {debug: true});

// const saga_middleware = createSagaMiddleware();

// const store = createStore(
//     reducer,
//     undefined,
//     applyMiddleware(createSagaMiddleware())
// );

// saga_middleware.run(root_saga);

//export default store;

// const store = createStore(
//     reducer,
//     undefined,
//     applyMiddleware(saga_middleware)
// );

// saga_middleware.run(root_saga);

// export default store;


// const init_store = (initial_state: any) => 
// {
//     const store = createStore(
//       reducer,
//       initial_state,
//       applyMiddleware(saga_middleware)
//     );

//     (store as SagaStore).saga_task = saga_middleware.run(root_saga);
   
//     saga_middleware.run(root_saga);
   
//     return store;
// };
   
//export default init_store;

//export const wrapper = createWrapper<Store<RootState>>(init_store, {debug: true});
//export const wrapper = createWrapper<Store<RootState>>(make_store, {debug: true});

//export type NextSagaDispatch = SagaDispatch<RootState, void, AnyAction>;



// const composeEnhancer = typeof window == 'object' &&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
// process.env.NODE_ENV !== "production" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})  : compose;

// const compose_enhancer = (apply_middleware: Function) =>
// {
//     if (typeof window === 'object' 
//         && process.env.NODE_ENV !== "production") 
//         return composeWithDevTools(apply_middleware);
//     else return apply_middleware;
// }

// const makeConfiguredStore = (reducer: any) =>
//     createStore(reducer, undefined, applyMiddleware(logger));


    // 1: Create the middleware
    // const saga_middleware = createSagaMiddleware();

    // // 2: Add an extra parameter for applying middleware:
    // const store = createStore(reducer, /*undefined,*/ 
    //             bind_middleware([saga_middleware]));
    //     //compose_enhancer(applyMiddleware(saga_middleware)));

    // // 3: Run your sagas on server
    // (store as SagaStore).saga_task = saga_middleware.run(root_saga);

    // // 4: now return the store:
    // return store;
//}

// import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
// import { AnyAction, applyMiddleware, createStore, Store } from "redux";
// import { RootState, reducer } from "./reducers";
// import thunk, { ThunkDispatch } from "redux-thunk";


// const makeStore: MakeStore<Store<RootState>> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

// export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

