import { useEffect, useState } from "react";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const addBookmark = (id: string) => {
    const newBookmarks = [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
};
