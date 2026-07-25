import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Cached Payload Local API client for server components. `getPayload` memoises
 * the instance internally, so this is safe to call per request.
 *
 * IMPORTANT: public reads pass `overrideAccess: false` so collection access
 * control applies — anonymous callers see only published rows, never drafts.
 */
export function getPayloadClient() {
  return getPayload({ config });
}
