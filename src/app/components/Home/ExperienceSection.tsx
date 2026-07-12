import ExperienceTimeline from "../ExperienceTimeline";
import { experienceContent } from "@/constants/home";

export default function ExperienceSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-10 md:p-16">
			<h2 className="text-3xl">
				{experienceContent.headingPrefix}{" "}
				<span className="text-teal-300">{experienceContent.headingHighlight}</span>
			</h2>
			<ExperienceTimeline />
		</section>
	);
}
