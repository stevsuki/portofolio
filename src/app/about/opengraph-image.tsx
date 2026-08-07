import { renderOgImage } from "@/lib/ogImage";
import { aboutPageContent } from "@/constants/pages";
import { siteConfig } from "@/constants/site";

export { size, contentType } from "@/lib/ogImage";

export const alt = `About ${siteConfig.name}`;

export default function OpengraphImage() {
	return renderOgImage({
		eyebrow: aboutPageContent.eyebrow,
		title: aboutPageContent.headingPrefix,
		highlight: aboutPageContent.headingHighlight,
		description: aboutPageContent.ogDescription,
	});
}
