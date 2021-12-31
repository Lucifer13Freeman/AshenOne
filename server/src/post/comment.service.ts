import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';
import { UserInputError } from 'apollo-server-express';
import { PostService } from './post.service';
import { CreateCommentInput } from './inputs/comment/create-comment.input';
import { GetCommentInput } from './inputs/comment/get-comment.input';
import { GetAllCommentsInput } from './inputs/comment/get-all-comments.input';
import { UpdateCommentInput } from './inputs/comment/update-comment.input';
import { SearchCommentInput } from './inputs/comment/search-comment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '.prisma/client';
import { select_comment } from './selects/comment.select';
import { select_comment_like } from './selects/like.select';
import { CommentLike } from '@prisma/client';
import { LikeInput } from './inputs/like/like.input';


@Injectable()
export class CommentService 
{
    constructor(private prisma: PrismaService,
                private post_service: PostService,
                private user_service: UserService,
                private file_service: FileService) {}


    async create(dto: CreateCommentInput): Promise<Comment> 
    {
        try 
        {
            const { current_user_id, 
                    post_id, 
                    text, 
                    image, 
                    audio, 
                    video } = dto;
            
            if ((!text || text.trim() === '') && !image && !audio && !video) 
                throw new UserInputError('Comment is empty!');

            await this.user_service.get({ id: current_user_id });
            await this.post_service.get({ id: post_id });

            const comment = await this.prisma.$transaction(async (prisma) =>
            {
                const create_comment = await prisma.comment.create(
                {
                    data: {
                        user: { connect: { id: current_user_id } },
                        post: { connect: { id: post_id } },
                        text, image, audio, video
                    },
                    select: select_comment
                });
    
                return create_comment;
            });

            return comment;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async get(dto: GetCommentInput): Promise<Comment | null>
    {
        try 
        {
            let errors: any = {
                comment_id: undefined,
                user_id: undefined
            };

            const { id, current_user_id } = dto;

            if (current_user_id) await this.user_service.get({ id: current_user_id });

            const comment = await this.prisma.$transaction(async (prisma) =>
            {
                const get_comment = await prisma.comment.findUnique(
                {
                    where: { id },
                    select: select_comment
                });

                if (!get_comment)
                {
                    errors.comment_id = 'Comment not found!';
                    throw new UserInputError('Comment not found!', { errors });
                }

                if (current_user_id && get_comment.user_id !== current_user_id) 
                {
                    errors.user_id = 'It is not your comment!';
                    throw new UserInputError('It is not your comment!', { errors });
                }

                return get_comment;
            });

            return comment;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }
    

    async get_all(dto: GetAllCommentsInput): Promise<Comment[] | null>
    {
        try 
        {
            const { post_id, current_user_id, limit, offset } = dto;

            let comments: Comment[] | null;

            await this.user_service.get({ id: current_user_id });
            const post = await this.post_service.get({ id: post_id, current_user_id });

            if (post)
            {
                comments = await this.prisma.$transaction(async (prisma) =>
                {
                    const get_all_comments = await prisma.comment.findMany(
                    {
                        //where: { post_id },
                        where: { post: { id: post_id } },
                        skip: offset,
                        take: limit,
                        select: select_comment
                    });

                    return get_all_comments;
                });
            }
            else 
            {
                await this.post_service.delete_all_comments_in_post({ id: post_id, current_user_id });
            }

            return comments;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async search(dto: SearchCommentInput): Promise<Comment[] | null>
    {
        try 
        {
            const { current_user_id, 
                    post_id, 
                    user_id,
                    username, 
                    text,
                    limit,
                    offset } = dto;
            const search_username = username?.trim();
            const search_text = text?.trim();

            const comments = await this.prisma.$transaction(async (prisma) =>
            {
                let search_comments;

                if (user_id)
                {
                    search_comments = await prisma.comment.findMany(
                    {
                        where: { 
                            //post_id, user_id,
                            user: { id: current_user_id },
                            post: { id: post_id },
                            text: { contains: search_text, mode: 'insensitive' }
                        },
                        skip: offset,
                        take: limit,
                        select: select_comment
                    });
                }
                else
                {
                    if (username) search_comments = await prisma.comment.findMany(
                    {
                        where: { 
                            //post_id,
                            post: { id: post_id },
                            user: { username: { contains: search_username, mode: 'insensitive' } },
                            text: { contains: search_text, mode: 'insensitive' }
                        },
                        skip: offset,
                        take: limit,
                        select: select_comment
                    });
                    else search_comments = await prisma.comment.findMany(
                    {
                        where: { 
                            //post_id,
                            post: { id: post_id },
                            text: { contains: search_text, mode: 'insensitive' }
                        },
                        skip: offset,
                        take: limit,
                        select: select_comment
                    });
                }

                return search_comments;
            });
            
            return comments;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async update(dto: UpdateCommentInput): Promise<Comment | null>
    {
        try 
        {
            const { current_user_id, 
                    comment_id, 
                    text, 
                    image, 
                    audio, 
                    video } = dto;

            if ((!text || text.trim() === '') && !image && !audio && !video) 
                throw new UserInputError('Nothing to update!');

            await this.get({ id: comment_id, current_user_id });

            const data = {
                text: text ? text : undefined,
                image: image ? image : undefined,
                audio: audio ? audio : undefined,
                video: video ? video : undefined
            };

            const comment =  await this.prisma.$transaction(async (prisma) => 
            {
                const update_comment = await prisma.comment.update(
                {
                    where: { id: comment_id },
                    data,
                    select: select_comment
                });

                return update_comment;
            });

            return comment;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }

    async like(dto: LikeInput): Promise<CommentLike | null>
    {
        try 
        {
            const { current_user_id, comment_id } = dto;

            await this.user_service.get({ id: current_user_id });
            await this.get({ id: comment_id });

            const like_comment = await this.prisma.$transaction(async (prisma) =>
            {
                let like = await prisma.commentLike.findFirst(
                {
                    where: {
                        user_id: current_user_id,
                        comment_id
                    },
                    select: select_comment_like
                });

                if (like)
                {
                    like = await prisma.commentLike.delete(
                    {
                        where: { id: like.id },
                        select: select_comment_like
                    });
                }
                else
                {
                    like = await prisma.commentLike.create(
                    {
                        data: {
                            user: { connect: { id: current_user_id } },
                            comment: { connect: { id: comment_id } }
                        },
                        select: select_comment_like
                    });
                }

                return like;
            });

            return like_comment;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }


    async delete(dto: GetCommentInput): Promise<string | null>
    {
        try 
        {
            const { id, current_user_id } = dto;

            await this.get({ id, current_user_id });

            const comment = await this.prisma.$transaction(async (prisma) =>
            {
                const delete_comment = await prisma.comment.delete(
                {
                    where: { id }, select: { id: true }
                });

                return delete_comment;
            });

            return comment.id;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    }
}