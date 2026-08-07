import { renderOgImage } from "@/lib/ogImage";
import { siteConfig } from "@/constants/site";

export { size, contentType } from "@/lib/ogImage";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;

export default function OpengraphImage() {
	return renderOgImage({
		// Not the role — the card's header block already states it under the name
		eyebrow: "Portfolio",
		highlight: siteConfig.name,
		description: siteConfig.tagline,
	});
}
