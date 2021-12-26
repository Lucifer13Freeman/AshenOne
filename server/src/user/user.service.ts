// import { Connection, Model, ObjectId } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';
//import { User, UserDocument } from './schemas/user.schema';
//import { UserType } from './dto/user.dto';
import { FileService } from 'src/file/file.service';
import { RegisterUserInput } from '../auth/inputs/register.input';
import * as argon2 from "argon2";
import { UserInputError } from 'apollo-server-errors';
import { GetUserInput } from './inputs/get-user.input';
import { GetAllUsersInput } from './inputs/get-all-users.input';
import { SearchUserInput } from './inputs/search-user.input';
import { CreateUserInput } from './inputs/create-user.input';
// import { IUser } from './interfaces/user.interface';
//import { User } from './entity/user.entity';
import { FileType, PROVIDERS, REGEXP, ROLES } from 'src/config/configs/consts.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaPromise, Role, User } from '.prisma/client';
import { select_user } from './selects/user.select';
import { UpdateUserInput } from './inputs/update-user.input';
import path from 'path';
import fs from 'fs';
//import { MongoRepository } from 'typeorm';


/*interface IUserServiceErrors
{
    id: undefined | string,
    username: undefined | string,
    email: undefined | string,
    password: undefined | string,
    confirm_password: undefined | string
}*/

/*let errors: IUserServiceErrors = {
    id: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    confirm_password: undefined
};*/


@Injectable()
export class UserService 
{
    constructor(private prisma: PrismaService,
                //@InjectConnection() 
                //private connection: Connection,
                //@InjectModel(User.name) 
                //private user_model: Model<UserDocument>,
                //@Inject(PROVIDERS.USER_REPOSITORY)
                //private readonly user_repository: MongoRepository<User>,
                private file_service: FileService) {}


    async create(dto: CreateUserInput): Promise<User /*UserDocument*//*IUser*/>//: Promise<User> 
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { username, email, password } = dto;

            // const create_user = await this.prisma.user.create(
            // {
            //     data: {
            //         username: username,
            //         email: email,
            //         password: password
            //     },
            //     select: this.select
            // });

            //const user = await this.prisma.$transaction([create_user])[0];

            const user = await this.prisma.$transaction(async (prisma) =>
            {
                const create_user = await prisma.user.create(
                {
                    data: {
                        username: username,
                        email: email,
                        password: password
                    },
                    select: select_user,
                });

                return create_user;
            });

            return user;

            //const user = await this.user_repository.create(
            // const user = await this.user_model.create(
            // [{
            //     username: username,
            //     email: email,
            //     password: password
            // }], { session });
                
            //return user;

            //await session.commitTransaction();
            //return user[0]; //await this.get({ id: user[0]._id });
            //return await this.get({ id: user.id });
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     //session.endSession();
        // }
    }


    async get(dto: GetUserInput): Promise<User/*Document*/ | null> //: Promise<UserDocument | null>//: Promise<User | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            let errors: any = {
                user_id: undefined
            };

            const { id, current_user_id, email, is_for_login, is_for_regist } = dto;

            //let user: User; //UserDocument;
            //let get_user: Prisma.Prisma__UserClient<User>; //: //User | Prisma.Prisma__UserClient<User> | PrismaPromise<Prisma.Prisma__UserClient<User> | User>
            const select = is_for_login ? { ...select_user, password: true } : select_user;

            const user = await this.prisma.$transaction(async (prisma) => 
            {
                let get_user;//: User | Prisma.Prisma__UserClient<User>;//: Prisma.Prisma__UserClient<User>;

                if (id)
                { 
                    //user = await this.user_model.findById(id).session(session);
                    //user = await this.user_repository.findOne(id);

                    get_user = await prisma.user.findUnique(
                    {
                        where: { id }, select
                    })
                }
                else if (email && !id) 
                {
                    get_user = await prisma.user.findUnique(
                    {
                        where: { email: email }, select
                    })

                    // is_for_auth ? user = await this.user_model.findOne({ email })
                    //                                             .select('+password')
                    //                                             .session(session)
                    //             : user = await this.user_model.findOne({ email }).session(session);
                }

                //user = await this.prisma.$transaction([get_user])[0]

                if (!is_for_regist && !get_user) 
                {
                    errors.user_id = 'User not found!';
                    throw new UserInputError('User not found!', { errors });
                } 

                if (current_user_id && id !== current_user_id)
                {
                    errors.user_id = 'It is not your account!';
                    throw new UserInputError('It is not your account!', { errors });
                }
                
                return get_user;
            });

            //await session.commitTransaction();
            return user;

            /*if (dto.id)
            {
                const { id } = dto;
                const user = await this.user_model.findById(id);
                return user;
            }
            else if (dto.email)
            {
                const { email } = dto;
                const user = await this.user_model.findOne({ email: email });
                return user;
            }*/

            //else return null;

            /*let errors: any = {
                id: undefined
            };*/
            

            /*if (!user) errors.id = 'User not found';

            for (let value of Object.values(errors)) 
                    if (value !== undefined) 
                        throw new UserInputError('Bad input', { errors });*/

            //user.created_at = user.created_at?.toISOString(),

            /*return user;{
                ...user.toJSON(),
                created_at: user.created_at?.toISOString(),
                //updated_at: user.updated_at?.toISOString()
            }*/
        }
        catch(err)
        {
            //await session.abortTransaction();
            console.error(err);
            //errors.id = 'User not found';
            //throw new UserInputError('Bad input', { errors });
            throw err; //new UserInputError('Bad input', { errors });
        }
        // finally
        // {
        //     //session.endSession();
        // }
    }
    

    async get_all(dto: GetAllUsersInput): Promise<User[]/*Document[]*//*IUser[]*/ | null>//: Promise<User[] | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { limit, offset, user_ids } = dto;

            //let get_all_users: User[] | PrismaPromise<User[]> //: Prisma.Prisma__UserClient<User[]>;
            //let users: User[]; //UserDocument[];//IUser[]; //User[] | PromiseLike<User[]>;

            const users = await this.prisma.$transaction(async (prisma) => 
            {
                let get_all_users;

                if (/*count && */user_ids.length === 0) 
                {
                    get_all_users = await prisma.user.findMany(
                    {
                        skip: offset,
                        take: limit,
                        select: select_user
                    });

                    // users = await this.user_model.find()
                    //                         .skip(Number(offset))
                    //                         .limit(Number(count))
                    //                         .session(session);
                }
                // else if (!count && user_ids.length === 0) 
                // {
                //     get_all_users = await prisma.user.findMany(
                //     {
                //         skip: offset,
                //         select: select_user
                //     });
                    
                    // users = await this.user_model.find()
                    //                         .skip(Number(offset))
                    //                         .session(session);
                //}
                else if (/*count && */user_ids.length > 0)
                {
                    get_all_users = await prisma.user.findMany(
                    { 
                        where: { id: { in: user_ids } },
                        skip: offset,
                        take: limit,
                        select: select_user
                    });

                    // users = await this.user_model.find()
                    //                             .skip(Number(offset))
                    //                             .limit(Number(count))
                    //                             .session(session);
                    // users = users.filter((user: UserDocument) => user_ids.includes(user.id));
                }
                // else if (!count && user_ids.length > 0)
                // {
                //     get_all_users = await prisma.user.findMany(
                //     {
                //         skip: offset,
                //         select: select_user,
                //         where: { id: { in: user_ids } }
                //     });

                //     // users = await this.user_model.find()
                //     //                             .skip(Number(offset))
                //     //                             .session(session);
                //     // users = users.filter((user: UserDocument) => user_ids.includes(user.id));
                // }

                
                //console.log(await this.prisma.user.findMany())

                return get_all_users;
            });

            //users = await this.prisma.$transaction([get_all_users])[0];

            //await session.commitTransaction();
            return users;
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     //session.endSession();
        // }
    }


    async search(dto: SearchUserInput): Promise<User[]/*Document[]*//*IUser[]*/ | null>//: Promise<User[] | null>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            const { username, limit, offset } = dto;
            const search_username = username?.trim();

            // const users = await this.user_model.find(
            // {
            //     username: { $regex: new RegExp(username, 'i')}
            // }).session(session);

            const users = await this.prisma.$transaction(async (prisma) => 
            {
                const search_users = await prisma.user.findMany(
                {
                    where: { username: { contains: search_username, mode: 'insensitive' } },
                    take: limit,
                    skip: offset,
                    select: select_user
                });
                
                return search_users;
            });

            //const users = await this.prisma.$transaction([search_users])[0];

            //await session.commitTransaction();
            return users;
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     //session.endSession();
        // }
    }


    // async set_is_follow(dto: GetUserInput, value: Boolean): Promise<UserDocument | null>
    // {
    //     try 
    //     {
    //         const { id } = dto;

    //         let user = this.get({ id });
            
    //         if ((await user).is_follow !== value)
    //         {
    //             (await user).is_follow = value;
    //             await (await user).save();
    //         }

    //         console.log(user);

    //         return user;
    //     } 
    //     catch (err) 
    //     {
    //         console.log(err);
    //         throw err;
    //     }
    // }

    
    async update(dto: UpdateUserInput): Promise<User/*ObjectId*/>
    {
        let errors: any = {
            username: undefined,
            email: undefined,
            // avatar: undefined,
            password: undefined,
            confirm_password: undefined
        };

        try 
        {
            const { id, current_user_id, username, avatar, email, password, confirm_password } = dto;

            if ((!username || username.trim() === '') && 
                (!email || email.trim() === '') &&
                (!password || password.trim() === '') &&
                (!confirm_password || confirm_password.trim() === ''))
                throw new UserInputError('Nothing to update!');

            await this.get({ id, current_user_id });

            if (password && !confirm_password || confirm_password.trim() === '')
                errors.confirm_password = 'Repeat password must not be empty!';

            const email_regexp: RegExp = new RegExp(REGEXP.EMAIL);
        
            const is_valid_email = email_regexp.test(email);
            if (!is_valid_email) errors.email = 'Invalid email!';
        
            if (password !== confirm_password) errors.confirm_password = 'Passwords must match!';
        
            
            
            // const { filename, mimetype, encoding, createReadStream } = await avatar;
            // console.log(`[${new Date()}] File upload:`, filename, mimetype, encoding)
        
            // const stream = createReadStream();
            // //stream.on("data", (chunk: Buffer) => { /* do stuff with data here */ });

            // //const filename_ = uuid.v4() + '.png';
            // const filepath = path.join(__dirname, `../../static/${FileType.IMAGE}/${filename}`);
            // //path.resolve(__dirname, '..', '..', 'static', FileType.IMAGE);
            // await stream.pipe(fs.createWriteStream(filepath));

            // const file_url = `${FileType.IMAGE}/${filename}`;



            for (let value of Object.values(errors)) 
                if (value !== undefined) 
                    throw errors;
            
            const data = {
                username: username && username.trim() === '' ? username : undefined,
                email: email && email.trim() === '' ? email : undefined,
                password: password && password.trim() === '' ? 
                        await argon2.hash(password) : undefined,
            }

            const user = await this.prisma.$transaction(async (prisma) => 
            {
                const update_user = prisma.user.update(
                {
                    where: { id },
                    data,
                    select: select_user
                });
                
                return update_user;
            });

            return user;
        } 
        catch (err) 
        {
            console.error(err);
            throw new UserInputError('Bad input', { errors });
        }
    }


    async update_avatar(dto: UpdateUserInput, image): Promise<User>
    {
        try 
        {
            const { id, current_user_id} = dto;

            let user = await this.get({ id, current_user_id });

            this.file_service.remove_file(user.avatar);
            const imagepath = this.file_service.create_file(FileType.IMAGE, image);

            user = await this.prisma.$transaction(async (prisma) => 
            {
                const update_user = prisma.user.update(
                {
                    where: { id: current_user_id },
                    data: { avatar: imagepath },
                    select: select_user
                });
                
                return update_user;
            });

            return user;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
    

    async delete(dto: GetUserInput): Promise<string/*ObjectId*/>
    {
        // const session = await this.connection.startSession();
        // session.startTransaction();

        try 
        {
            // let errors: any = {
            //     user_id: undefined
            // };

            const { id, current_user_id, is_for_admin } = dto;
            //const user = await this.user_model.findByIdAndDelete(id).session(session);

            let is_admin: boolean;
            if (is_for_admin) is_admin = await this.check_is_admin({ current_user_id });
            if (!is_admin) await this.get({ id, current_user_id });

            const user = await this.prisma.$transaction(async (prisma) => 
            {
                const delete_user = prisma.user.delete(
                {
                    where: { id }, select: { id: true } //select_user
                });
                
                return delete_user;
            });

            // if (!user) 
            // {
            //     errors.user_id = 'User not found';
            //     throw new UserInputError('User not found', { errors });
            // }

            //this.file_service.remove_file(user.avatar);

            //const user = await this.prisma.$transaction([delete_user])[0];
            //await session.commitTransaction();
            return user.id; //user._id;//`User has been deleted`;
        } 
        catch (err) 
        {
            //await session.abortTransaction();
            console.error(err);
            throw err;
        }
        // finally
        // {
        //     //session.endSession();
        // }
    }


    async ban(dto: GetUserInput): Promise<User | null>
    {
        let errors: any = {
            user_id: undefined,
        };

        try 
        {
            const { id, current_user_id, is_for_admin, is_banned } = dto;

            if (is_for_admin && is_banned !== undefined)
            {
                const is_admin = await this.check_is_admin({ current_user_id });

                if (!is_admin)
                {
                    errors.user_id = 'Access denied!';
                    throw new UserInputError('Access denied!', { errors });
                }

                const user = await this.prisma.$transaction(async (prisma) => 
                {
                    const ban_user = prisma.user.update(
                    {
                        where: { id }, 
                        data: { is_banned },
                        select: select_user
                    });
                            
                    return ban_user;
                }); 
                        
                return user;
            } 
        }
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async check_is_admin(dto: GetUserInput): Promise<boolean>
    {
        try 
        {
            const { id, current_user_id } = dto;

            const check_user = await this.prisma.user.findFirst(
            {
                where: { 
                    id: id ? id : current_user_id,
                    role: ROLES.ADMIN
                }, 
                select: { id: true, role: true }
            });

            return check_user != null;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get_role(dto: GetUserInput): Promise<string>
    {
        try 
        {
            const { id, current_user_id } = dto;

            const user = await this.prisma.$transaction(async (prisma) => 
            {
                const check_user = prisma.user.findUnique(
                {
                    where: { id: id ? id : current_user_id }, 
                    select: { id: true, role: true }
                });
                
                return check_user;
            });

            return user.role;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}