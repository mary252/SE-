import { put, call } from 'redux-saga/effects';
import RegisterAction from '../Redux/RegisterRedux';
// Call The Method RegisterRequest on an Api and a Data .. Calls const Register in API.js and is Called by RegisterRedux.js
export function * RegisterRequest(api, { data }) {
  try {
    const res = yield call(api.Register, data);
    yield put(RegisterAction.addSuccess(res.data.id));
  } catch (error) {
    yield put(RegisterAction.addFailure());
  }
}
