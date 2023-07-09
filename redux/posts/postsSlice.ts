import { createSlice } from "@reduxjs/toolkit";
import { PostInfoType, PostType } from "../../utilities/types";

type StateType = {
    posts: PostType[],
}

// Initial state
const initialState: StateType = {
    posts: [],
};

export const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPostListRequest() { },

        setPostList(state, action: { payload: PostType[] }) {
            state.posts = action.payload
        },

        setPostDetailList(state, action: { payload: PostType }) {
            if (state.posts.length > 0) {
                state.posts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
            } else {
                state.posts.push(action.payload)
            }
        },


    },
});

export const postActions = postsSlice.actions;

export default postsSlice.reducer;