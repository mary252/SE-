import { put, call } from 'redux-saga/effects';
import RateAction from '../Redux/RatingRedux';
// Call The Method RatingRequest on an Api and a Data .. Calls const Rate in API.js and is Called by RatingRedux.js
export function * RatingRequest(api, { data }) {
  try {
    const res = yield call(api.Rate, data);
    yield put(RateAction.addSuccess(res.data.id));
  } catch (error) {
    yield put(RateAction.addFailure());
  }
}
