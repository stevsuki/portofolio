import { Project } from "@/types/project";

export const projects: Project[] = [
	{
		slug: "cloud-native-application-delivery-platform",
		title: "Cloud-Native Application Delivery Platform",
		tech: "Next.js, TypeScript, Tailwind CSS, Golang, PostgreSQL",
		role: "Technical Lead, Frontend",
		status: "Ongoing",
		description:
			"A unified cloud-native platform consolidating traffic routing, ingress control, security enforcement, and monitoring into a single control layer.",
		featured: true,
	},
	{
		slug: "customer-consent-management-platform",
		title: "Customer Consent Management Platform",
		tech: "Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, PostgreSQL",
		role: "Backend Developer",
		status: "Completed",
		description:
			"A consent management platform handling customer consent, Terms & Conditions, and Privacy Notices across multiple digital channels.",
		featured: true,
	},
	{
		slug: "customer-ecosystem-integration-platform",
		title: "Customer Ecosystem Integration Platform",
		tech: "Vite.js, TypeScript, Tailwind CSS, Node.js, Express.js, SQL Server",
		role: "Backend Developer",
		status: "Completed",
		description:
			"A centralized data platform integrating information from surrounding systems for a consistent, personalized customer experience.",
		featured: true,
	},
	{
		slug: "corporate-website-cms-platform",
		title: "Corporate Website & CMS Platform",
		tech: "Next.js, TypeScript, Bootstrap, Node.js, Express.js, MySQL",
		role: "Fullstack Developer",
		status: "Completed",
		description:
			"A company profile platform integrated with a custom-built CMS, letting the client manage website content independently.",
		featured: true,
	},
];
