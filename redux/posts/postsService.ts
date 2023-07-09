import axios from "axios";

const URL = 'https://dummyjson.com/posts';

const postService = {
    getPostList: () => {
        return axios.get(URL, {
        })
    },
    // getPostDetailById: (id) => {
    //     return axios.get(`${URL}/${id}/`)
    // }
};

export default postService;