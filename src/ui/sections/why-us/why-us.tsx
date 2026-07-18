"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface WhyUsItem {
	icon: string;
	title: string;
	description: string;
	gradientColors?: [string, string];
}

export interface WhyUsProps {
	heading?: string;
	subheading?: string;
	items: WhyUsItem[];
	className?: string;
}

const defaultGradients: [string, string][] = [
	["oklch(var(--primary))", "oklch(var(--secondary))"],
	["oklch(var(--inverse))", "oklch(var(--inverse-subtle))"],
	["oklch(0.55 0.12 200)", "oklch(0.60 0.12 200)"],
	["oklch(0.50 0.15 280)", "oklch(0.55 0.15 280)"],
	["oklch(0.55 0.18 25)", "oklch(0.60 0.18 25)"],
	["oklch(0.50 0.12 160)", "oklch(0.55 0.12 160)"],
];

export function WhyUs({
	heading = "为什么选择我们",
	subheading = "专业服务，品质保障",
	items,
	className,
}: WhyUsProps) {
	return (
		<section
			className={cn(
				"mx-10 mb-8 rounded-2xl bg-gradient-to-br from-muted/50 to-secondary/10 px-14 py-14",
				"relative overflow-hidden",
				className,
			)}
		>
			{/* Decorative background */}
			<div className="bg-[oklch(var(--primary))]/[0.03] pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full" />

			<div className="relative z-10 mb-12 text-center">
				<h2 className="mb-3 text-[32px] font-bold text-[oklch(var(--primary))]">{heading}</h2>
				<p className="text-base text-muted-foreground">{subheading}</p>
			</div>

			<div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{items.map((item, index) => {
					const gradient = item.gradientColors || defaultGradients[index % defaultGradients.length];
					return <WhyUsCard key={index} item={item} gradient={gradient} />;
				})}
			</div>
		</section>
	);
}

function WhyUsCard({ item, gradient }: { item: WhyUsItem; gradient: [string, string] }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={cn(
				"group rounded-2xl bg-card p-9 text-center",
				"border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
				"transition-all duration-300",
				isHovered ? "-translate-y-2 shadow-[0_12px_40px_rgba(26,35,126,0.12)]" : "",
			)}
		>
			<div
				className={cn(
					"mb-5 ml-auto mr-auto flex h-20 w-20 items-center justify-center rounded-2xl text-[36px]",
					"shadow-[0_8px_24px_rgba(26,35,126,0.25)]",
					"transition-transform duration-300",
					isHovered ? "scale-110" : "",
				)}
				style={{
					background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
				}}
			>
				{item.icon}
			</div>
			<h4 className="mb-3 text-lg font-semibold text-[oklch(var(--primary))]">{item.title}</h4>
			<p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
		</div>
	);
}
