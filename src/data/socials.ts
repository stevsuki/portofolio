import { FaInstagram, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { siteConfig } from "@/constants/site";
import { Social } from "@/types/social";

export const socials: Social[] = [
	{ icon: FaInstagram, href: siteConfig.socials.instagram, label: "Instagram" },
	{ icon: FaLinkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
	{ icon: FaGithub, href: siteConfig.socials.github, label: "GitHub" },
	{ icon: FaFacebook, href: siteConfig.socials.facebook, label: "Facebook" },
];
