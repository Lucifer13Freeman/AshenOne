import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserType } from './dto/user.dto';
import { RegisterUserInput } from '../auth/inputs/register.input';
import { UserService } from './user.service';
import { GetUserInput } from './inputs/get-user.input';
import { GetAllUsersInput } from './inputs/get-all-users.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SearchUserInput } from './inputs/search-user.input';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { UpdateUserInput } from './inputs/update-user.input';
import { createReadStream, createWriteStream } from 'fs';
import { GraphQLUpload, FileUpload } from "graphql-upload";


@UseGuards(GqlAuthGuard)
@Resolver()
export class UserResolver 
{
    constructor(private readonly user_service: UserService) {}

    /*@Mutation(() => UserType)
    async register(@Args('input') input: RegisterUserInput) 
    {
        return await this.user_service.create(input);
    }*/

    //@UseGuards(GqlAuthGuard)
    @Query(() => UserType, { nullable: true })
    async get_user(@Args('input') input: GetUserInput) 
    {
        try
        {
            return await this.user_service.get(input);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    //@UseGuards(GqlAuthGuard)
    @Query(() => [UserType], { nullable: true })
    async get_all_users(@Args('input') input: GetAllUsersInput)
                        //@Cookies() cookies: any)
                        //@Token() token: string) 
    {
        try
        {
            //console.log(cookies)
            return await this.user_service.get_all(input);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    //@UseGuards(GqlAuthGuard)
    @Query(() => [UserType], { nullable: true })
    async search_users(@Args('input') input: SearchUserInput) 
    {
        try
        {
            return await this.user_service.search(input);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    @Mutation(() => UserType)
    async update_user(@GqlCurrentUser() user: GetUserInput, 
                        @Args('input') input: UpdateUserInput)
                        //@Args({ name: 'file', type: () => GraphQLUpload }) file: Promise<FileUpload>)
    {
        try 
        {
            // const { filename, mimetype, encoding, createReadStream } = await file
            // console.log(`[${new Date()}] File upload:`, filename, mimetype, encoding)

            // const stream = createReadStream()
            // stream.on("data", (chunk: Buffer) => { /* do stuff with data here */ });

            return await this.user_service.update({ ...input,
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }

    // @Mutation(() => Boolean)
    // async upload_file(@Args({ name: 'file', type: () => GraphQLUpload }) 
    //                         file: Promise<FileUpload>)
    // {
    //     const { filename, mimetype, encoding, createReadStream } = await file
    //     console.log(`[${new Date()}] File upload:`, filename, mimetype, encoding)

    //     const stream = createReadStream()
    //     stream.on("data", (chunk: Buffer) => { /* do stuff with data here */ });
    // }

    // @Mutation('uploadImages')
    // async uploadFile(@Args('images', { type: () => GraphQLUpload }) imgs: Promise<FileUpload>[]):  Promise<Promise<string>[]> 
    // {
    //     return await Promise.all(

    //         imgs.map(async (img: Promise<FileUpload>) : Promise<Promise<string>> =>
    //         {
    //             const { filename, mimetype, encoding, createReadStream } = await img;

    //             console.log("attachment:", filename, mimetype, encoding)

    //             const stream = createReadStream();

    //             return new Promise((resolve,reject) =>
    //             {
    //                 stream.on('end', () => { console.log("ReadStream Ended") })
    //                 .on('close', () => { console.log("ReadStream Closed") })
    //                 .on('error', (err: any) => { console.error("ReadStream Error",err) })
    //                 .pipe(createWriteStream(`./upload/${filename}`))
    //                 .on('end', () => {
    //                     console.log("WriteStream Ended");
    //                     resolve("end")
    //                 })
    //                 .on('close', () => {
    //                     console.log("WriteStream Closed");
    //                     resolve("close")
    //                 })
    //                 .on('error',(err: any) => {
    //                     console.log("WriteStream Error",err);
    //                     reject("error")
    //                 });
    //             });
    //         })
    //     )
    // }

    
    //@UseGuards(GqlAuthGuard)
    //@CurrentUser(GqlAuthGuard)
    @Mutation(() => String)
    async delete_user(@GqlCurrentUser() user: GetUserInput, 
                        @Args('input') input: GetUserInput) 
    {
        try 
        {
            return await this.user_service.delete({ ...input,
                                                    current_user_id: user.id });
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    //@UseGuards(GqlAuthGuard)
    @Query(() => UserType)
    async get_current_user(@GqlCurrentUser() input: GetUserInput /*user: UserType*/ ) 
    {
        try 
        {
            //return await this.user_service.find_by_email(user.email);
            return await this.user_service.get(input);
        } 
        catch (err) 
        {
            console.log(err);
            throw err;
        }
    }

    /*@Query(() => UserType)
    @UseGuards(GqlAuthGuard)
    async CurrentUser(@CurrentUser() user: UserType) {
      try {
        return await this.user_service.find_by_email(user.email);
      } catch (err) {
        console.error(err);
      }
    }*/
}