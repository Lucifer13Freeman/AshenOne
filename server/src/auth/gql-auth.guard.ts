import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt')// implements CanActivate
{
    /*constructor(private readonly auth_service: AuthService)
                //private jwt_service: JwtService)
                ///*private reflector: Reflector)
    /*{
        super();
    }*/
    
    /*handleRequest(err, user, info) 
    {
        // You can throw an exception based onx either "info" or "err" arguments
        if (err || !user) throw err || new UnauthorizedException();

        return user;
    }*/

    /*canActivate(context: ExecutionContext) 
    {
        const ctx = GqlExecutionContext.create(context);
        let { req/*, connection*/ //} = ctx.getContext();

        /*let token;

        if (req && req.headers.authorization)
        {
            token = req.headers.authorization.split('Bearer ')[1];
        }
        else if (connection && connection.context.Authorization)
        {
            token = connection.context.Authorization.split('Bearer ')[1];
        }*/

        //if (token) this.jwt_service.verify(token)//, process.env.JWT_SECRET, 
        /*(err: any, decoded_token: any) =>
        {
            req.user = decoded_token;
        });*/
        
        //context.pubsub = pubsub;

        //return { req, connection }

        //return super.canActivate(new ExecutionContextHost([req, connection]));


    
        //Subscription requests don't have context, so check the token for header
        /*if (typeof req === 'undefined') 
        {
            //let token = context.switchToWs().getData().//Authorization.split('Bearer ')[1]//context.req.headers.authorization.split('Bearer ')[1];
            const token = context.switchToWs().getData().token;
        
            if (!token) 
            {
                throw new BadRequestException('Authentication token not found.');
            }
        
            //build request context so that it can be read by super.canActivate
            const auth_header = 
            {
                authorization: token,
            };

            req = { headers: auth_header };
        }
    
        return super.canActivate(new ExecutionContextHost([req]));
    }*/

    /*getRequest(context: ExecutionContext) 
    {
        const ctx = GqlExecutionContext.create(context);

        const { req, connection } = ctx.getContext();

        return connection && connection.context && connection.context.headers
                ? connection.context
                : req;
        //return ctx.getContext().req;
    }*/

    /*getRequest(context: ExecutionContext)
    {
        const ctx = GqlExecutionContext.create(context);
        const { req/*, res, connection } = ctx.getContext();

        //console.log(req.headers.authorization)
        //console.log(res)
        //console.log(connection)
        //console.log(req.user)

        return req;
    }*/

    getRequest(context: ExecutionContext) 
    {
        const ctx = GqlExecutionContext.create(context);
        // const http_ctx = 
        return ctx.getContext().req;
    }

    // canActivate(context: ExecutionContext) 
    // {
    //     const ctx = GqlExecutionContext.create(context);
    //     let { req, res, connection } = ctx.getContext();

    //     //const request = ctx.getContext().request;

    //     let auth_header;

    //     let token = req?.headers.authorization;

    //     res.cookie('token', token, 
    //     {
    //         httpOnly: true,
    //         maxAge: 1000 * 60 * 60 * 24
    //         //secure: true, //on HTTPS
    //         //domain: 'example.com', //set your domain
    //     });

    //     console.log(res.cookie.toString())

    //     console.log(req.headers.authorization)
    //     //console.log(connection)
    //     //console.log(req.connection)


    //     //console.log(req.user)

    //     //Subscription requests don't have context, so check the token for header
    //     if (typeof req === 'undefined') 
    //     {
    //         //let token = context.switchToWs().getData().//Authorization.split('Bearer ')[1]//context.req.headers.authorization.split('Bearer ')[1];
    //         const token = context.switchToWs().getData().token;
    //         //console.log(connection)

    //         //console.log(token)

    //         //console.log(context.switchToWs()/*.getData()*/)
            
    //         //console.log(context/*.getArgs()*/)

    //         /*console.log(context.switchToWs().getData().token)
    //         console.log(context.switchToWs().getData().user)
    //         console.log(context.switchToWs().getData().AccessToken)
    //         console.log(context.switchToWs().getData().Authorization)*/
        
    //         if (!token) 
    //         {
    //             throw new BadRequestException('Authentication token not found.');
    //         }
        
    //         //build request context so that it can be read by super.canActivate
    //         const auth_header = 
    //         {
    //             Authorization: token
    //         }
    //         // {
    //         //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGI5YTNlZGUwZTUyMGFjOGM0MDRhMCIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTYyODg5NDU4NCwiZXhwIjoxNjI4OTgwOTg0fQ.CXs4LXcnyXstYejWuSeCA2Zq0RV_eksU0Wq8BZCAkQA"
    //         // }

    //         //console.log(auth_header)

    //         req = { headers: auth_header }
    //     }
    
    //     return super.canActivate(new ExecutionContextHost([req]));
    // }

    /*canActivate(context: ExecutionContext) 
    {
        // Get the header
        const auth_header = context.getArgs()[2].req.headers.authorization as string;
    
        if (!auth_header) 
        {
          throw new BadRequestException('Authorization header not found.');
        }
        const [type, token] = auth_header.split(' ');

        if (type !== 'Bearer') 
        {
          throw new BadRequestException(`Authentication type \'Bearer\' required. Found \'${type}\'`);
        }
        const validationResult = this.auth_service.validate_token(token);

        if (validationResult === true) 
        {
          return true;
        }
        throw new UnauthorizedException(validationResult);
    }*/
}

/*@Injectable()
export class WsAuthGuard implements CanActivate 
{
    constructor(private readonly auth: AuthService) { }

    canActivate(context: ExecutionContext) 
    {
        // Since a GraphQl subscription uses Websockets,
        //     we can't pass any headers. So we pass the token inside the query itself
        const token = context.switchToWs().getData().token;

        if (!token) 
        {
            throw new BadRequestException('Authentication token not found.');
        }

        const validationResult = this.auth.validate_token(token);

        if (validationResult === true) 
        {
            return true;
        }
        throw new UnauthorizedException(validationResult);
    }
}*/