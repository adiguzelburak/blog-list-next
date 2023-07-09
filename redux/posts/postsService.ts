import axios from "axios";

const postService = {
    getPostsBySearched: (postTitle: string) => {
        return axios.get(`https://dummyjson.com/posts/search?q=${postTitle}`)
    }
};

export default postService;