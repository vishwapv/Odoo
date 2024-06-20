import { takeLatest,all, call, put, select } from 'redux-saga/effects';


import {ODOO_REQUEST} from './constants';
import { odooRequest,
  odooSuccess,
  odooError
 } from './actions';
 import request from '../../utils/request';
 const axios = require('axios');


 function odooSagacall(payload) {
  console.log('response', payload)
  return axios.post(`https://jsonplaceholder.typicode.com/users/${payload}`, payload)
}

export function* odooSagaWorking(payload) {
  console.log('odoo saga working', payload);
  try {
      // Call our request helper (see 'utils/request')
      let response = yield call(odooSagacall, payload.payload);
      console.log('response', response);
      yield put(odooSuccess(response, payload.payload));
      // yield call(browserRedirect, "/eob/" + response.data.data)
  } catch (err) {
      console.log("err", err);
      yield put(odooError(err));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  yield all([
    takeLatest(ODOO_REQUEST, odooSagaWorking),
]);
}
