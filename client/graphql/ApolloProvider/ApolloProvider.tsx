import { ApolloProvider as Provider } from "@apollo/client";
import client from "../apollo-client";


const ApolloProvider = (props: any) =>
{
  return <Provider client={client} {...props}/>
}


export default ApolloProvider;