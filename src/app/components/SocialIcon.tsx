import { socials } from "@/data/socials";

export default function SocialIcon() {
	return (
		<div className="flex gap-4">
			{socials.map((social) => (
				<a
					key={social.label}
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					className="w-9 h-9 border-2 rounded-full border-gray-600 hover:border-teal-300 transition-colors duration-300 cursor-pointer flex justify-center items-center"
					aria-label={social.label}
				>
					<social.icon
						size={20}
						aria-hidden="true"
						className="text-gray-600 hover:text-teal-300 transition-colors duration-300"
					/>
				</a>
			))}
		</div>
	);
}
