import {
    ApolloClient,
    InMemoryCache,
    createHttpLink, 
    split
    //ApolloProvider as Provider,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { URL } from '../utils/constants';
import { get_token_from_cookie } from "../utils/token";
// import { createUploadLink } from 'apollo-upload-client';
//import { HTTP_LINK, WS_LINK } from "../constants/links";
  
  
  //const host = window.location.host;
  
let http_link = createHttpLink(
{
    uri: URL.HTTP_LINK,
    credentials: 'include'
    //uri: '/graphql'
});

// const upload_link = createUploadLink({ uri: URL.HTTP_LINK });
  
const auth_link = setContext((_, { headers }) => 
{
    //const token = localStorage.getItem('token');
    const token = get_token_from_cookie();
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
});
  
http_link = auth_link.concat(http_link);
  
const ws_link = typeof window !== 'undefined' ? new WebSocketLink(
{
    uri: URL.WS_LINK,
    //uri: `ws://${host}/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${get_token_from_cookie()/*localStorage.getItem('token')*/}`
        },
    }
}) : null;
  
const split_link = typeof window !== 'undefined' ?  split(
  
    ({ query }) => 
    {
        const definition = getMainDefinition(query);
    
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    //@ts-ignore
    ws_link,
    http_link,
) : http_link;
    
const client = new ApolloClient(
{
    link: split_link,
    cache: new InMemoryCache()
});

/*const ApolloProvider = (props: any) =>
{
  return <Provider client={client} {...props}/>
}


export default ApolloProvider;*/

export default client;