import { Saakhi, GuruJi } from "@prisma/client";

export interface SaakhiWithGuruJi extends Saakhi {
  guruJi: GuruJi;
}
