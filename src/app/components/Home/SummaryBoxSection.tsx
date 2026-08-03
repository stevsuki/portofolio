import { stats } from "@/data/stats";
import Reveal from "../Reveal";
import AnimatedStatValue from "../AnimatedStatValue";
import SpotlightGroup from "../SpotlightGroup";

export default function SummaryBoxSection() {
	return (
		<section id="highlights" className="relative px-5 sm:px-8 scroll-mt-28">
			<SpotlightGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
				{stats.map((stat, index) => (
					<Reveal key={stat.label} delayMs={index * 90} variant="blur">
						<div
							data-spot
							className="card card-sheen card-hover spot flex flex-col items-center gap-2 h-full px-4 py-7 text-center"
						>
							<AnimatedStatValue
								value={stat.value}
								className="relative text-4xl sm:text-5xl font-semibold tabular-nums gradient-text"
							/>
							<p className="relative text-xs sm:text-sm font-mono uppercase tracking-[0.12em] text-muted max-w-[150px]">
								{stat.label}
							</p>
						</div>
					</Reveal>
				))}
			</SpotlightGroup>
		</section>
	);
}
