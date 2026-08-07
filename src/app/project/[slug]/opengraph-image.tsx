import { renderOgImage } from "@/lib/ogImage";
import { projects } from "@/data/projects";
import { projectDetailContent } from "@/constants/pages";
import { siteConfig } from "@/constants/site";

export { size, contentType } from "@/lib/ogImage";

// Static: `alt` cannot depend on params, so it names the kind of page rather
// than the specific project.
export const alt = `Case study by ${siteConfig.name}`;

/** Prerenders one share card per project alongside its page */
export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = projects.find((entry) => entry.slug === slug);

	return renderOgImage({
		eyebrow: project?.role ?? projectDetailContent.eyebrow,
		highlight: project?.title ?? siteConfig.name,
		description: project?.description ?? siteConfig.tagline,
	});
}
