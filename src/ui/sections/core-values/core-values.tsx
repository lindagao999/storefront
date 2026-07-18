"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ValueItem {
	icon: string;
	title: string;
	description: string;
}

export interface CoreValuesProps {
	heading?: string;
	subheading?: string;
	values: ValueItem[];
	className?: string;
}

export function CoreValues({
	heading = "核心价值",
	subheading = "我们致力于为您提供最优质的服务",
	values,
	className,
}: CoreValuesProps) {
	return (
		<section
			className={cn(
				"mx-10 mb-8 rounded-xl bg-gradient-to-br from-[oklch(var(--primary))] to-[oklch(var(--secondary))] px-14 py-12 text-[oklch(var(--primary-foreground))]",
				className,
			)}
		>
			<div className="mb-8 text-center">
				<h2 className="mb-2 text-[28px] font-bold">{heading}</h2>
				<p className="opacity-90">{subheading}</p>
			</div>

			<div className="grid gap-8 md:grid-cols-3">
				{values.map((value, index) => (
					<div
						key={index}
						className="rounded-xl bg-white/10 p-8 backdrop-blur-sm transition-transform hover:scale-105"
					>
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
							{value.icon}
						</div>
						<h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
						<p className="text-sm leading-relaxed opacity-90">{value.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}

// Client-side animated version with hover effects
export function CoreValuesAnimated({
	heading = "核心价值",
	subheading = "我们致力于为您提供最优质的服务",
	values,
	className,
}: CoreValuesProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<section
			className={cn(
				"mx-10 mb-8 rounded-xl bg-gradient-to-br from-[oklch(var(--primary))] to-[oklch(var(--secondary))] px-14 py-12 text-[oklch(var(--primary-foreground))]",
				className,
			)}
		>
			<div className="mb-8 text-center">
				<h2 className="mb-2 text-[28px] font-bold">{heading}</h2>
				<p className="opacity-90">{subheading}</p>
			</div>

			<div className="grid gap-8 md:grid-cols-3">
				{values.map((value, index) => (
					<div
						key={index}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
						className={cn(
							"rounded-xl bg-white/10 p-8 backdrop-blur-sm",
							"transition-all duration-300",
							hoveredIndex === index ? "scale-105 bg-white/20 shadow-lg" : "hover:scale-105",
						)}
					>
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
							{value.icon}
						</div>
						<h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
						<p className="text-sm leading-relaxed opacity-90">{value.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
