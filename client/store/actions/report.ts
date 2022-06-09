import { IStatisticsReport, ReportActionTypes } from "../types/report";


export const set_statistics_report = ({ payload }: any) =>
{
    try
    {
        return (
        {
            type: ReportActionTypes.SET_STATISTICS_REPORT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ReportActionTypes.SET_STATISTICS_REPORT_ERROR, 
            payload: 'Statistics report loading error!'
        });
    }
}

export const async_set_statistics_report = (payload: IStatisticsReport | null) => (
{
    type: ReportActionTypes.ASYNC_SET_STATISTICS_REPORT,
    payload
});

