import axios from "axios";

class PostsAPI {
  getPosts = (authData) => {
    return axios.get(`/posts`, { ...authData });
  };
}

const postsAPI = new PostsAPI();
export default postsAPI;
