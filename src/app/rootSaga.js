import { all } from "redux-saga/effects";
import authSaga from "features/auth/authSaga";
import createSagaMiddleware from "redux-saga";
import userSaga from "features/user/userSaga";

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  console.log("hi, chúc mừng bạn đã vào đc rootSaga");

  yield all([userSaga(), authSaga()]);
}
