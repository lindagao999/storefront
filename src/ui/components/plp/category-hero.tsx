import Image from "next/image";
import { PLP_HERO_IMAGE_SIZES, PRODUCT_IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type BreadcrumbItem } from "@/ui/components/breadcrumbs";
import { WavePattern } from "./wave-pattern";

export type { BreadcrumbItem };

interface CategoryHeroProps {
	title: string;
	description?: string | null;
	backgroundImage?: string | null;
	breadcrumbs: BreadcrumbItem[];
	breadcrumbAriaLabel: string;
}

export function CategoryHero({
	title,
	description,
	backgroundImage,
	breadcrumbs,
	breadcrumbAriaLabel,
}: CategoryHeroProps) {
	const hasImage = !!backgroundImage;

	return (
		<section className="relative h-[180px] overflow-hidden border-b border-border">
			{/* Background */}
			<div className="absolute inset-0">
				{hasImage ? (
					<>
						<Image
							src={backgroundImage}
							alt=""
							fill
							className="object-cover"
							sizes={PLP_HERO_IMAGE_SIZES}
							quality={PRODUCT_IMAGE_QUALITY}
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
					</>
				) : (
					<div className="h-full w-full bg-gradient-to-br from-[#1a237e] via-[#1e3a8a] to-[#2b5ba9]" />
				)}
			</div>

			{/* Content */}
			<div className="container-content relative flex h-full flex-col justify-end pb-6">
				<Breadcrumbs
					items={breadcrumbs}
					ariaLabel={breadcrumbAriaLabel}
					surface={hasImage ? "pill" : "dark"}
					className="mb-3"
				/>

				<h1 className="text-balance text-h1 text-white">{title}</h1>
				{description && <p className="mt-2 max-w-lg text-pretty text-lead text-white/80">{description}</p>}
			</div>
		</section>
	);
}
