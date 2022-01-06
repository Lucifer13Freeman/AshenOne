import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { UserInputError } from 'apollo-server-errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportType } from './dto/report.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AdminService 
{
    constructor(private prisma: PrismaService,
                private user_service: UserService,
                private file_service: FileService) {}

    async get_statistics_report(current_user_id: string): Promise<ReportType | null>
    {
        try 
        {
            let errors: any = { user_id: undefined };

            const is_admin = await this.user_service.check_is_admin({ current_user_id });

            if (!is_admin)
            {
                errors.user_id = 'Access denied!';
                throw new UserInputError('Access denied!', { errors });
            }
          
            const report: ReportType = await this.prisma.$transaction(async (prisma) => 
            {
                const create_report: ReportType = 
                {
                    total_users: await prisma.user.count(),
                    total_banned_users: await prisma.user.count({ where: { is_banned: true } }),
                    total_messages: await prisma.message.count(),
                    total_reactions: await prisma.reaction.count(),
                    total_posts: await prisma.post.count(),
                    total_post_likes: await prisma.postLike.count(),
                    total_comments: await prisma.comment.count(),
                    total_comment_likes: await prisma.commentLike.count(),
                    total_groups: await prisma.group.count(),
                    total_subscriptions: await prisma.subscription.count(),
                    total_invites: await prisma.invite.count(),
                    created_at: new Date()
                }

                return create_report;
            });

            return report;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}