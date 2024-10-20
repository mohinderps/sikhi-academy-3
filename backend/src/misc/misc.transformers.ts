import { SaakhiWithGuruJi } from "../types";
import { SaakhiSummary } from "../admin/saakhi/admin.saakhi.types";

export const transformSaakhiToSummary = (
  saakhi: SaakhiWithGuruJi
): SaakhiSummary => ({
  id: saakhi.id,
  title: saakhi.title,
  guruJi: {
    id: saakhi.guruJi.id,
    name: saakhi.guruJi.name,
  },
});
