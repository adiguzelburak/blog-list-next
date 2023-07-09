import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import rootSaga from "./rootSaga";
import { postsSlice } from "./posts/postsSlice";

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
    const store = configureStore({
        reducer: {
            [postsSlice.name]: postsSlice.reducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: false,
            }).prepend(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga);
    return store;
};

export const wrapper = createWrapper(makeStore);