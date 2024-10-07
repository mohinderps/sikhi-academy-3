import { useEffect, useState } from "react";

export const useLikes = () => {
  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

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
