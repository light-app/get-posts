import React from "react";
import { PostsStore } from "../stores";

export const stores = {
  PostsStore: new PostsStore(),
};

export const storesContext = React.createContext(stores);
