import { IStatisticsReport, ReportActionTypes } from "../../types/report";


export const get_statistics_report = ({ payload }: any) =>
{
    try
    {
        return (
        {
            type: ReportActionTypes.GET_STATISTICS_REPORT,
            payload
        });
    } 
    catch (err) 
    {
        return (
        { 
            type: ReportActionTypes.GET_STATISTICS_REPORT_ERROR, 
            payload: 'Statistics report loading error!'
        });
    }
}

export const async_get_statistics_report = (payload: IStatisticsReport | null) => (
{
    type: ReportActionTypes.ASYNC_GET_STATISTICS_REPORT,
    payload
});

