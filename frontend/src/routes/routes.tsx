import { LandingPage } from "@/pages/landing-page";
import { SaakhiListing } from "@/pages/saakhi-listing";
import { SaakhiPage } from "@/pages/saakhi-page";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/saakhis",
    element: <SaakhiListing />,
  },
  {
    path: "/saakhis/:id",
    element: <SaakhiPage />,
  },
];
