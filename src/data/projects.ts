import { Project } from "@/types/project";

export const projects: Project[] = [
	{
		slug: "cloud-native-application-delivery-platform",
		title: "Cloud-Native Application Delivery Platform",
		tech: "Next.js, TypeScript, Tailwind CSS, Golang, PostgreSQL",
		description:
			"A unified cloud-native platform consolidating traffic routing, ingress control, security enforcement, and monitoring into a single control layer, enabling automated service mapping and streamlined, observable application migration. Role: Technical Lead, Frontend. Status: Ongoing.",
		featured: true,
	},
	{
		slug: "customer-consent-management-platform",
		title: "Customer Consent Management Platform",
		tech: "Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, PostgreSQL",
		description:
			"A consent management platform enabling end-to-end handling of customer consent, Terms & Conditions, and Privacy Notices from creation and publication to collection, update, and revocation across multiple digital channels. Role: Backend Developer.",
		featured: true,
	},
	{
		slug: "customer-ecosystem-integration-platform",
		title: "Customer Ecosystem Integration Platform",
		tech: "Vite.js, TypeScript, Tailwind CSS, Node.js, Express.js, SQL Server",
		description:
			"A centralized data platform integrating information from various surrounding systems to enable consistent, personalized, and seamless customer experience management across the customer journey. Role: Backend Developer.",
		featured: true,
	},
	{
		slug: "corporate-website-cms-platform",
		title: "Corporate Website & CMS Platform",
		tech: "Next.js, TypeScript, Bootstrap, Node.js, Express.js, MySQL",
		description:
			"A company profile platform integrated with a custom-built CMS, allowing the client to manage and update website content independently without ongoing developer support. Role: Fullstack Developer.",
		featured: true,
	},
];
