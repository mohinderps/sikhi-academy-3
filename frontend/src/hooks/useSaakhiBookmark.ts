import { useBookmarks } from "./useBookmarks";

export const useSaakhiBookmark = (saakhiId: string) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const isSaakhiBookmarked = isBookmarked(saakhiId);

  const toggleSaakhiBookmark = () => {
    if (isSaakhiBookmarked) {
      removeBookmark(saakhiId);
    } else {
      addBookmark(saakhiId);
    }
  };

  return { isSaakhiBookmarked, toggleSaakhiBookmark };
};
