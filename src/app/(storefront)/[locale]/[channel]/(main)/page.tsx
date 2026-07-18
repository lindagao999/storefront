import { brandConfig } from "@/config/brand";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts } from "@/lib/catalog/get-featured-products";
import { getStorefrontContent } from "@/lib/content/server";
import { CategorySidebar, type CategoryItem } from "@/ui/components/category-sidebar/category-sidebar";
import { StatsBar } from "@/ui/sections/stats-bar/stats-bar";
import { BrandShowcase, type BrandItem } from "@/ui/sections/brand-showcase/brand-showcase";
import { NavHrefLink } from "@/ui/atoms/nav-href-link";
import { buildStorefrontPath } from "@/lib/storefront-path";

export const metadata = {
	description: brandConfig.description,
};

// Fallback categories - matching backend Saleor categories
const fallbackCategories: CategoryItem[] = [
	{ name: "Integrated Circuit", href: "/categories/integrated-circuit", productCount: 204 },
	{ name: "Connector", href: "/categories/connector", productCount: 124 },
	{ name: "Resistor", href: "/categories/resistor", productCount: 43 },
	{ name: "Diode", href: "/categories/diode", productCount: 42 },
	{ name: "Optocouplers/LED/Infrared", href: "/categories/optocouplers-led-infrared", productCount: 42 },
	{ name: "Driver", href: "/categories/driver", productCount: 34 },
	{ name: "Relay/Transformer", href: "/categories/relay-transformer", productCount: 31 },
	{ name: "Capacitor", href: "/categories/capacitor", productCount: 30 },
	{ name: "Memory", href: "/categories/memory", productCount: 26 },
	{
		name: "Processors and Microcontrollers",
		href: "/categories/processors-microcontrollers",
		productCount: 24,
	},
	{ name: "Triode", href: "/categories/triode", productCount: 24 },
	{ name: "Switch", href: "/categories/switch", productCount: 21 },
	{ name: "Crystal Oscillator", href: "/categories/crystal-oscillator", productCount: 16 },
	{ name: "Ferrite Bead", href: "/categories/ferrite-bead", productCount: 16 },
	{ name: "Inductor", href: "/categories/inductor", productCount: 16 },
	{ name: "Fuse", href: "/categories/fuse", productCount: 15 },
	{ name: "Buzzer/Microphone", href: "/categories/buzzer-microphone", productCount: 7 },
	{ name: "Thyristor", href: "/categories/thyristor", productCount: 4 },
	{ name: "Power Management IC", href: "/categories/power-management-ic", productCount: 2 },
];

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

// Hot Products - 热销产品
const hotProducts = [
	{
		icon: "💻",
		model: "STM32F103C8T6",
		category: "Integrated Circuit",
		description: "ARM Cortex-M3 MCU, 72MHz, 64KB Flash",
		price: "$1.25",
		moq: "100",
		href: "/products/stm32f103c8t6",
		inStock: true,
	},
	{
		icon: "🌐",
		model: "ESP32-WROOM-32",
		category: "WiFi Module",
		description: "Dual-core WiFi & Bluetooth Module",
		price: "$2.80",
		moq: "50",
		href: "/products/esp32-wroom-32",
		inStock: true,
	},
	{
		icon: "⚡",
		model: "GRM188R71H104KA93D",
		category: "Capacitor",
		description: "MLCC 0.1uF 50V X7R 0603",
		price: "$0.015",
		moq: "1000",
		href: "/products/grm188r71h104ka93d",
		inStock: true,
	},
	{
		icon: "🔌",
		model: "USB Type-C 3.1",
		category: "Connector",
		description: "24Pin SMD USB-C Female Connector",
		price: "$0.45",
		moq: "500",
		href: "/products/usb-type-c-3-1",
		inStock: false,
	},
	{
		icon: "⚙️",
		model: "1N4148W",
		category: "Diode",
		description: "Fast Switching Diode 100V 150mA",
		price: "$0.008",
		moq: "2000",
		href: "/products/1n4148w",
		inStock: true,
	},
	{
		icon: "🔧",
		model: "L298N",
		category: "Driver",
		description: "Dual H-Bridge Motor Driver IC",
		price: "$1.50",
		moq: "100",
		href: "/products/l298n",
		inStock: true,
	},
	{
		icon: "🔄",
		model: "SRD-05VDC-SL-C",
		category: "Relay",
		description: "5V DC Power Relay 10A 250VAC",
		price: "$0.35",
		moq: "500",
		href: "/products/srd-05vdc-sl-c",
		inStock: true,
	},
	{
		icon: "💾",
		model: "AT24C256",
		category: "Memory",
		description: "256Kbit I2C EEPROM 1MHz",
		price: "$0.28",
		moq: "500",
		href: "/products/at24c256",
		inStock: true,
	},
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
	let collectionSlug = "featured-products";
	let limit = 8;

	try {
		const content = await getStorefrontContent(channel, locale);
		const { featuredCollection } = content.surfaces.homepage;

		collectionSlug = featuredCollection.collectionSlug;
		limit = featuredCollection.limit;
	} catch (e) {
		console.error("[Homepage] Failed to load content, using defaults:", e);
	}

	try {
		await getFeaturedProducts(channel, locale, limit, collectionSlug);
	} catch (e) {
		console.error("[Homepage] Failed to load products:", e);
	}

	// Fetch categories from Saleor (fallback to hardcoded if API fails)
	let categoryItems: CategoryItem[] = fallbackCategories;
	// TODO: Uncomment after running pnpm generate
	// try {
	// 	const categories = await getAllCategories(locale);
	// 	categoryItems = categories.map((cat) => ({
	// 		name: cat.name,
	// 		href: `/categories/${cat.slug}`,
	// 	}));
	// } catch (e) {
	// 	console.error("[Homepage] Failed to load categories:", e);
	// }

	return (
		<>
			{/* Hero Section */}
			<div className="mx-10 mt-6 flex gap-6">
				<CategorySidebar
					categories={categoryItems}
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

			{/* Hot Products - 热销产品 */}
			<section className="mx-10 mb-20 mt-10">
				<div className="mb-8 flex items-center justify-between">
					<h2 className="text-[28px] font-bold text-[#1a237e]">{t("hotProducts")}</h2>
					<NavHrefLink
						href="/products"
						className="text-sm font-medium text-[#2b5ba9] hover:text-[#1a237e] hover:underline"
					>
						{t("viewAll")}
					</NavHrefLink>
				</div>
				<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
					{hotProducts.map((product, index) => (
						<NavHrefLink
							key={index}
							href={product.href}
							className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
						>
							{/* 库存状态标签 */}
							<span
								className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
							>
								{product.inStock ? t("inStock") : t("limited")}
							</span>

							{/* 产品图片占位 */}
							<div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-50 text-4xl">
								{product.icon}
							</div>

							{/* 产品信息 */}
							<div className="space-y-2">
								<div className="text-xs text-muted-foreground">{product.category}</div>
								<h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-[#1a237e]">
									{product.model}
								</h3>
								<p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
								<div className="flex items-center justify-between pt-2">
									<span className="text-lg font-bold text-[#1a237e]">{product.price}</span>
									<span className="text-xs text-muted-foreground">MOQ: {product.moq}</span>
								</div>
							</div>
						</NavHrefLink>
					))}
				</div>
			</section>

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
