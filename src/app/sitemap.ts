import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { navItems } from "@/constants/nav";

export default function sitemap(): MetadataRoute.Sitemap {
	return navItems.map((item) => ({
		url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: item.href === "/" ? 1 : 0.8,
	}));
}
