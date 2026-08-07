import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { navItems } from "@/constants/nav";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	const pages = navItems.map((item) => ({
		url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
		lastModified,
		changeFrequency: "monthly" as const,
		priority: item.href === "/" ? 1 : 0.8,
	}));

	// Ranked below the listing they hang off, but still submitted: a case study
	// is the page most likely to match a search for a specific technology.
	const caseStudies = projects.map((project) => ({
		url: `${siteConfig.url}/project/${project.slug}`,
		lastModified,
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}));

	return [...pages, ...caseStudies];
}
