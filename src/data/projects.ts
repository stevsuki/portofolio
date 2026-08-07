import { Project } from "@/types/project";

/**
 * Each entry below drives its card, its case-study page at /project/<slug>, and
 * its generated share card. Order matters: it sets the previous/next links.
 *
 * Only the fields present here are required. The case-study sections
 * (`context`, `contributions`, `decisions`, `outcomes`, plus `period` and
 * `team`) are optional and each renders only once filled, so a project can be
 * fleshed out one at a time. A filled entry looks like:
 *
 *   period: "Mar 2025 - Present",
 *   team: "5 engineers, 1 product owner",
 *   context:
 *     "Routing, ingress and monitoring each lived in a separate tool, so a
 *      single config change meant touching three systems and no one could say
 *      what the live state actually was.",
 *   contributions: [
 *     "Led technical direction and reviewed every change into the control layer.",
 *   ],
 *   decisions: [
 *     "Chose Golang for the control plane over Node to keep the agent a single
 *      static binary — it costs the team a second language, but the deploy story
 *      is one file.",
 *   ],
 *   outcomes: [
 *     "Config changes went from ~30 minutes across three tools to one apply.",
 *   ],
 *
 * `outcomes` is the section a reviewer weighs most, so it is worth leaving
 * empty until there is a real number to put in it — an adjective there reads
 * as a missing measurement.
 */
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
