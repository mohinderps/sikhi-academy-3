import { useState, useCallback } from "react";

export function useLastReadSaakhi() {
  const [lastReadSaakhiId, setLastReadSaakhiId] = useState<string | null>(
    () => localStorage.getItem("lastReadSaakhi") || null
  );

  const updateLastReadSaakhi = useCallback((saakhiId: string) => {
    setLastReadSaakhiId(saakhiId);
    localStorage.setItem("lastReadSaakhi", saakhiId);
  }, []);

  return { lastReadSaakhiId, updateLastReadSaakhi };
}
