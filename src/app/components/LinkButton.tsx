import Link from "next/link";

type LinkButtonProps = Readonly<{
	href: string;
	children: React.ReactNode;
	className?: string;
}>;

export default function LinkButton({ href, children, className = "" }: LinkButtonProps) {
	return (
		<Link
			href={href}
			className={`inline-block min-w-35 px-6 py-2 border-2 rounded-4xl text-center hover:bg-teal-300/30 hover:border-teal-300 transition-colors duration-300 ${className}`}
		>
			{children}
		</Link>
	);
}
