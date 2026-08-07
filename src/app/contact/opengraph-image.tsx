import { renderOgImage } from "@/lib/ogImage";
import { contactPageContent } from "@/constants/pages";
import { siteConfig } from "@/constants/site";

export { size, contentType } from "@/lib/ogImage";

export const alt = `Contact ${siteConfig.name}`;

export default function OpengraphImage() {
	return renderOgImage({
		eyebrow: contactPageContent.eyebrow,
		title: contactPageContent.headingPrefix,
		highlight: contactPageContent.headingHighlight,
		description: contactPageContent.ogDescription,
	});
}
