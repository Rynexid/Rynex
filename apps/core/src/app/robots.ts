import { MetadataRoute } from "next";

import { env } from "@rynex/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.CORE_URL || env.APP_URL}/sitemap.xml`,
  };
}
