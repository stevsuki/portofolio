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
	SiRedis,
	SiApachekafka,
	SiDocker,
	SiKubernetes,
	SiNginx,
} from "react-icons/si";
import { TechStack } from "@/types/techStack";

export const techStacks: TechStack[] = [
	// Next.js and Express ship monochrome marks — leaving colour unset lets them
	// follow the theme instead of being white-on-white in light mode
	{ name: "Next.js", icon: SiNextdotjs },
	{ name: "React", icon: SiReact, color: "#61DAFB" },
	{ name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
	{ name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
	{ name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
	{ name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
	{ name: "Express.js", icon: SiExpress },
	{ name: "Golang", icon: SiGo, color: "#00ADD8" },
	{ name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
	{ name: "MongoDB", icon: SiMongodb, color: "#47A248" },
	{ name: "Redis", icon: SiRedis, color: "#FF4438" },
	// Kafka's mark is monochrome too, so it stays theme-coloured like the above
	{ name: "Kafka", icon: SiApachekafka },
	{ name: "Docker", icon: SiDocker, color: "#2496ED" },
	{ name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
	{ name: "Nginx", icon: SiNginx, color: "#009639" },
];
