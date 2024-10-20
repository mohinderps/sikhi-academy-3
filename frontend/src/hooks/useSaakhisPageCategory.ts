import { useLocation, useSearchParams } from "react-router-dom";

export const useSaakhisPageCategory = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const isBookmarksPage = searchParams.has("bookmarks");
  const isLikesPage = searchParams.has("likes");

  return {
    isBookmarksPage,
    isLikesPage,
  };
};
