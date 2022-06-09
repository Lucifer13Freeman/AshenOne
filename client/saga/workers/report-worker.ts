import { put } from 'redux-saga/effects';
import { set_statistics_report } from '../../store/actions/report';
import { IStatisticsReport } from '../../store/types/report';


export function* set_statistics_report_worker(payload: IStatisticsReport): Generator<any>
{
    yield put(set_statistics_report(payload));
}