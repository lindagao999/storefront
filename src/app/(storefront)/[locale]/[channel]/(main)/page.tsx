import { brandConfig } from "@/config/brand";
import { getTranslations } from "next-intl/server";
import { getStorefrontContent } from "@/lib/content/server";
import { CategorySidebarClient } from "@/ui/components/category-sidebar/category-sidebar";
import { StatsBar } from "@/ui/sections/stats-bar/stats-bar";
import { BrandShowcase, type BrandItem } from "@/ui/sections/brand-showcase/brand-showcase";
import { FeaturedCollectionSection } from "@/ui/sections/featured-collection-section/featured-collection-section";
import { NavHrefLink } from "@/ui/atoms/nav-href-link";
import { buildStorefrontPath } from "@/lib/storefront-path";

export const metadata = {
	description: brandConfig.description,
};

// Default brands
const defaultBrands: BrandItem[] = [
	{
		name: "Texas Instruments",
		description: "Analog ICs, Embedded Processing",
		href: "/brands/ti",
		logo: null,
	},
	{ name: "STM32", description: "Microcontrollers, Processors", href: "/brands/stm", logo: null },
	{
		name: "ON Semiconductor",
		description: "Discrete Devices, Power Management",
		href: "/brands/on",
		logo: null,
	},
	{ name: "Murata", description: "Passive Components, Sensors", href: "/brands/murata", logo: null },
];

// Featured Manufacturers - 品牌 logo（点击进入该品牌搜索）
const featuredManufacturers = [
	{ name: "Analog Devices", href: "/search?brand=adi", logo: "/brand-logos/analog-devices.webp" },
	{ name: "Vishay", href: "/search?brand=vishay", logo: "/brand-logos/vishay.webp" },
	{ name: "Microchip", href: "/search?brand=microchip", logo: "/brand-logos/microchip.webp" },
	{ name: "Amphenol", href: "/search?brand=amphenol", logo: "/brand-logos/amphenol.webp" },
	{ name: "NXP Semiconductors", href: "/search?brand=nxp", logo: "/brand-logos/nxp-semiconductors.webp" },
	{ name: "Murata", href: "/search?brand=murata", logo: "/brand-logos/murata.webp" },
];

// Hot search keywords
const hotSearchKeywords = [
	"STM32F103",
	"ESP32",
	"Arduino",
	"Raspberry Pi",
	"NE555",
	"LM358",
	"BC547",
	"2N2222",
	"1N4148",
	"7805",
];

// Stats - English version
const defaultStatsEn = [
	{ number: "100,000+", label: "Stock SKUs" },
	{ number: "50+", label: "Partner Brands" },
	{ number: "98%", label: "In Stock Rate" },
	{ number: "24h", label: "Fast Shipping" },
];

// Stats - Chinese version
const defaultStatsZh = [
	{ number: "100,000+", label: "现货SKU" },
	{ number: "50+", label: "合作品牌" },
	{ number: "98%", label: "现货率" },
	{ number: "24h", label: "极速发货" },
];

// Core values - English version
const defaultCoreValuesEn = [
	{
		icon: "🎯",
		title: "Focus",
		description:
			"Focused on electronic component distribution, deeply rooted in MLCC, resistors, inductors and other core categories",
	},
	{
		icon: "🛡️",
		title: "Trustworthy",
		description:
			"Genuine guarantee from original manufacturers, strict quality control, full traceability system",
	},
	{
		icon: "🤝",
		title: "Long-term",
		description:
			"Adhere to long-term business philosophy, establish mutual trust partnerships with customers and suppliers",
	},
];

// Core values - Chinese version
const defaultCoreValuesZh = [
	{
		icon: "🎯",
		title: "专注",
		description: "专注于电子元器件分销，深耕MLCC、电阻、电感等核心品类",
	},
	{
		icon: "🛡️",
		title: "信赖",
		description: "原厂正品保障，严格品控，全追溯体系",
	},
	{
		icon: "🤝",
		title: "长期",
		description: "坚持长期经营理念，与客户和供应商建立互信合作",
	},
];

// Why us items - English version
const defaultWhyUsEn = [
	{
		icon: "✓",
		title: "Genuine Guarantee",
		description:
			"All materials directly from original manufacturers, no refurbishment, no counterfeit products",
	},
	{
		icon: "⚡",
		title: "Fast Response Logistics",
		description: "Warehouses in Shenzhen and Hong Kong, 1-3 day fast shipping, urgent orders prioritized",
	},
	{
		icon: "🌐",
		title: "Global Logistics Support",
		description:
			"Covering domestic and international logistics channels, supporting air, sea, and express delivery",
	},
	{
		icon: "🔧",
		title: "Professional Technical Support",
		description: "Manufacturer-certified engineers providing selection alternatives and circuit optimization",
	},
];

// Why us items - Chinese version
const defaultWhyUsZh = [
	{
		icon: "✓",
		title: "正品保证",
		description: "所有物料原厂直供，不翻新、不拆包、不售假货",
	},
	{
		icon: "⚡",
		title: "极速响应物流",
		description: "深圳香港双仓，1-3天发货，急单优先",
	},
	{
		icon: "🌐",
		title: "全球物流支持",
		description: "覆盖国内外物流渠道，支持空运、海运、快递",
	},
	{
		icon: "🔧",
		title: "专业技术支持",
		description: "原厂认证工程师，提供选型替代和电路优化",
	},
];

/**
 * Core Values Section - Server Component version (no useState)
 */
function CoreValuesSection({
	heading,
	subheading,
	values,
}: {
	heading: string;
	subheading: string;
	values: typeof defaultCoreValuesEn;
}) {
	return (
		<section className="mx-10 mb-8 rounded-xl bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] px-14 py-12 text-white">
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

/**
 * Why Us Section - Server Component version (no useState)
 */
function WhyUsSection({
	heading,
	subheading,
	items,
}: {
	heading: string;
	subheading: string;
	items: typeof defaultWhyUsEn;
}) {
	const gradients = [
		["oklch(var(--primary))", "oklch(var(--secondary))"],
		["oklch(0.55 0.12 200)", "oklch(0.60 0.12 200)"],
		["oklch(0.50 0.15 280)", "oklch(0.55 0.15 280)"],
		["oklch(0.55 0.18 25)", "oklch(0.60 0.18 25)"],
	];

	return (
		<section className="relative mx-10 mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-secondary/10 px-14 py-14">
			<div className="bg-[oklch(var(--primary))]/[0.03] pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full" />
			<div className="relative z-10 mb-12 text-center">
				<h2 className="mb-3 text-[32px] font-bold text-[#1a237e]">{heading}</h2>
				<p className="text-base text-muted-foreground">{subheading}</p>
			</div>
			<div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{items.map((item, index) => {
					const gradient = gradients[index % gradients.length];
					return (
						<div
							key={index}
							className="group rounded-2xl border border-black/[0.04] bg-card p-9 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(26,35,126,0.12)]"
						>
							<div
								className="mb-5 ml-auto mr-auto flex h-20 w-20 items-center justify-center rounded-2xl text-[36px] shadow-[0_8px_24px_rgba(26,35,126,0.25)] transition-transform duration-300 group-hover:scale-110"
								style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
							>
								{item.icon}
							</div>
							<h4 className="mb-3 text-lg font-semibold text-[#1a237e]">{item.title}</h4>
							<p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}

/**
 * Homepage — fully static with AnFully Electronics style.
 */
export default async function Page({ params }: { params: Promise<{ locale: string; channel: string }> }) {
	const { locale, channel } = await params;
	const t = await getTranslations({ locale, namespace: "home" });
	const isZh = locale === "zh";

	// Fetch data with error handling - using AnFully English version defaults
	let collectionSlug = "core-components-collection";
	let limit = 12;

	try {
		const content = await getStorefrontContent(channel, locale);
		const { featuredCollection } = content.surfaces.homepage;

		collectionSlug = featuredCollection.collectionSlug;
		limit = featuredCollection.limit;
	} catch (e) {
		console.error("[Homepage] Failed to load content, using defaults:", e);
	}

	return (
		<>
			{/* Hero Section */}
			<div className="mx-10 mt-6 flex gap-6">
				<CategorySidebarClient
					channel={channel}
					heading={t("categorySidebar")}
					allCategoriesHref={buildStorefrontPath(locale, channel, "/products")}
				/>
				<div className="flex flex-1 flex-col gap-5">
					<section
						className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-12 py-10 text-white"
						aria-labelledby="homepage-hero-heading"
						suppressHydrationWarning
					>
						<h1 id="homepage-hero-heading" className="mb-3 text-[40px] font-bold leading-tight">
							{t("heroTitle")}
						</h1>
						<p className="mb-5 text-[22px] opacity-95">{t("heroSubtitle")}</p>
						<p className="mb-8 max-w-2xl text-[15px] leading-relaxed opacity-90">{t("heroDesc")}</p>
						<div className="flex gap-4">
							<NavHrefLink
								href="/inquiry"
								className="rounded-lg bg-white px-8 py-3 text-[15px] font-semibold text-[#1a237e] transition-all hover:shadow-lg"
							>
								{t("quickQuote")}
							</NavHrefLink>
							<NavHrefLink
								href="/products"
								className="rounded-lg border-2 border-white/50 px-8 py-3 text-[15px] font-medium text-white transition-all hover:bg-white/10"
							>
								{t("viewProducts")}
							</NavHrefLink>
						</div>
					</section>
					<StatsBar stats={isZh ? defaultStatsZh : defaultStatsEn} />

					{/* 特色服务快捷入口 */}
					<div className="grid grid-cols-4 gap-4">
						<NavHrefLink
							href="/inquiry"
							className="group flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
						>
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e]/10 text-2xl transition-colors group-hover:bg-[#1a237e] group-hover:text-white">
								📋
							</div>
							<h3 className="text-sm font-semibold text-[#1a237e]">{t("serviceQuote")}</h3>
							<p className="mt-1 text-xs text-muted-foreground">{t("serviceQuoteSub")}</p>
						</NavHrefLink>
						<NavHrefLink
							href="/sample"
							className="group flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
						>
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e]/10 text-2xl transition-colors group-hover:bg-[#1a237e] group-hover:text-white">
								🧪
							</div>
							<h3 className="text-sm font-semibold text-[#1a237e]">{t("serviceSample")}</h3>
							<p className="mt-1 text-xs text-muted-foreground">{t("serviceSampleSub")}</p>
						</NavHrefLink>
						<NavHrefLink
							href="/support"
							className="group flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
						>
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e]/10 text-2xl transition-colors group-hover:bg-[#1a237e] group-hover:text-white">
								🔧
							</div>
							<h3 className="text-sm font-semibold text-[#1a237e]">{t("serviceSupport")}</h3>
							<p className="mt-1 text-xs text-muted-foreground">{t("serviceSupportSub")}</p>
						</NavHrefLink>
						<NavHrefLink
							href="/brands"
							className="group flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
						>
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e]/10 text-2xl transition-colors group-hover:bg-[#1a237e] group-hover:text-white">
								🏭
							</div>
							<h3 className="text-sm font-semibold text-[#1a237e]">{t("serviceBrand")}</h3>
							<p className="mt-1 text-xs text-muted-foreground">{t("serviceBrandSub")}</p>
						</NavHrefLink>
					</div>

					{/* 热门搜索关键词 */}
					<div className="rounded-xl bg-white p-5 shadow-sm">
						<div className="mb-3 flex items-center gap-2">
							<span className="text-[#1a237e]">🔥</span>
							<h3 className="font-semibold text-[#1a237e]">{t("hotSearch")}</h3>
						</div>
						<div className="flex flex-wrap gap-2">
							{hotSearchKeywords.map((keyword) => (
								<NavHrefLink
									key={keyword}
									href={`/search?q=${keyword}`}
									className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-[#1a237e] hover:text-white"
								>
									{keyword}
								</NavHrefLink>
							))}
						</div>
					</div>

					{/* 核心优势 */}
					<div className="grid grid-cols-3 gap-4">
						<div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] p-4 text-white">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
								✓
							</div>
							<div>
								<h4 className="text-sm font-semibold">{t("genuineGuarantee")}</h4>
								<p className="text-xs opacity-80">{t("originalDirect")}</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] p-4 text-white">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
								⚡
							</div>
							<div>
								<h4 className="text-sm font-semibold">{t("fastShipping")}</h4>
								<p className="text-xs opacity-80">{t("delivery24h")}</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] p-4 text-white">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
								🌐
							</div>
							<div>
								<h4 className="text-sm font-semibold">{t("globalLogistics")}</h4>
								<p className="text-xs opacity-80">{t("airSeaFreight")}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Hot Products - 来自后端集合（Core Components Collection） */}
			<FeaturedCollectionSection
				locale={locale}
				channel={channel}
				heading={t("hotProducts")}
				collectionSlug={collectionSlug}
				limit={limit}
				desktopColumns={6}
				width="full"
				spacing="none"
				cta={{
					label: t("viewAll"),
					href: buildStorefrontPath(locale, channel, "/products"),
				}}
				className="mx-10 mb-10 mt-10"
			/>

			{/* AI & Machine Learning Collection */}
			<FeaturedCollectionSection
				locale={locale}
				channel={channel}
				heading="AI & Machine Learning"
				collectionSlug="ai-machine-learning-collection"
				limit={limit}
				desktopColumns={6}
				width="full"
				spacing="none"
				className="mx-10 mb-10"
			/>

			{/* DIY & Hobbyist Collection */}
			<FeaturedCollectionSection
				locale={locale}
				channel={channel}
				heading="DIY & Hobbyist"
				collectionSlug="resistors-leds-sensors-breadboards-all-in-one-kit-for-makers-tinkerers-weekend-projects"
				limit={limit}
				desktopColumns={6}
				width="full"
				spacing="none"
				className="mx-10 mb-10"
			/>

			{/* Brands */}
			<div className="mb-20">
				<BrandShowcase
					heading={t("coreBrands")}
					subheading={t("coreBrandsSub")}
					brands={defaultBrands}
					viewAllHref={buildStorefrontPath(locale, channel, "/brands")}
					viewAllLabel={t("viewAll")}
				/>
			</div>

			{/* Featured Manufacturers - 品牌 logo */}
			<section className="mx-10 mb-20">
				<div className="mb-8 flex items-center justify-between">
					<h2 className="text-[28px] font-bold text-[#1a237e]">Featured Manufacturers</h2>
					<NavHrefLink
						href="/brands"
						className="text-sm font-medium text-[#2b5ba9] hover:text-[#1a237e] hover:underline"
					>
						View All Manufacturers
					</NavHrefLink>
				</div>
				<div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
					{featuredManufacturers.map((mfr) => (
						<NavHrefLink
							key={mfr.name}
							href={mfr.href}
							className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
						>
							{/* eslint-disable-next-line @next/next/no-img-element -- static brand logo */}
							<img src={mfr.logo} alt={mfr.name} className="max-h-full max-w-full object-contain" />
						</NavHrefLink>
					))}
				</div>
			</section>

			{/* Core Values - Server Component */}
			<div className="mb-20">
				<CoreValuesSection
					heading={t("focusTrustLongTerm")}
					subheading={t("focusSub")}
					values={isZh ? defaultCoreValuesZh : defaultCoreValuesEn}
				/>
			</div>

			{/* Why Us - Server Component */}
			<div className="mb-20">
				<WhyUsSection
					heading={t("whyChoose")}
					subheading={t("whyChooseSub")}
					items={isZh ? defaultWhyUsZh : defaultWhyUsEn}
				/>
			</div>

			{/* CTA */}
			<section className="mx-10 mb-8 rounded-xl bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-14 py-14 text-center text-white">
				<h2 className="mb-3 text-[32px] font-bold">{t("ctaTitle")}</h2>
				<p className="mb-6 text-base opacity-90">{t("ctaSub")}</p>
				<div className="flex justify-center gap-4">
					<NavHrefLink
						href="/inquiry"
						className="rounded-lg bg-white px-8 py-3.5 font-semibold text-[#1a237e] transition-all hover:shadow-lg"
					>
						{t("getQuote")}
					</NavHrefLink>
					<NavHrefLink
						href="/sample"
						className="rounded-lg border-2 border-white/50 px-8 py-3.5 font-medium transition-all hover:bg-white/10"
					>
						{t("freeSamples")}
					</NavHrefLink>
				</div>
			</section>
		</>
	);
}
