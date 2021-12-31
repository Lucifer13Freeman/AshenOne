import { takeEvery } from "redux-saga/effects";
import { ReportActionTypes } from "../../types/report";
import { set_statistics_report_worker } from "../workers/report-worker";


export function* report_watcher(): Generator<any>
{
    yield takeEvery<any>(ReportActionTypes.ASYNC_SET_STATISTICS_REPORT, set_statistics_report_worker);
}