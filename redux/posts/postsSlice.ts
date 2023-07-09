import { createSlice } from "@reduxjs/toolkit";
import { PostInfoType, PostType } from "../../utilities/types";

export type PostStateType = {
    posts: PostType[],
    searchedPosts: PostInfoType | null,
}

// Initial state
const initialState: PostStateType = {
    posts: [],
    searchedPosts: null,
};

export const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPostListRequest() { },
        getPostsBySearchedRequest(state, action: { payload: string }) { },

        setPostList(state, action: { payload: PostType[] }) {
            const prevPostIds = state.posts.map(post => post.id)
            state.posts = [...state.posts, ...action.payload.filter(post => !prevPostIds.includes(post.id))]
        },

        setPostListBySearch(state, action: { payload: PostInfoType }) {
            state.searchedPosts = action.payload;
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