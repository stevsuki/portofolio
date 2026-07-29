import { isOpenToWork } from "@/lib/openToWork";

export const heroContent = {
	isOpenToWork,
	availability: "Available for new opportunities",
	unavailability: "Not currently open to work",
	greeting: "Hi! I am",
	bio: "Software developer with hands-on experience across the full development lifecycle, building backend services, system integrations, and user-facing platforms with Next.js, React, Node.js, and Golang. Currently serving as Technical Lead on a cloud-native platform project.",
	ctaLabel: "Contact Me",
	secondaryCtaLabel: "View My Work",
};

export const aboutTeaserContent = {
	eyebrow: "Get to know me",
	headingPrefix: "About",
	headingHighlight: "Me",
	description:
		"Comfortable working across the JavaScript/TypeScript ecosystem as well as Golang, with a track record of adapting to backend, fullstack, and technical leadership roles across client-based, fast-paced environments.",
	ctaLabel: "Read More",
	downloadCvLabel: "Download CV",
};

export const techStackContent = {
	eyebrow: "Tools I work with",
	headingPrefix: "Tech",
	headingHighlight: "Stack",
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
