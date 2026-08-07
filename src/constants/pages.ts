import { isOpenToWork } from "@/lib/openToWork";

export const aboutPageContent = {
	eyebrow: "Get to know me",
	headingPrefix: "About",
	headingHighlight: "Me",
	paragraphs: [
		"Software developer with hands-on experience across the full development lifecycle, building and maintaining enterprise-grade applications spanning backend services, system integrations, and user-facing platforms. Comfortable working across the JavaScript/TypeScript ecosystem (Next.js, React, Node.js) as well as Golang, with a track record of adapting to backend, fullstack, and technical leadership roles depending on project needs.",
		"Currently serving as Technical Lead on a cloud-native platform project, combining strong technical execution with clear communication and effective coordination across client-based, fast-paced environments.",
	],
	ctaLabel: "See My Projects",
	downloadCvLabel: "Download CV",
	// Share cards and search results get their own copy: the page paragraphs are
	// written to be read at length, which truncates badly in a link preview.
	ogDescription:
		"Software developer working across backend services, system integrations, and full-stack platforms — currently Technical Lead on a cloud-native project.",
	education: {
		eyebrow: "Academic background",
		headingPrefix: "My",
		headingHighlight: "Education",
		school: "Universitas Tarumanagara",
		degree: "Bachelor of Informatics Engineering",
		period: "2021 - 2025",
		detail: "GPA: 3.97 / 4.00",
	},
};

export const projectPageContent = {
	eyebrow: "Portfolio",
	headingPrefix: "My",
	headingHighlight: "Projects",
	description: "A collection of client projects I've delivered as a backend, fullstack, and technical lead developer.",
};

export const projectDetailContent = {
	eyebrow: "Case study",
	backLabel: "All projects",
	// Each heading names a question a reviewer is already asking, rather than a
	// generic label like "Details" — the wording is what prompts the write-up
	// to answer something instead of restating the summary.
	contextHeading: "The problem",
	contributionsHeading: "What I did",
	decisionsHeading: "Key decisions",
	outcomesHeading: "Outcomes",
	stackHeading: "Tech stack",
	roleLabel: "Role",
	statusLabel: "Status",
	periodLabel: "Period",
	teamLabel: "Team",
	repoLabel: "Source code",
	demoLabel: "Live demo",
	prevLabel: "Previous project",
	nextLabel: "Next project",
	ctaLabel: "Browse all projects",
};

export const contactPageContent = {
	eyebrow: "Contact",
	headingPrefix: "Get In",
	headingHighlight: "Touch",
	description: isOpenToWork
		? "I'm open to new job opportunities and would love to hear from you. Feel free to reach out — my inbox is always open, and I'll get back to you as soon as I can."
		: "Thanks for stopping by! Feel free to reach out — my inbox is always open, and I'll get back to you as soon as I can.",
	emailCtaLabel: "Send an Email",
	socialsLabel: "or find me on",
	ogDescription: "Have a project, a role, or a question in mind? My inbox is always open.",
};
