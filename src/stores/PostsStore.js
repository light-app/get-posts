import { observable, action, makeObservable } from "mobx";
import API from "../api";

export class PostsStore {
  loading = false;
  posts = null;
  error = null;

  getPosts = async () => {
    this.loading = true;
    API.posts
      .getPosts()
      .then((response) => {
        this.posts = response.data;
        this.error = null;
      })
      .catch((err) => {
        this.error = err;
      })
      .finally(() => {
        this.loading = false;
      });
  };

  resetStore = () => {
    this.loading = false;
    this.posts = null;
    this.error = null;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      posts: observable,
      error: observable,
      getPosts: action,
      resetStore: action,
    });
  }
}
