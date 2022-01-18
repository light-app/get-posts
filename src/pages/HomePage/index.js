import React, { useState, useEffect } from "react";
import { SpinnerIcon } from "../../Icons";
import { Tooltip, Divider, Button } from "antd";
import { routeUrl } from "../../constants";

import { observer } from "mobx-react-lite";
import { useStores } from "./../../hooks/useStores";
import { toJS } from "mobx";

import "./HomePage.scss";
import { Link } from "@reach/router";

import { getRandomInt } from "../../utils/helpers";

const colorArr = [
  "black",
  "orange",
  "cadetblue",
  "green",
  "gray",
  "pink",
  "yellow",
];

const link = routeUrl === "" ? "" : routeUrl;

const HomePage = observer(() => {
  const { PostsStore } = useStores();
  const [authors, setAuthors] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const posts = toJS(PostsStore.posts);
  const filterPosts = allPosts?.length > 0 ? allPosts : posts;

  useEffect(() => {
    PostsStore.getPosts();
  }, []);

  useEffect(() => {
    const getAllAuthors = posts?.map((post) => post.userId);
    const unicAuthors = new Set(getAllAuthors);
    setAuthors([...unicAuthors]);
    setAllPosts(posts);
  }, [PostsStore.posts]);

  const getRandomColor = () => {
    const colorIndex = getRandomInt(0, colorArr.length - 1);
    return colorArr[colorIndex];
  };

  const filterByAuthor = (id) => {
    setAllPosts(posts.filter((post) => post.userId === id));
  };

  return (
    <div className="home-page">
      <div className="home-page__authors">
        {authors?.length ? (
          <>
            {authors?.map((authorId) => {
              return (
                <Button
                  key={authorId}
                  className="author"
                  onClick={() => filterByAuthor(authorId)}
                >
                  {authorId}
                </Button>
              );
            })}
            <Button className="author" onClick={() => setAllPosts([])}>
              Сбросить фильтр
            </Button>
          </>
        ) : (
          <SpinnerIcon />
        )}
      </div>
      <div className="home-page__posts">
        {PostsStore.posts?.length ? (
          <>
            {filterPosts.map((post) => {
              return (
                <div key={post.id} className="post-item">
                  <div className="container">
                    <Tooltip title={post.title}>
                      <div className="post-item__title">{post.title}</div>
                    </Tooltip>
                    <Divider
                      style={{
                        backgroundColor: getRandomColor(),
                        height: "5px",
                      }}
                    />
                  </div>

                  <div className="post-item__description">{post.body}</div>
                  <div className="post-item__author">Автор: {post.userId}</div>
                  <Link to={`${link}/post/${post.id}`}>
                    <Button
                      className="btn primary stretched"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      Перейти
                    </Button>
                  </Link>
                </div>
              );
            })}
          </>
        ) : (
          <SpinnerIcon />
        )}
      </div>
    </div>
  );
});

export { HomePage };
