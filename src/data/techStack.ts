import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiFlutter,
	SiKotlin,
	SiSwift,
	SiFirebase,
} from "react-icons/si";
import { TechStack } from "@/types/techStack";

export const techStacks: TechStack[] = [
	{ name: "React", icon: SiReact, color: "#61DAFB" },
	{ name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
	{ name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
	{ name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
	{ name: "Flutter", icon: SiFlutter, color: "#02569B" },
	{ name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
	{ name: "Swift", icon: SiSwift, color: "#F05138" },
	{ name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
];
