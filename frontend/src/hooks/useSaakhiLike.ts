import { useLikes } from "./useLikes";

export const useSaakhiLike = (saakhiId: string) => {
  const { isLiked, addLike, removeLike } = useLikes();

  const isSaakhiLiked = isLiked(saakhiId);

  const toggleSaakhiLike = () => {
    if (isSaakhiLiked) {
      removeLike(saakhiId);
    } else {
      addLike(saakhiId);
    }
  };

  return { isSaakhiLiked, toggleSaakhiLike };
};
