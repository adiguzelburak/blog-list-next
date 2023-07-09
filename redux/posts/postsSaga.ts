import {
    all, call, put, takeLatest
} from "redux-saga/effects";
import postService from "./postsService";
import { postActions } from "./postsSlice";

function* getPostListSaga() {
    try {
        const { status, statusText, data } = yield call(postService.getPostList)
        if (status !== 200) throw new Error(statusText)

        yield put(postActions.setPostList(data));

    } catch (e) {
        console.log(e)
    }
}


export default function* rootSaga() {
    yield all([
        takeLatest(postActions.getPostListRequest.type, getPostListSaga),
        // takeLatest(pokemonActions.getPokemonByIdRequest.type, getPokemonByIdSaga),
    ]);
}