import Image from "next/image";
import LinkButton from "../LinkButton";
import SocialIcon from "../SocialIcon";
import { siteConfig } from "@/constants/site";
import { heroContent } from "@/constants/home";

export default function MainSection() {
	return (
		<section className="justify-center items-center p-10 md:p-16 md:flex md:justify-evenly">
			<div className="relative flex w-full h-[300px] justify-center items-center md:w-[400px] md:h-[600px] mb-10">
				<Image
					src="/assets/person.webp"
					alt="main-image"
					fill
					sizes="(max-width: 768px) calc(100vw - 5rem), 400px"
					className="object-contain"
					priority
				/>
			</div>
			<div className="flex flex-col md:w-[50%] items-center text-center md:text-start md:items-start">
				<h1 className="text-5xl">
					{heroContent.greeting} <span className="text-teal-300">{siteConfig.name}</span>
				</h1>
				<br />
				<h2 className="text-3xl">
					<span className="text-teal-300">{siteConfig.role}</span>
				</h2>
				<br />
				<p className="text-lg text-justify">{heroContent.bio}</p>
				<br />
				<SocialIcon />
				<br />
				<LinkButton href="/contact">{heroContent.ctaLabel}</LinkButton>
			</div>
		</section>
	);
}
