import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

/** The size every social crawler expects for a large summary card */
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

// Hard-coded rather than read from the theme tokens: this renders outside the
// browser, so there is no cascade to resolve `var(--accent)` against. The
// values mirror the dark palette in globals.css, which is the theme a share
// card should always land in — previews sit on someone else's surface and a
// dark card reads as deliberate on both light and dark chat backgrounds.
const INK = "#e9eefb";
const MUTED = "#94a3b8";
const BACKGROUND = "#0a1020";
const ACCENT = "#2dd4bf";
const SKY = "#38bdf8";
const VIOLET = "#a78bfa";

const BRAND_GRADIENT = `linear-gradient(100deg, ${ACCENT}, ${SKY} 45%, ${VIOLET} 90%)`;

/** Matches `.bg-grid`, drawn as explicit rules because Satori has no support
    for tiling a gradient with `background-size`. */
const GRID_STEP = 100;

type OgImageContent = Readonly<{
	eyebrow: string;
	/** Plain lead-in of the heading — empty when the whole line is highlighted */
	title?: string;
	/** Rendered in the brand gradient, mirroring `.gradient-text` on the site */
	highlight: string;
	description: string;
}>;

/**
 * One share card for every route. Each `opengraph-image` file supplies only its
 * own copy, so the layout, palette and branding stay defined in a single place.
 */
export function renderOgImage({ eyebrow, title, highlight, description }: OgImageContent) {
	return new ImageResponse(
		(
			<div
				style={{
					position: "relative",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: "100%",
					height: "100%",
					padding: "72px 80px",
					backgroundColor: BACKGROUND,
					color: INK,
					fontFamily: "system-ui, sans-serif",
				}}
			>
				{Array.from({ length: Math.ceil(size.width / GRID_STEP) }, (_, column) => (
					<div
						key={`v${column}`}
						style={{
							position: "absolute",
							top: 0,
							left: column * GRID_STEP,
							width: 1,
							height: size.height,
							backgroundColor: "rgba(255, 255, 255, 0.045)",
						}}
					/>
				))}
				{Array.from({ length: Math.ceil(size.height / GRID_STEP) }, (_, row) => (
					<div
						key={`h${row}`}
						style={{
							position: "absolute",
							top: row * GRID_STEP,
							left: 0,
							width: size.width,
							height: 1,
							backgroundColor: "rgba(255, 255, 255, 0.045)",
						}}
					/>
				))}

				{/* Stands in for the blurred `.glow` blobs. Satori has no `filter`, but
				    a radial gradient falls off softly enough on its own.
				    Each layer spans the whole canvas rather than sitting in a blob-sized
				    box: Satori ignores `closest-side`, so a smaller box ended its
				    gradient mid-colour and cut a hard rectangle out of the background.
				    Stops fade to the background colour at zero alpha rather than to
				    `transparent`, which interpolates through black and leaves a smudge.
				    Sized explicitly rather than with `inset: 0`, which Satori does not
				    implement — the layers came out zero-sized and painted nothing. */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: size.width,
						height: size.height,
						backgroundImage: `radial-gradient(circle at 4% 0%, rgba(45, 212, 191, 0.2), rgba(10, 16, 32, 0))`,
					}}
				/>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: size.width,
						height: size.height,
						backgroundImage: `radial-gradient(circle at 100% 30%, rgba(167, 139, 250, 0.17), rgba(10, 16, 32, 0))`,
					}}
				/>

				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: 68,
								height: 68,
								borderRadius: 20,
								border: `1px solid rgba(45, 212, 191, 0.4)`,
								backgroundColor: "rgba(45, 212, 191, 0.12)",
								fontSize: 30,
								fontWeight: 700,
								letterSpacing: -1,
								color: ACCENT,
							}}
						>
							{siteConfig.initials}
						</div>
						<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
							<div style={{ fontSize: 26, fontWeight: 600 }}>{siteConfig.name}</div>
							<div style={{ fontSize: 19, color: MUTED }}>{siteConfig.role}</div>
						</div>
					</div>

					<div
						style={{
							display: "flex",
							padding: "10px 22px",
							borderRadius: 9999,
							border: "1px solid rgba(255, 255, 255, 0.14)",
							fontSize: 20,
							color: MUTED,
						}}
					>
						{siteConfig.url.replace("https://", "")}
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
					<div
						style={{
							display: "flex",
							fontSize: 21,
							letterSpacing: 4,
							textTransform: "uppercase",
							color: ACCENT,
						}}
					>
						{eyebrow}
					</div>

					<div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
						{title ? <div style={{ display: "flex" }}>{title}</div> : null}
						<div
							style={{
								display: "flex",
								backgroundImage: BRAND_GRADIENT,
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							{highlight}
						</div>
					</div>

					<div style={{ display: "flex", maxWidth: 880, fontSize: 29, lineHeight: 1.45, color: MUTED }}>
						{description}
					</div>
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					{siteConfig.shareStack.map((tech) => (
						<div
							key={tech}
							style={{
								display: "flex",
								padding: "9px 20px",
								borderRadius: 9999,
								border: "1px solid rgba(45, 212, 191, 0.3)",
								backgroundColor: "rgba(45, 212, 191, 0.1)",
								fontSize: 21,
								color: ACCENT,
							}}
						>
							{tech}
						</div>
					))}
				</div>

				{/* Brand rule along the bottom edge, the same sweep as `.gradient-text` */}
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						width: size.width,
						height: 8,
						backgroundImage: BRAND_GRADIENT,
					}}
				/>
			</div>
		),
		{ ...size }
	);
}
