import { SaakhiSummary } from "@/types";
import { useBookmarks } from "./useBookmarks";
import { useLikes } from "./useLikes";
import { useMemo } from "react";
import { useSaakhisPageCategory } from "./useSaakhisPageCategory";

export const useFilteredSaakhis = (allSaakhiSummaries?: SaakhiSummary[]) => {
  const { isBookmarksPage, isLikesPage } = useSaakhisPageCategory();
  const { bookmarks } = useBookmarks();
  const { likes } = useLikes();

  return useMemo(() => {
    if (!allSaakhiSummaries) {
      return [];
    }
    if (isBookmarksPage) {
      return allSaakhiSummaries.filter((saakhi) =>
        bookmarks.includes(saakhi.id)
      );
    }
    if (isLikesPage) {
      return allSaakhiSummaries.filter((saakhi) => likes.includes(saakhi.id));
    }
    return allSaakhiSummaries;
  }, [allSaakhiSummaries, bookmarks, likes, isBookmarksPage, isLikesPage]);
};
