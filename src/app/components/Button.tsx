import { contactCtaContent } from "@/constants/home";

export default function Button() {
    return <button className="w-35 p-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-teal-300/30">{contactCtaContent.ctaLabel}</button>
}