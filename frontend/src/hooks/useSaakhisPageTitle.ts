import { useSaakhisPageCategory } from "./useSaakhisPageCategory";

export const useSaakhisPageTitle = () => {
  const { isBookmarksPage, isLikesPage } = useSaakhisPageCategory();

  if (isBookmarksPage) {
    return "All bookmarked saakhis";
  }
  if (isLikesPage) {
    return "All liked saakhis";
  }
  return "All saakhis";
};
