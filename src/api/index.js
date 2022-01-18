import axios from "axios";
import { BASE_URL } from "./consts";
import { version } from "../../package.json";

import postsAPI from "./postsAPI";

axios.interceptors.request.use(
  async (config) => {
    console.log("Request", config.headers);

    return {
      ...config,
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "App-Version": version,
        "App-Platform": "web",
        "Access-Control-Allow-Origin": "*",
        ...config.headers,
      },
    };
  },
  (error) => {
    console.log("Request", { url: config.url, ...config.headers });

    return Promise.reject(error);
  }
);

class APIService {
  posts = postsAPI;
}

const API = new APIService();
export default API;
