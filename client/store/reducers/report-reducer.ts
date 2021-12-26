import { IReportState, ReportAction, ReportActionTypes } from '../../types/report';


const initial_state: IReportState = {

    statistics_report: null,
    error: undefined//''
}


export const report_reducer = (state = initial_state, action: ReportAction): IReportState =>
{
    switch (action.type) 
    {
        case ReportActionTypes.GET_STATISTICS_REPORT:
        {
            return {
                ...state, 
                statistics_report: action.payload,
                error: undefined
            }
        }
        case ReportActionTypes.GET_STATISTICS_REPORT_ERROR:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case ReportActionTypes.DELETE_STATISTICS_REPORT:
        {
            return {
                ...state, 
                statistics_report: null,
                error: undefined
            }
        }
        case ReportActionTypes.DELETE_STATISTICS_REPORT_ERROR:
        {
            return {
                ...state, 
                error: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
}