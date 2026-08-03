import { FiServer, FiLayout, FiUsers } from "react-icons/fi";
import { Service } from "@/types/service";

export const services: Service[] = [
	{
		title: "Backend Engineering",
		description:
			"REST APIs, system integrations, and data models built with Node.js, Express, and Golang, backed by PostgreSQL, SQL Server, and MongoDB.",
		icon: FiServer,
		skills: ["REST APIs", "Integrations", "Databases"],
	},
	{
		title: "Fullstack Development",
		description:
			"User-facing platforms in Next.js, React, and TypeScript, wired end to end with the services and content systems behind them.",
		icon: FiLayout,
		skills: ["Next.js", "React", "TypeScript"],
	},
	{
		title: "Technical Leadership",
		description:
			"Breaking scope into deliverable work, reviewing implementation, and coordinating with clients through delivery on cloud-native projects.",
		icon: FiUsers,
		skills: ["Code Review", "Scoping", "Client Comms"],
	},
];
