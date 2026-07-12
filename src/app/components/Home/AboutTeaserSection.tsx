import Link from "next/link";
import { aboutTeaserContent } from "@/constants/home";

export default function AboutTeaserSection() {
	return (
		<section className="flex flex-col items-center text-center gap-6 p-10 md:p-16">
			<h2 className="text-3xl">
				{aboutTeaserContent.headingPrefix}{" "}
				<span className="text-teal-300">{aboutTeaserContent.headingHighlight}</span>
			</h2>
			<p className="text-lg text-justify max-w-2xl">{aboutTeaserContent.description}</p>
			<Link
				href="/about"
				className="w-35 p-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-teal-300/30 text-center"
			>
				{aboutTeaserContent.ctaLabel}
			</Link>
		</section>
	);
}
