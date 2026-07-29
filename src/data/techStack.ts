import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiJavascript,
	SiTailwindcss,
	SiNodedotjs,
	SiExpress,
	SiGo,
	SiPostgresql,
	SiMongodb,
	SiDocker,
} from "react-icons/si";
import { TechStack } from "@/types/techStack";

export const techStacks: TechStack[] = [
	{ name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
	{ name: "React", icon: SiReact, color: "#61DAFB" },
	{ name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
	{ name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
	{ name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
	{ name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
	{ name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
	{ name: "Golang", icon: SiGo, color: "#00ADD8" },
	{ name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
	{ name: "MongoDB", icon: SiMongodb, color: "#47A248" },
	{ name: "Docker", icon: SiDocker, color: "#2496ED" },
];
