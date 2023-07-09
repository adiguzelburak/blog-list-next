import { all, call, debounce, put, takeLatest } from "redux-saga/effects";
import postService from "./postsService";
import { postActions } from "./postsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponseType } from "../../utilities/types";

function* getPostsBySearchedSaga(action: PayloadAction<string>) {
    try {
        if (action.payload) {
            const { status, statusText, data }: AxiosResponseType = yield call(postService.getPostsBySearched, action.payload)
            if (status !== 200) throw new Error(statusText)

            yield put(postActions.setPostListBySearch(data));
        }
    } catch (e) {
        console.log(e)
    }
}


export default function* rootSaga() {
    yield all([
        debounce(600, postActions.getPostsBySearchedRequest.type, getPostsBySearchedSaga),
    ]);
}