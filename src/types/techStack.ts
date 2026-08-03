import { IconType } from "react-icons";

export type TechStack = {
	name: string;
	icon: IconType;
	/** Brand colour. Omitted for monochrome marks, which follow the theme's text colour. */
	color?: string;
};
