import { takeEvery } from "redux-saga/effects";
import { ReportActionTypes } from "../../types/report";
import { get_statistics_report_worker } from "../workers/report-worker";


export function* report_watcher(): Generator<any>
{
    yield takeEvery<any>(ReportActionTypes.ASYNC_GET_STATISTICS_REPORT, get_statistics_report_worker);
}