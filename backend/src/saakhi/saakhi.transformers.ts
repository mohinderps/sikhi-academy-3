import { SaakhiWithGuruJi } from "../types";
import { SaakhiResponseDto, SaakhiWithAdjacentSaakhis } from "./saakhi.types";

const transformSaakhiToSummaryWithContent = (
  saakhi: SaakhiWithGuruJi | null
) => {
  if (!saakhi) {
    return saakhi;
  }
  return {
    id: saakhi.id,
    title: saakhi.title,
    content: saakhi.content,
    guruJi: {
      id: saakhi.guruJi.id,
      name: saakhi.guruJi.name,
    },
  };
};

const transformSaakhiToSummary = (saakhi: SaakhiWithGuruJi | null) => {
  if (!saakhi) {
    return saakhi;
  }
  return {
    id: saakhi.id,
    title: saakhi.title,
    guruJi: {
      id: saakhi.guruJi.id,
      name: saakhi.guruJi.name,
    },
  };
};

export const toSaakhiResponseDto = (
  saakhi: SaakhiWithAdjacentSaakhis
): SaakhiResponseDto => {
  const { currentSaakhi, previousSaakhi, nextSaakhi } = saakhi;
  if (currentSaakhi) {
    return {
      currentSaakhi: transformSaakhiToSummaryWithContent(currentSaakhi),
      previousSaakhi: transformSaakhiToSummary(previousSaakhi),
      nextSaakhi: transformSaakhiToSummary(nextSaakhi),
    };
  }
  return {
    currentSaakhi: null,
    previousSaakhi: null,
    nextSaakhi: null,
  };
};
