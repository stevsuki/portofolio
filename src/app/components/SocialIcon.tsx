import { socials } from "@/data/socials";

export default function SocialIcon() {
	return (
		<div className="flex gap-3">
			{socials.map((social) => (
				<a
					key={social.label}
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					className="group relative flex justify-center items-center w-10 h-10 overflow-hidden rounded-full border border-line text-muted hover:text-accent hover:border-accent/60 hover:-translate-y-1 transition-all duration-300"
					aria-label={social.label}
				>
					<span
						className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-300"
						aria-hidden="true"
					/>
					<social.icon size={18} aria-hidden="true" className="relative" />
				</a>
			))}
		</div>
	);
}
