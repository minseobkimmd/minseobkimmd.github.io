import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

// Pages CMS saves the date-picker value as a UTC wall-clock (e.g. "2026-10-16T19:08:00+00:00"
// when the author meant 19:08 Korea time). Interpret naive/UTC wall-clocks as Asia/Seoul;
// values with an explicit non-zero offset (hand-written posts) are kept as-is.
const cmsAwareDate = z
  .union([z.date(), z.string()])
  .transform(v => {
    if (v instanceof Date) return v;
    let s = v.trim();
    if (/(?:z|\+00:?00)$/i.test(s)) s = s.replace(/(?:z|\+00:?00)$/i, "+09:00");
    else if (!/(?:[+-]\d{2}:?\d{2})$/i.test(s)) s = `${s}+09:00`;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) throw new Error(`Invalid date value: ${v}`);
    return d;
  });

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: cmsAwareDate,
      modDatetime: cmsAwareDate.optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
