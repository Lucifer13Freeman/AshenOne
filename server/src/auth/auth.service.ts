import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
// import { Model } from 'mongoose';
//import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginType } from './dto/login.dto';
import * as argon2 from "argon2";
import { UserType } from 'src/user/dto/user.dto';
import { LoginUserInput } from './inputs/login.input';
import { RegisterUserInput } from './inputs/register.input';
// import { IUser } from 'src/user/interfaces/user.interface';
import { AppConfigService } from 'src/config/app-config.service';
import { User } from '@prisma/client';
import { REGEXP } from 'src/config/configs/consts.config';


@Injectable()
export class AuthService 
{
    constructor(/*@InjectModel(User.name)  
                private user_model: Model<UserDocument>,*/
                //private config_service: AppConfigService,
                private user_service: UserService,
                private jwt_service: JwtService) {}


    async login(dto: LoginUserInput): Promise<LoginType> //: Promise<User | undefined>//
    {
        let errors: any = {
            email: undefined,
            password: undefined,
            is_banned: undefined
        };

        try
        {
            const { email, password } = dto;

            if (email.trim() === '') errors.email = 'Email must not be empty!';
            if (password === '') errors.password = 'Password must not be empty!';

            //const user = await this.user_model.findOne({ email: email });

            //const user = await this.user_service.find_by_email(email);

            for (let value of Object.values(errors)) 
                if (value !== undefined) 
                    throw new UserInputError('Bad input', { errors });

            let user = await this.user_service.get({ email: email, is_for_login: true });

            // if (!user) 
            // {
            //     errors.email = 'User not found';
            //     throw new UserInputError('User not found', { errors });
            // }


            if (user.is_banned) errors.is_banned = 'You banned!';
                 
            
            const is_match = await argon2.verify(user.password, password);

            if (!is_match) errors.password = 'Password is incorrect!';


            for (let value of Object.values(errors)) 
                if (value !== undefined) 
                    throw new UserInputError('Bad input', { errors });


            const payload = {
                //id: user._id,
                id: user.id,
                username: user.username,
                role: user.role,
                is_banned: user.is_banned
                //email: user.email
            };

            const token = this.jwt_service.sign(payload);

            //const token = this.generate_token(payload);

            const cookie = await this.get_cookie_with_jwt_token(token);

            return {
                //...user.toJSON(),
                user: {
                    ...user,
                    password: undefined
                },
                // user: {
                //     ...user.toJSON(),
                //     password: undefined
                // },
                token: token,
                cookie: cookie
            }
        }
        catch (err)
        {
            console.error(err);
            throw err;
        }
    }

    async register(dto: RegisterUserInput): Promise<UserType> 
    {
        let errors: any = {
            username: undefined,
            email: undefined,
            password: undefined,
            confirm_password: undefined
        };

        try 
        {
            const { username,
                    email,
                    password,
                    confirm_password } = dto;

            if (username.trim() === '') errors.username = 'Name must not be empty!';
            if (email.trim() === '') errors.email = 'Email must not be empty!';
            if (password.trim() === '') errors.password = 'Password must not be empty!';
            if (confirm_password.trim() === '') errors.confirm_password = 'Repeat password must not be empty!';
                
            for (let value of Object.values(errors)) 
                if (value !== undefined) 
                    throw errors;
                    
            //const is_email_exists = await this.user_model.findOne({ email: email });
            const is_email_exists = await this.user_service.get({ email: email, is_for_regist: true });
            if (is_email_exists) errors.email = 'User with this email is already exists!';
            
            //const expression: RegExp = ///^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/ ///^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; ///^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            
            const email_regexp: RegExp = new RegExp(REGEXP.EMAIL); ///^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            
            const is_valid_email = email_regexp.test(email);
            if (!is_valid_email) errors.email = 'Invalid email!';

            if (password !== confirm_password) errors.confirm_password = 'Passwords must match!';


            for (let value of Object.values(errors)) 
                if (value !== undefined) 
                    throw errors;
                

            const hash: string = await argon2.hash(password);

            /*const user = await this.user_model.create(
            {
                username,
                email,
                password: hash
            });*/

            const user = await this.user_service.create(
            {
                username,
                email,
                password: hash
            })
            
            return user;
        } 
        catch (err) 
        {
            console.error(err);
            throw new UserInputError('Bad input', { errors });
        }
    }

    /*validate_token(token: string) 
    {
        try 
        {
            this.jwt_service.verify(token);
            return true;
        } 
        catch (err) 
        {
            return err.name;
        }
    }*/

    /*generate_token(payload: any) 
    {
        return this.jwt_service.sign(payload);
        //`Authentication=${token}; HttpOnly; Path=/; Max-Age=3600`;
    }*/

    async get_cookie_with_jwt_token(token: string)
    {
        //return `token=${token}; HttpOnly; Path=/; Max-Age=${3600*24}`;
        return `token=${token}; Path=/; Max-Age=${3600*24}`;
    }

    public get_cookie_for_logout() 
    {
        //return `token=; HttpOnly; Path=/; Max-Age=0`;
        return `token=; Path=/; Max-Age=0`;
    }
}