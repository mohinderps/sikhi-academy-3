import { useState, useEffect } from "react";

export function useLastReadSaakhi() {
  const [lastReadSaakhiId, setLastReadSaakhiId] = useState<string | null>(null);

  useEffect(() => {
    const storedLastRead = localStorage.getItem("lastReadSaakhi");
    if (storedLastRead) {
      setLastReadSaakhiId(storedLastRead);
    }
  }, []);

  const updateLastReadSaakhi = (saakhiId: string) => {
    setLastReadSaakhiId(saakhiId);
    localStorage.setItem("lastReadSaakhi", saakhiId);
  };

  return { lastReadSaakhiId, updateLastReadSaakhi };
}
