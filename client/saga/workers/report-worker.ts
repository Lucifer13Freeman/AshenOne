import { put } from 'redux-saga/effects';
import { get_statistics_report } from '../../store/actions/report';
import { IStatisticsReport } from '../../types/report';


export function* get_statistics_report_worker(payload: IStatisticsReport): Generator<any>
{
    yield put(get_statistics_report(payload));
}