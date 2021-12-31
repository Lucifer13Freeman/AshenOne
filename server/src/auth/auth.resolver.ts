import { Res, UseGuards } from '@nestjs/common';
import { Args, Context, GqlExecutionContext, GraphQLExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql';
import express from 'express';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
//import { ResGql } from 'src/decorators/response.decorator';
import { UserType } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import { LoginType } from './dto/login.dto';
import { LoginUserInput } from './inputs/login.input';
import { RegisterUserInput } from './inputs/register.input';
//import { Request } from 'express';


@Resolver()
export class AuthResolver 
{
    constructor(private auth_service: AuthService
                /*private user_service: UserService*/) {}

    

    @Mutation(() => /*UserType*/ LoginType)
    async login(@Args('input') input: LoginUserInput,
                @Context("req") req: express.Request)
                //@ResGql() res: Response,)
                //@Context() context: GraphQLExecutionContext) 
                //@Res() response: Response) 
    {
        try
        {
            //const cookie = this.auth_service.get_cookieWithJwtToken(user.id);
            //const res = await this.auth_service.login(input);

            //response.setHeader('Set-Cookie', res.cookie);
            //const ctx = GqlExecutionContext.create(context);

            // let { res } = context.getContext();

            const login = await this.auth_service.login(input);
            //context.res.cookie('some-cookie', 'some-value');
            //context.res.header('some-header', 'some-header');

           // const { res } = context;

            //res.cookie('token', login.token, { httpOnly: true });

            req.res?.cookie('token', login.token, 
            {
                //httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
                //secure: true, //on HTTPS
                //domain: 'example.com', //set your domain
            });
            
            //console.log(req.cookies)

            //console.log(req.res);

            return login;//await this.auth_service.login(input);
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }

    @Mutation(() => UserType)
    async register(@Args('input') input: RegisterUserInput) 
    {   
        try
        {
            return await this.auth_service.register(input);
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}