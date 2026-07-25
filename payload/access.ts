import type { Access } from "payload";

/** Anyone (including anonymous) may read — used for published marketing content. */
export const anyone: Access = () => true;

/** Only authenticated admin users. */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Published content is world-readable; drafts are visible only to staff. Pairs
 * with `versions.drafts` so the public site (ISR) only ever sees published rows.
 */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true;
  return {
    _status: { equals: "published" },
  };
};
