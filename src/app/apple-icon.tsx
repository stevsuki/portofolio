import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

export const size = {
	width: 180,
	height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "white",
					fontSize: 112,
					fontWeight: 700,
					letterSpacing: -5,
					color: "#0d9488",
					fontFamily: "system-ui, sans-serif",
				}}
			>
				{siteConfig.initials}
			</div>
		),
		{ ...size }
	);
}
