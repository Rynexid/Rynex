import { MetadataRoute } from "next";

import { env } from "@rynex/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.CORE_URL || env.APP_URL || "/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
