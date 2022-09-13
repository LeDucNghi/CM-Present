import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDeletedListFailed,
  fetchDeletedListSuccess,
  fetchingDeletedList,
} from "./trashSlice";

import { trashApi } from "api/trashApi";

function* fetchDeletedList() {
  try {
    const res = yield call(trashApi.getDeletedList);

    yield put(fetchDeletedListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 10 ~ function*fetchDeletedList ~ error",
      error
    );
    yield put(fetchDeletedListFailed(error.message));
  }
}

export default function* trashSaga() {
  yield takeLatest(fetchingDeletedList.type, fetchDeletedList);
}
