import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ReportType } from './dto/report.dto';
import { GqlCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { GetUserInput } from 'src/user/inputs/get-user.input';
import { GetReportInput } from './inputs/get_report.input';


@UseGuards(GqlAuthGuard)
@Resolver()
export class AdminResolver 
{
    constructor(private readonly admin_service: AdminService) {}

    @Query(() => ReportType, { nullable: true })
    async get_statistics_report(@GqlCurrentUser() user: GetUserInput)
                                //@Args('input') input: GetReportInput) 
    {
        try
        {
            return await this.admin_service.get_statistics_report(user.id);
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
    }
}