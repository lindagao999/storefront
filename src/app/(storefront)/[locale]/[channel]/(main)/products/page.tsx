import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductListPaginatedDocument } from "@/gql/graphql";
import { graphqlLanguageCodeVariables } from "@/lib/graphql-locale";
import { executePublicGraphQL } from "@/lib/graphql";
import { getPaginatedListVariables } from "@/lib/utils";
import { buildBrowsePageMetadata } from "@/lib/seo";
import { getStorefrontContent } from "@/lib/content/server";
import { CategoryHero, toProductCardData } from "@/ui/components/plp";
import type { ProductCardData } from "@/ui/components/plp/product-card-data";
import { buildSortVariables, buildFilterVariables } from "@/ui/components/plp/filter-utils";
import { resolveCategorySlugsToIds } from "@/ui/components/plp/filter-utils.server";
import { buildStorefrontPath } from "@/lib/storefront-path";
import { ProductsPageClient } from "./products-client";

// Mock products for local styling/debugging only. Never committed.
const MOCK_PRODUCTS: ProductCardData[] | null = (() => {
	const useMock = process.env.NEXT_PUBLIC_USE_MOCK_PRODUCTS === "true";
	if (!useMock) return null;

	const colors = [
		{ name: "Black", hex: "#000000" },
		{ name: "White", hex: "#FFFFFF" },
		{ name: "Red", hex: "#DC2626" },
		{ name: "Blue", hex: "#2563EB" },
		{ name: "Green", hex: "#16A34A" },
	];
	const names = [
		"Classic T-Shirt",
		"Slim Fit Jeans",
		"Leather Jacket",
		"Running Shoes",
		"Wool Sweater",
		"Cotton Hoodie",
		"Denim Jacket",
		"Silk Scarf",
		"Canvas Backpack",
		"Ray-Ban Sunglasses",
		"Merino Beanie",
		"Linen Pants",
		"Cashmere Coat",
		"Sport Watch",
		"Travel Duffel",
		"Crew Socks Pack",
		"Bomber Jacket",
		"Chino Shorts",
		"Polo Shirt",
		"Ankle Boots",
		"Crossbody Bag",
		"Flannel Shirt",
		"Down Vest",
		"Yoga Pants",
		"Fleece Pullover",
	];
	return names.map((name, i) => ({
		id: `mock-${i + 1}`,
		name,
		slug: name.toLowerCase().replace(/\s+/g, "-"),
		price: 29.99 + i * 15,
		currency: "USD",
		image: `https://picsum.photos/seed/${i + 100}/600/800`,
		hoverImage: `https://picsum.photos/seed/${i + 200}/600/800`,
		href: `/en/global-store/products/${name.toLowerCase().replace(/\s+/g, "-")}`,
		badge: i % 5 === 0 ? "Sale" : i % 7 === 0 ? "New" : null,
		isBestseller: i % 4 === 0,
		colors: colors.slice(0, 2 + (i % 3)),
	}));
})();

export async function generateMetadata(props: {
	params: Promise<{ locale: string; channel: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const { surfaces } = await getStorefrontContent(params.channel, params.locale);

	return buildBrowsePageMetadata({
		title: surfaces.products.title,
		description: surfaces.products.description,
		locale: params.locale,
		channel: params.channel,
		pathSuffix: "/products",
	});
}

type PageProps = {
	params: Promise<{ locale: string; channel: string }>;
	searchParams: Promise<{
		cursor?: string | string[];
		direction?: string | string[];
		sort?: string;
		price?: string;
		colors?: string;
		sizes?: string;
		categories?: string;
	}>;
};

/**
 * Products page with Cache Components.
 * Static shell (hero) renders immediately, product grid streams in.
 */
export default async function Page(props: PageProps) {
	const params = await props.params;
	const [{ surfaces }, tListing, tNav] = await Promise.all([
		getStorefrontContent(params.channel, params.locale),
		getTranslations({ locale: params.locale, namespace: "productsListing" }),
		getTranslations({ locale: params.locale, namespace: "nav" }),
	]);
	const productsCopy = surfaces.products;

	// Breadcrumb labels are functional chrome — code-owned i18n (ADR 0002).
	const breadcrumbs = [
		{ label: tListing("breadcrumbHome"), href: buildStorefrontPath(params.locale, params.channel) },
		{
			label: tListing("breadcrumbProducts"),
			href: buildStorefrontPath(params.locale, params.channel, "/products"),
		},
	];

	return (
		<>
			{/* Static shell - renders immediately */}
			<CategoryHero
				title={productsCopy.title}
				description={productsCopy.description}
				breadcrumbs={breadcrumbs}
				breadcrumbAriaLabel={tNav("breadcrumbAriaLabel")}
			/>
			{/* Dynamic content - streams in via Suspense */}
			<Suspense fallback={<ProductsGridSkeleton />}>
				<ProductsContent params={props.params} searchParams={props.searchParams} />
			</Suspense>
		</>
	);
}

/**
 * Dynamic products content - reads searchParams at request time.
 */
async function ProductsContent({
	params: paramsPromise,
	searchParams: searchParamsPromise,
}: {
	params: Promise<{ locale: string; channel: string }>;
	searchParams: PageProps["searchParams"];
}) {
	const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);

	// Use mock data for local styling/debugging
	if (MOCK_PRODUCTS && MOCK_PRODUCTS.length > 0) {
		return (
			<ProductsPageClient
				products={MOCK_PRODUCTS}
				pageInfo={{ hasNextPage: false, hasPreviousPage: false }}
				totalCount={MOCK_PRODUCTS.length}
				resolvedCategories={[]}
			/>
		);
	}

	const paginationVariables = getPaginatedListVariables({ params: searchParams });
	const sortBy = buildSortVariables(searchParams.sort);

	// Parse category slugs from URL and resolve to IDs for server-side filtering
	const categorySlugs = searchParams.categories?.split(",").filter(Boolean) || [];
	const categoryMap = await resolveCategorySlugsToIds(categorySlugs);
	const categoryIds = Array.from(categoryMap.values()).map((c) => c.id);

	const filter = buildFilterVariables({
		priceRange: searchParams.price,
		categoryIds,
	});

	const result = await executePublicGraphQL(ProductListPaginatedDocument, {
		variables: {
			...paginationVariables,
			channel: params.channel,
			sortBy,
			filter,
			...graphqlLanguageCodeVariables(params.locale),
		},
	});

	if (!result.ok || !result.data.products) {
		notFound();
	}

	const products = result.data.products;
	const productCards = products.edges.map((e) => toProductCardData(e.node, params.locale, params.channel));

	// Build resolved categories array for the client (for active filter display)
	const resolvedCategories = categorySlugs
		.map((slug) => {
			const cat = categoryMap.get(slug);
			return cat ? { slug, id: cat.id, name: cat.name } : null;
		})
		.filter(Boolean) as { slug: string; id: string; name: string }[];

	return (
		<ProductsPageClient
			products={productCards}
			pageInfo={products.pageInfo}
			totalCount={products.totalCount ?? productCards.length}
			resolvedCategories={resolvedCategories}
		/>
	);
}

/**
 * Products grid skeleton with delayed visibility.
 * Matches ProductGrid/ProductCard dimensions to prevent layout shift.
 */
function ProductsGridSkeleton() {
	return (
		<div className="container-content animate-skeleton-delayed py-8 opacity-0">
			{/* Matches ProductGrid: grid-cols-2 lg:grid-cols-6 */}
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-6">
				{Array.from({ length: 12 }).map((_, i) => (
					<div key={i} className="animate-pulse">
						{/* Matches ProductCard: aspect-[2/3] rounded-card */}
						<div className="mb-4 aspect-[2/3] rounded-card bg-muted" />
						<div className="space-y-1.5">
							<div className="h-4 w-3/4 rounded bg-muted" />
							<div className="h-4 w-1/2 rounded bg-muted" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
