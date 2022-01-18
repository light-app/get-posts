import React, { useState, useEffect } from "react";
import { BoxerIcon, SpinnerIcon } from "../../Icons";
import { Progress, Tooltip, Divider } from "antd";

import { observer } from "mobx-react-lite";
import { useStores } from "./../../hooks/useStores";
import { toJS } from "mobx";

import "./PostPage.scss";

const PostPage = observer((props) => {
  const { PostsStore } = useStores();
  const [post, setPost] = useState(null);
  const posts = toJS(PostsStore.posts);

  useEffect(() => {
    getPostById(+props.page);
  }, []);

  const getPostById = (id) => {
    const currentPost = posts?.find((item) => item.id === id);
    setPost(currentPost);
  };

  return (
    <div className="post-page">
      <div className="post-page__title">{post?.title}</div>
      <div className="post-page__description">{post?.body}</div>
      <div className="post-page__author">Автор: {post?.userId}</div>
    </div>
  );
});

export { PostPage };
