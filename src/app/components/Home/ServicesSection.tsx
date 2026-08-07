import { services } from "@/data/services";
import { servicesContent } from "@/constants/home";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import SpotlightGroup from "../SpotlightGroup";

export default function ServicesSection() {
	return (
		<Section
			decoration={
				<div
					className="glow glow-violet glow-drift-slow w-[420px] h-[420px] top-10 right-0"
					aria-hidden="true"
				/>
			}
		>
			<Reveal>
				<SectionHeading
					eyebrow={servicesContent.eyebrow}
					prefix={servicesContent.headingPrefix}
					highlight={servicesContent.headingHighlight}
					description={servicesContent.description}
				/>
			</Reveal>

			<SpotlightGroup tilt className="grid md:grid-cols-3 gap-5 w-full">
				{services.map((service, index) => (
					<Reveal key={service.title} delayMs={index * 110} variant="blur" className="h-full">
						<article
							data-spot
							className="card card-sheen card-hover spot tilt group flex flex-col gap-4 h-full p-7"
						>
							<span className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
								<service.icon size={22} aria-hidden="true" />
							</span>
							<h3 className="relative text-xl">{service.title}</h3>
							<p className="relative text-sm leading-relaxed text-muted grow">{service.description}</p>
							<div className="relative flex flex-wrap gap-2 pt-1">
								{service.skills.map((skill) => (
									<span key={skill} className="chip">
										{skill}
									</span>
								))}
							</div>
						</article>
					</Reveal>
				))}
			</SpotlightGroup>
		</Section>
	);
}
