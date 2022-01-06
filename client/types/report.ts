
export interface IStatisticsReport
{
    total_users: number;
    total_banned_users: number;
    total_messages: number;
    total_reactions: number;
    total_posts: number;
    total_post_likes: number;
    total_comments: number;
    total_comment_likes: number;
    total_groups: number;
    total_subscriptions: number;
    total_invites: number;
    created_at: Date;
}

export interface IReportState 
{ 
    statistics_report: IStatisticsReport | null;
    error?: string;
}

export enum ReportActionTypes
{
    SET_STATISTICS_REPORT = 'SET_STATISTICS_REPORT',
    ASYNC_SET_STATISTICS_REPORT = 'ASYNC_SET_STATISTICS_REPORT',
    SET_STATISTICS_REPORT_ERROR = 'SET_STATISTICS_REPORT_ERROR',

    DELETE_STATISTICS_REPORT = 'DELETE_STATISTICS_REPORT',
    ASYNC_DELETE_STATISTICS_REPORT = 'ASYNC_DELETE_STATISTICS_REPORT',
    DELETE_STATISTICS_REPORT_ERROR = 'DELETE_STATISTICS_REPORT_ERROR'
}

interface ISetStatisticsReportAction
{
    type: ReportActionTypes.SET_STATISTICS_REPORT;
    payload: IStatisticsReport;
}

interface IAsyncStatisticsReportAction
{
    type: ReportActionTypes.ASYNC_SET_STATISTICS_REPORT;
    payload: IStatisticsReport;
}

interface ISetStatisticsReportErrorAction
{
    type: ReportActionTypes.SET_STATISTICS_REPORT_ERROR;
    payload: string
}

interface IDeleteStatisticsReportAction
{
    type: ReportActionTypes.DELETE_STATISTICS_REPORT;
    payload: string
}

interface IAsyncDeleteStatisticsReportAction
{
    type: ReportActionTypes.ASYNC_DELETE_STATISTICS_REPORT;
    payload: string
}

interface IDeleteStatisticsReportErrorAction
{
    type: ReportActionTypes.DELETE_STATISTICS_REPORT_ERROR;
    payload: string
}


export type ReportAction = ISetStatisticsReportAction 
                        | IAsyncStatisticsReportAction
                        | ISetStatisticsReportErrorAction 
                        | IDeleteStatisticsReportAction
                        | IAsyncDeleteStatisticsReportAction
                        | IDeleteStatisticsReportErrorAction;