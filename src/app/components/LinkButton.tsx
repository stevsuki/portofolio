import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type LinkButtonProps = Readonly<{
	href: string;
	children: React.ReactNode;
	className?: string;
	download?: boolean | string;
	variant?: "primary" | "secondary";
	icon?: React.ReactNode;
	withArrow?: boolean;
}>;

export default function LinkButton({
	href,
	children,
	className = "",
	download,
	variant = "secondary",
	icon,
	withArrow = false,
}: LinkButtonProps) {
	return (
		<Link
			href={href}
			download={download}
			className={`btn btn-shine ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
		>
			{icon && <span className="relative flex items-center">{icon}</span>}
			<span className="relative">{children}</span>
			{withArrow && <FiArrowRight className="btn-arrow relative" size={16} aria-hidden="true" />}
		</Link>
	);
}
