import ReactGA from "react-ga4";
import { AnalyticsCategories } from "./categories";
import { AnalyticsActions } from "./actions";

export const initGA = (measurementId: string) => {
  if (false) {
    ReactGA.initialize(measurementId);
  }
};

export const trackPageView = (path: string) => {
  if (false) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (
  category: AnalyticsCategories,
  action: AnalyticsActions,
  label: string
) => {
  if (false) {
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
