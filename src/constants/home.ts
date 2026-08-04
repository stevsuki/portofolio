import { isOpenToWork } from "@/lib/openToWork";

export const heroContent = {
	isOpenToWork,
	availability: "Available for new opportunities",
	unavailability: "Not currently open to work",
	greeting: "Hi! I am",
	// Cycled in the hero — each one maps to a role actually held on a project
	roles: ["Software Developer", "Backend Developer", "Fullstack Developer", "Technical Lead"],
	bio: "Software developer with hands-on experience across the full development lifecycle, building backend services, system integrations, and user-facing platforms with Next.js, React, Node.js, and Golang. Currently serving as Technical Lead on a cloud-native platform project.",
	ctaLabel: "Contact Me",
	secondaryCtaLabel: "View My Work",
	scrollLabel: "Scroll to explore",
};

export const servicesContent = {
	eyebrow: "What I do",
	headingPrefix: "How I Can",
	headingHighlight: "Help",
	description: "Three areas I've been trusted with across client projects, from first endpoint to production delivery.",
};

export const aboutTeaserContent = {
	eyebrow: "Get to know me",
	headingPrefix: "About",
	headingHighlight: "Me",
	description:
		"Comfortable working across the JavaScript/TypeScript ecosystem as well as Golang, with a track record of adapting to backend, fullstack, and technical leadership roles across client-based, fast-paced environments.",
	// Names its destination rather than the action. "Read More" carries no
	// meaning out of context — for a search engine weighing anchor text, or for
	// anyone tabbing through links without the surrounding copy.
	ctaLabel: "More About Me",
	downloadCvLabel: "Download CV",
	// Each row restates a fact already stated elsewhere on the site (projects,
	// tech stack, education) so the card stays in sync with the source content
	quickFacts: [
		{ label: "Current role", value: "Technical Lead — Cloud-Native Platform" },
		{ label: "Core stack", value: "Next.js · TypeScript · Node.js · Golang" },
		{ label: "Education", value: "B.Eng Informatics, Universitas Tarumanagara" },
		{ label: "Status", value: isOpenToWork ? "Open to opportunities" : "Not currently open to work" },
	],
};

export const techStackContent = {
	eyebrow: "Tools I work with",
	headingPrefix: "Tech",
	headingHighlight: "Stack",
	// The rows are draggable, which is not otherwise discoverable
	hint: "Drag or swipe the rows to browse.",
};

export const experienceContent = {
	eyebrow: "Where I've been",
	headingPrefix: "Work",
	headingHighlight: "Experience",
};

export const featuredProjectsContent = {
	eyebrow: "What I've built",
	headingPrefix: "Featured",
	headingHighlight: "Projects",
	ctaLabel: "See All Projects",
};

export const contactCtaContent = {
	eyebrow: "Let's talk",
	headingPrefix: "Let's",
	headingHighlight: "Work Together",
	description: isOpenToWork
		? "I'm open to new job opportunities. Feel free to reach out and let's talk about it."
		: "Feel free to reach out — I'd love to connect and talk about it.",
	ctaLabel: "Contact Me",
};
