import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "../../utilities/types";

type StateType = {
    posts: PostType[]
}

// Initial state
const initialState: StateType = {
    posts: [],
    // postDetailList: {},
};

export const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPostListRequest() { },

        setPostList(state, action: { payload: PostType[] }) {
            state.posts = [...state.posts, ...action.payload]
        },

    },
});

export const postActions = postsSlice.actions;

export default postsSlice.reducer;