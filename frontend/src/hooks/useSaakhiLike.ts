import { useLikes } from "./useLikes";
import { trackSaakhiLike } from "@/utils/analytics";

export const useSaakhiLike = (saakhiId: string) => {
  const { isLiked, addLike, removeLike } = useLikes();

  const isSaakhiLiked = isLiked(saakhiId);

  const toggleSaakhiLike = () => {
    if (isSaakhiLiked) {
      removeLike(saakhiId);
    } else {
      addLike(saakhiId);
      trackSaakhiLike(saakhiId);
    }
  };

  return { isSaakhiLiked, toggleSaakhiLike };
};
