import { all, fork } from "redux-saga/effects";

import postSaga from "./posts/postsSaga";

function* rootSaga() {
    yield all([fork(postSaga)]);
}

export default rootSaga;