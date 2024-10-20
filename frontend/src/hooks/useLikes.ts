import { useState } from "react";

export const useLikes = () => {
  const [likes, setLikes] = useState<string[]>(() => {
    const storedLikes = localStorage.getItem("likes");
    return storedLikes ? JSON.parse(storedLikes) : [];
  });

  const addLike = (id: string) => {
    const newLikes = [...likes, id];
    setLikes(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  const removeLike = (id: string) => {
    const newLikes = likes.filter((like) => like !== id);
    setLikes(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  const isLiked = (id: string) => {
    return likes.includes(id);
  };

  return { likes, addLike, removeLike, isLiked };
};
