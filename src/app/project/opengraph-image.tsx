import { renderOgImage } from "@/lib/ogImage";
import { projectPageContent } from "@/constants/pages";
import { siteConfig } from "@/constants/site";

export { size, contentType } from "@/lib/ogImage";

export const alt = `Projects by ${siteConfig.name}`;

export default function OpengraphImage() {
	return renderOgImage({
		eyebrow: projectPageContent.eyebrow,
		title: projectPageContent.headingPrefix,
		highlight: projectPageContent.headingHighlight,
		description: projectPageContent.description,
	});
}
