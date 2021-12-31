import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/config/config.module';
import db_config from './../config/configs/database.config';
import { DBConfigService } from 'src/config/db-config.service';
import { GraphQLModule } from '@nestjs/graphql';
// import { Upload } from './scalars/file.scalar';


@Module(
{
    imports: [
        //ConfigModule.forFeature(db_config),
        GraphQLModule.forRootAsync(
        {
            useFactory: async () => (
            {
                playground: true,
                autoSchemaFile: 'schema.gql',
                installSubscriptionHandlers: true,
                uploads: false, //{
                //     maxFileSize: 100000000, // 100 MB
                //     maxFiles: 10
                // },
                subscriptions: {
                    //keepAlive: 5000
                    /*onConnect: (connection_params: any) => {
                        return { headers: connection_params };
                    },*/
                    //'graphql-ws': true,
                    keepAlive: 5000,
                    onConnect: (connectionParams, websocket, context) => 
                    {
                        //console.log(`connectionParams: ${connectionParams}, websocket: ${JSON.stringify(websocket)}}, context ${JSON.stringify(context)}`);
                        //console.log(connectionParams)
                        //console.log(websocket)
                        //console.log(context)
                        //console.log(connectionParams['Authorization'])
                        // return { headers: {
                        //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGI5YTNlZGUwZTUyMGFjOGM0MDRhMCIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTYyODg5NDU4NCwiZXhwIjoxNjI4OTgwOTg0fQ.CXs4LXcnyXstYejWuSeCA2Zq0RV_eksU0Wq8BZCAkQA"
                        // } }
        
                        //let token: string;
        
                        // if (context.req && context.req.headers.authorization)
                        // {
                        //     token = context.req.headers.authorization.split('Bearer ')[1];
                        // }
                        // else if (context.connection && context.connection.context.Authorization)
                        // {
                        //    token = connectionParams['Authorization'].split('Bearer ')[1];
                        //}
        
                        // context.request.headers = connectionParams['Authorization']// token
        
                        // context.context.token = token;
                    },
                    onDisconnect: (websocket, context) => 
                    {
                        //console.log(`websocket: ${JSON.stringify(websocket)}}, context ${JSON.stringify(context)}`);
                    }
                },
                //context: ({ req, connection }) => ({ req: req || connection?.context })
                //context: ({ req, connection }) => ({ req, connection })
                //context: ({ req }) => ({ headers: req.headers }),
                // context: ({ req, connection }) => {
                //     //console.log(req)
                //     //console.log(connection)
                //     return { req, connection }}
                //context: ({ req }) => ({ req })
                context: ({ req, res, connection }) => ({ req, res, connection }),
                // context: (context) => 
                // {
                //     let token: string;
        
                //     if (context.req && context.req.headers.authorization)
                //     {
                //         token = context.req.headers.authorization.split('Bearer ')[1];
                //     }
                //     else if (context.connection && context.connection.context.Authorization)
                //     {
                //         token = context.connection.context.Authorization.split('Bearer ')[1];
                //     }
        
                //     context.token = token
        
                //     //console.log(context.token)
        
                //     return context;
                // },
                cors: { origin: true, credentials: true }
            })
        })
    ],
    // providers: [Upload]
})
export class GQLModule {}