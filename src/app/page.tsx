import ContactCtaSection from "./components/Home/ContactCtaSection";
import ExperienceSection from "./components/Home/ExperienceSection";
import FeaturedProjectsSection from "./components/Home/FeaturedProjectsSection";
import MainSection from "./components/Home/MainSection";
import SummaryBoxSection from "./components/Home/SummaryBoxSection";
import TechStackSection from "./components/Home/TechStackSection";

export default function Home() {
	return (
		<main>
			<MainSection />
			<SummaryBoxSection />
			{/* <AboutTeaserSection /> */}
			<ExperienceSection />
			<TechStackSection />
			<FeaturedProjectsSection />
			<ContactCtaSection />
		</main>
	);
}
