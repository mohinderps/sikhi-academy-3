import { useBookmarks } from "./useBookmarks";
import { trackSaakhiBookmark } from "@/utils/analytics";

export const useSaakhiBookmark = (saakhiId: string) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const isSaakhiBookmarked = isBookmarked(saakhiId);

  const toggleSaakhiBookmark = () => {
    if (isSaakhiBookmarked) {
      removeBookmark(saakhiId);
    } else {
      addBookmark(saakhiId);
      trackSaakhiBookmark(saakhiId);
    }
  };

  return { isSaakhiBookmarked, toggleSaakhiBookmark };
};
