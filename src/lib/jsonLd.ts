import { siteConfig } from "@/constants/site";
import { aboutPageContent } from "@/constants/pages";

/**
 * Structured data for the site, as a `@graph` so the Person and the WebSite can
 * reference each other by `@id` instead of being repeated.
 *
 * This is what lets a search engine treat the page as a person rather than as
 * an unlabelled document: it is the difference between a result that shows a
 * name, role and verified profile links, and one that shows a page title.
 */
export const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${siteConfig.url}/#person`,
			name: siteConfig.name,
			alternateName: siteConfig.shortName,
			url: siteConfig.url,
			image: `${siteConfig.url}/assets/person.webp`,
			email: `mailto:${siteConfig.email}`,
			jobTitle: siteConfig.role,
			description: siteConfig.description,
			knowsAbout: siteConfig.keywords,
			alumniOf: {
				"@type": "CollegeOrUniversity",
				name: aboutPageContent.education.school,
			},
			// The signal that ties this page to the profiles it claims to own
			sameAs: Object.values(siteConfig.socials),
		},
		{
			"@type": "WebSite",
			"@id": `${siteConfig.url}/#website`,
			url: siteConfig.url,
			name: siteConfig.title,
			description: siteConfig.description,
			inLanguage: "en",
			publisher: { "@id": `${siteConfig.url}/#person` },
		},
	],
};
