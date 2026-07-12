import ContactCtaSection from "./components/Home/ContactCtaSection";
import ExperienceSection from "./components/Home/ExperienceSection";
import FeaturedProjectsSection from "./components/Home/FeaturedProjectsSection";
import MainSection from "./components/Home/MainSection";
import SummaryBoxSection from "./components/Home/SummaryBoxSection";
import TechStackSection from "./components/Home/TechStackSection";
import Reveal from "./components/Reveal";

export default function Home() {
	return (
		<main>
			<MainSection />
			<SummaryBoxSection />
			{/* <AboutTeaserSection /> */}
			<Reveal>
				<ExperienceSection />
			</Reveal>
			<TechStackSection />
			<Reveal>
				<FeaturedProjectsSection />
			</Reveal>
			<Reveal>
				<ContactCtaSection />
			</Reveal>
		</main>
	);
}
