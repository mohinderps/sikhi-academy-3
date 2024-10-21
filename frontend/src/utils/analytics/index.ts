import ReactGA from "react-ga4";
import { AnalyticsCategories } from "./categories";
import { AnalyticsActions } from "./actions";

const isProduction = import.meta.env.PROD;

export const initGA = () => {
  if (isProduction) {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    ReactGA.initialize(measurementId);
  }
};

export const trackPageView = (path: string) => {
  if (isProduction) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (
  category: AnalyticsCategories,
  action: AnalyticsActions,
  label: string
) => {
  if (isProduction) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

export const trackSaakhiLike = (saakhiId: string) => {
  trackEvent(AnalyticsCategories.Saakhi, AnalyticsActions.Like, saakhiId);
};

export const trackSaakhiBookmark = (saakhiId: string) => {
  trackEvent(AnalyticsCategories.Saakhi, AnalyticsActions.Bookmark, saakhiId);
};
