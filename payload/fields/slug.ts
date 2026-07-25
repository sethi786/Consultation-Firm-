import type { Field } from "payload";

/**
 * A URL slug with a lightweight auto-format hook. Kept simple: lowercases and
 * hyphenates on change if the editor leaves it blank-ish.
 */
export function slugField(sourceField = "title"): Field {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "URL segment. Lowercase, hyphenated.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const raw = (value || data?.[sourceField] || "") as string;
          return raw
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        },
      ],
    },
  };
}

/** A reusable SEO group (title + description) for content collections. */
export const seoField: Field = {
  name: "seo",
  type: "group",
  admin: { description: "Overrides for search and social previews." },
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
  ],
};
