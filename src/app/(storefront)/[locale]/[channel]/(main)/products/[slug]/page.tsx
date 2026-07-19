import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ErrorBoundary } from "react-error-boundary";
import edjsHTML from "editorjs-html";
import xss from "xss";

import { executePublicGraphQL } from "@/lib/graphql";
import { ProductDetailsDocument, type ProductDetailsQuery } from "@/gql/graphql";
import { resolveLocaleFromSlug } from "@/config/locale";
import { resolveChannelCurrency } from "@/lib/channels/resolve-channel-currency";
import { buildPolicyLabelValues } from "@/lib/content";
import { getStorefrontContent } from "@/lib/content/server";
import { buildBrowsePageMetadata, buildProductJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { graphqlLanguageCodeVariables } from "@/lib/graphql-locale";
import { buildStorefrontPath } from "@/lib/storefront-path";
import { withTranslatedProductFields, pickTranslatedName } from "@/lib/saleor-translations";
import { isBestseller, BESTSELLER_ATTRIBUTE_SLUGS } from "@/lib/catalog/product-flags";
import { getAttributeValueDisplayName } from "@/ui/components/pdp/variant-selection/utils";
import { Breadcrumbs } from "@/ui/components/breadcrumbs";
import { BestsellerBadge } from "@/ui/components/ui/sale-label";
import {
	ProductAttributes,
	activeGalleryVariant,
	VariantGalleryDynamic,
	ProductRouteSkeleton,
	VariantSectionDynamic,
	VariantSectionSkeleton,
	VariantSectionError,
	getDefaultGalleryImages,
	PDP_GALLERY_LAYOUT,
	PDP_LAYOUT_CLASSES,
} from "@/ui/components/pdp";

// ============================================================================
// Mock Product Data (local styling/debugging only)
// ============================================================================

function getMockProduct(slug: string) {
	const useMock = process.env.NEXT_PUBLIC_USE_MOCK_PRODUCTS === "true";
	if (!useMock) return null;

	// Factory to build a mock product from name + index
	const makeProduct = (name: string, index: number) => {
		const imgSeed = `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}${index}`;
		const price = 29.99 + index * 15;
		return {
			name,
			slug,
			seoTitle: name,
			seoDescription: `${name}. Premium quality product built to last.`,
			description: JSON.stringify([
				{ type: "paragraph", text: `${name}. Premium quality product built to last.` },
			]),
			media: [
				{ url: `https://picsum.photos/seed/${imgSeed}/800/1066`, alt: `${name} front view`, type: "IMAGE" },
				{ url: `https://picsum.photos/seed/${imgSeed}b/800/1066`, alt: `${name} back view`, type: "IMAGE" },
			],
			thumbnail: { url: `https://picsum.photos/seed/${imgSeed}/800/1066` },
			pricing: {
				priceRange: {
					start: { gross: { amount: price, currency: "USD" } },
					stop: { gross: { amount: price, currency: "USD" } },
				},
			},
			variants: [
				{
					id: `v${index * 2 + 1}`,
					name: `${name} - Blue / M`,
					quantityAvailable: 50,
					selectionAttributes: [
						{ attribute: { slug: "color", name: "Color" }, values: [{ name: "Blue", value: "blue" }] },
						{ attribute: { slug: "size", name: "Size" }, values: [{ name: "M", value: "m" }] },
					],
				},
				{
					id: `v${index * 2 + 2}`,
					name: `${name} - Blue / L`,
					quantityAvailable: 30,
					selectionAttributes: [
						{ attribute: { slug: "color", name: "Color" }, values: [{ name: "Blue", value: "blue" }] },
						{ attribute: { slug: "size", name: "Size" }, values: [{ name: "L", value: "l" }] },
					],
				},
			],
			attributes: [
				{ attribute: { name: "Material", slug: "material" }, values: [{ name: "Premium" }] },
				{ attribute: { name: "Color", slug: "color" }, values: [{ name: "Default" }] },
				{ attribute: { name: "Size", slug: "size" }, values: [{ name: "M" }, { name: "L" }] },
			],
		} as Partial<ProductDetailsQuery["product"]>;
	};

	const productMap: Record<string, Partial<ProductDetailsQuery["product"]>> = {
		"classic-t-shirt": makeProduct("Classic T-Shirt", 0),
		"slim-fit-jeans": makeProduct("Slim Fit Jeans", 1),
		"leather-jacket": makeProduct("Leather Jacket", 2),
		"running-shoes": makeProduct("Running Shoes", 3),
		"wool-sweater": makeProduct("Wool Sweater", 4),
		"cotton-hoodie": makeProduct("Cotton Hoodie", 5),
		"denim-jacket": makeProduct("Denim Jacket", 6),
		"silk-scarf": makeProduct("Silk Scarf", 7),
		"canvas-backpack": makeProduct("Canvas Backpack", 8),
		"ray-ban-sunglasses": makeProduct("Ray-Ban Sunglasses", 9),
		"merino-beanie": makeProduct("Merino Beanie", 10),
		"linen-pants": makeProduct("Linen Pants", 11),
		"cashmere-coat": makeProduct("Cashmere Coat", 12),
		"sport-watch": makeProduct("Sport Watch", 13),
		"travel-duffel": makeProduct("Travel Duffel", 14),
		"crew-socks-pack": makeProduct("Crew Socks Pack", 15),
		"bomber-jacket": makeProduct("Bomber Jacket", 16),
		"chino-shorts": makeProduct("Chino Shorts", 17),
		"polo-shirt": makeProduct("Polo Shirt", 18),
		"ankle-boots": makeProduct("Ankle Boots", 19),
		"crossbody-bag": makeProduct("Crossbody Bag", 20),
		"flannel-shirt": makeProduct("Flannel Shirt", 21),
		"down-vest": makeProduct("Down Vest", 22),
		"yoga-pants": makeProduct("Yoga Pants", 23),
		"fleece-pullover": makeProduct("Fleece Pullover", 24),
	};

	const base = productMap[slug];
	return base ? ({ ...base } as ProductDetailsQuery["product"]) : null;
}

// ============================================================================
// Cached Data Fetching
// ============================================================================

async function getProductData(slug: string, channel: string, localeSlug: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.products, slug);

	// Use mock data for local styling/debugging
	const mockProduct = getMockProduct(decodeURIComponent(slug));
	if (mockProduct) {
		return withTranslatedProductFields(mockProduct);
	}

	// In mock mode, reject unknown slugs immediately without hitting the API
	const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK_PRODUCTS === "true";
	if (isMockMode) {
		console.log(`[getProductData] Mock mode — slug "${slug}" not found, skipping API call`);
		return null;
	}

	const result = await executePublicGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(slug),
			channel,
			...graphqlLanguageCodeVariables(localeSlug),
		},
	});

	if (!result.ok) {
		console.error(`[getProductData] Failed to fetch product ${slug} for ${channel}:`, result.error.message);
		return null;
	}

	return result.data.product ? withTranslatedProductFields(result.data.product) : null;
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata(props: {
	params: Promise<{ locale: string; slug: string; channel: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const product = await getProductData(params.slug, params.channel, params.locale);

	if (!product) {
		return { title: "Product Not Found" };
	}

	const description = product.seoDescription || product.name;
	const ogImage = product.media?.[0]?.url || product.thumbnail?.url;
	const priceAmount = product.pricing?.priceRange?.start?.gross?.amount;
	const priceCurrency = product.pricing?.priceRange?.start?.gross?.currency;

	return buildBrowsePageMetadata({
		title: product.seoTitle || product.name,
		description,
		image: ogImage,
		locale: params.locale,
		channel: params.channel,
		pathSuffix: `/products/${encodeURIComponent(params.slug)}`,
		openGraph:
			priceAmount && priceCurrency
				? {
						"product:price:amount": String(priceAmount),
						"product:price:currency": priceCurrency,
					}
				: undefined,
	});
}

// NOTE: generateStaticParams is intentionally omitted for product pages.
// All product pages are generated on-demand via ISR instead.

// ============================================================================
// Page Component
// ============================================================================

const parser = edjsHTML();

/**
 * Sync page entry — Suspense while params resolve and cached product data loads.
 * searchParams is passed through without being awaited here or in the shell.
 */
export default function ProductPage(props: {
	params: Promise<{ locale: string; slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	return (
		<Suspense fallback={<ProductRouteSkeleton surface="page" />}>
			<ProductShell params={props.params} searchParams={props.searchParams} />
		</Suspense>
	);
}

/**
 * Static product shell — only reads route params (cacheable / prerenderable).
 * Dynamic islands (gallery + variant section) read searchParams in nested Suspense.
 */
async function ProductShell({
	params: paramsPromise,
	searchParams,
}: {
	params: Promise<{ locale: string; slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const params = await paramsPromise;
	const browse = (suffix: string) => buildStorefrontPath(params.locale, params.channel, suffix);
	const [product, tPdp, tNav, content, currency] = await Promise.all([
		getProductData(params.slug, params.channel, params.locale),
		getTranslations({ locale: params.locale, namespace: "pdp" }),
		getTranslations({ locale: params.locale, namespace: "nav" }),
		getStorefrontContent(params.channel, params.locale),
		resolveChannelCurrency(params.channel),
	]);
	const policyLabels = buildPolicyLabelValues(content.policies, {
		currency,
		locale: resolveLocaleFromSlug(params.locale).bcp47,
	});

	if (!product) {
		notFound();
	}

	const descriptionHtml = parseDescription(product.description);
	const productAttributes = extractProductAttributes(product);
	const careInstructions = extractCareInstructions(product);
	const defaultImages = getDefaultGalleryImages(product);

	const breadcrumbs = [
		{ label: tPdp("breadcrumbHome"), href: browse("/") },
		...(product.category
			? [{ label: product.category.name, href: browse(`/categories/${product.category.slug}`) }]
			: []),
		{ label: product.name },
	];

	const productJsonLd = buildProductJsonLd({
		name: product.name,
		description: product.seoDescription || product.name,
		images: defaultImages.length > 0 ? defaultImages.map((img) => img.url) : undefined,
		brand: product.category?.name,
		url: browse(`/products/${product.slug}`),
		priceRange: product.pricing?.priceRange?.start?.gross
			? {
					lowPrice: product.pricing.priceRange.start.gross.amount,
					highPrice:
						product.pricing.priceRange.stop?.gross?.amount || product.pricing.priceRange.start.gross.amount,
					currency: product.pricing.priceRange.start.gross.currency,
				}
			: null,
		inStock: product.variants?.some((v) => v.quantityAvailable) ?? false,
		variantCount: product.variants?.length ?? 0,
	});

	const lcpImage = defaultImages[0];
	// Reserve mobile dots / desktop thumbs in fallback when product has multiple images
	const showGalleryChrome = defaultImages.length > 1;
	const showBestsellerBadge = isBestseller(product);
	const layout = PDP_LAYOUT_CLASSES[PDP_GALLERY_LAYOUT];
	const { Fallback: GalleryFallback } = activeGalleryVariant();
	const galleryFallback = lcpImage ? (
		<GalleryFallback
			src={lcpImage.url}
			alt={lcpImage.alt ?? product.name}
			imageCount={defaultImages.length}
			showChrome={showGalleryChrome}
		/>
	) : null;

	const productAttributesNode = (
		<ProductAttributes
			descriptionHtml={descriptionHtml}
			attributes={productAttributes}
			careInstructions={careInstructions}
			policyLabels={policyLabels}
		/>
	);

	return (
		<div className="flex min-h-screen flex-col bg-background">
			{productJsonLd && <script {...jsonLdScriptProps(productJsonLd)} />}

			{/* The browse layout (`(main)/layout.tsx`) owns the page's single <main> landmark. */}
			<div className={layout.main}>
				<div className="mb-6 hidden sm:block">
					<Breadcrumbs items={breadcrumbs} ariaLabel={tNav("breadcrumbAriaLabel")} />
				</div>

				<div className={layout.grid}>
					<div className={layout.galleryColumn}>
						<Suspense fallback={galleryFallback}>
							<VariantGalleryDynamic product={product} searchParams={searchParams} />
						</Suspense>
					</div>

					<div className={layout.infoColumn}>
						{showBestsellerBadge && (
							<div className="order-1 flex items-center gap-2">
								<BestsellerBadge />
							</div>
						)}

						<h1 className="order-2 text-balance text-h1">{product.name}</h1>

						<ErrorBoundary FallbackComponent={VariantSectionError}>
							<Suspense fallback={<VariantSectionSkeleton />}>
								<VariantSectionDynamic
									product={product}
									channel={params.channel}
									localeSlug={params.locale}
									searchParams={searchParams}
								/>
							</Suspense>
						</ErrorBoundary>

						{layout.attributesPlacement === "info" && (
							<div className="order-4 mt-6">{productAttributesNode}</div>
						)}
					</div>

					{layout.attributesPlacement === "gallery" && layout.attributesGalleryBlock && (
						<div className={layout.attributesGalleryBlock}>{productAttributesNode}</div>
					)}
				</div>
			</div>
		</div>
	);
}

// ============================================================================
// Helper Functions
// ============================================================================

function parseDescription(description: string | null | undefined): string[] | null {
	if (!description) return null;

	try {
		const parsed = parser.parse(JSON.parse(description));
		return parsed.map((html: string) => xss(html));
	} catch {
		return [xss(`<p>${description}</p>`)];
	}
}

function extractProductAttributes(product: NonNullable<ProductDetailsQuery["product"]>) {
	const variantAttributeSlugs = ["size", "color", "colour", "variant"];
	const internalAttributeSlugs = ["care-instructions", "care", ...BESTSELLER_ATTRIBUTE_SLUGS];

	return (product.attributes || [])
		.filter((attr) => attr.attribute.name)
		.filter((attr) => !variantAttributeSlugs.includes((attr.attribute.slug ?? "").toLowerCase()))
		.filter((attr) => !internalAttributeSlugs.includes((attr.attribute.slug ?? "").toLowerCase()))
		.map((attr) => ({
			name: pickTranslatedName({
				name: attr.attribute.name!,
				translation: attr.attribute.translation,
			}),
			value:
				attr.values.length === 1
					? getAttributeValueDisplayName(attr.values[0] ?? { name: "" })
					: attr.values.map((v) => getAttributeValueDisplayName(v)).filter(Boolean),
		}))
		.filter((attr) => {
			if (Array.isArray(attr.value)) return attr.value.length > 0;
			return attr.value !== "";
		});
}

function extractCareInstructions(product: NonNullable<ProductDetailsQuery["product"]>): string | null {
	const careAttr = (product.attributes || []).find(
		(attr) =>
			attr.attribute.slug === "care-instructions" ||
			attr.attribute.slug === "care" ||
			(attr.attribute.name ?? "").toLowerCase().includes("care"),
	);

	return (
		careAttr?.values
			.map((v) => getAttributeValueDisplayName(v))
			.filter(Boolean)
			.join(". ") || null
	);
}
