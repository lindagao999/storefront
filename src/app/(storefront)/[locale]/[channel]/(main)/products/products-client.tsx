"use client";

import { Suspense } from "react";
import { FilterBar, ProductGrid, useProductFilters, type ProductCardData } from "@/ui/components/plp";
import { Pagination } from "@/ui/components/pagination";

interface ProductsPageClientProps {
	products: ProductCardData[];
	pageInfo: {
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		startCursor?: string | null;
		endCursor?: string | null;
	};
	totalCount?: number;
	/** Categories resolved from URL slugs (server-side) for active filter display */
	resolvedCategories?: Array<{ slug: string; id: string; name: string }>;
}

// Mock products for local styling/debugging only. Never committed.
const MOCK_PRODUCTS: ProductCardData[] = (() => {
	const useMock = process.env.NEXT_PUBLIC_USE_MOCK_PRODUCTS === "true";
	if (!useMock) return [];

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
	return names.map((name, i) => {
		const slug = name.toLowerCase().replace(/\s+/g, "-");
		const price = 29.99 + i * 15;
		return {
			id: `mock-${i + 1}`,
			name,
			slug,
			price,
			currency: "USD",
			image: `https://picsum.photos/seed/${i + 100}/600/800`,
			hoverImage: `https://picsum.photos/seed/${i + 200}/600/800`,
			href: `/en/global-store/products/${slug}`,
			badge: i % 5 === 0 ? "Sale" : i % 7 === 0 ? "New" : null,
			isBestseller: i % 4 === 0,
			colors: colors.slice(0, 2 + (i % 3)),
		};
	});
})();

function PaginationSkeleton() {
	return (
		<nav className="flex items-center justify-center gap-x-4 px-4 pt-12">
			<span className="h-10 w-24 animate-pulse rounded-md bg-muted" />
			<span className="h-10 w-24 animate-pulse rounded-md bg-muted" />
		</nav>
	);
}

export function ProductsPageClient({ products, pageInfo, resolvedCategories = [] }: ProductsPageClientProps) {
	const displayProducts = MOCK_PRODUCTS.length > 0 ? MOCK_PRODUCTS : products;
	const {
		filteredProducts,
		categoryOptions,
		colorOptions,
		sizeOptions,
		priceRanges,
		selectedCategories,
		selectedColors,
		selectedSizes,
		selectedPriceRange,
		sortValue,
		activeFilters,
		handleCategoryToggle,
		handleColorToggle,
		handleSizeToggle,
		handlePriceRangeChange,
		handleSortChange,
		handleRemoveFilter,
		handleClearFilters,
	} = useProductFilters({
		products: displayProducts,
		resolvedCategories,
		enableCategoryFilter: true,
	});

	return (
		<>
			<FilterBar
				resultCount={filteredProducts.length}
				sortValue={sortValue}
				onSortChange={handleSortChange}
				categoryOptions={categoryOptions}
				colorOptions={colorOptions}
				sizeOptions={sizeOptions}
				priceRanges={priceRanges}
				selectedCategories={selectedCategories}
				selectedColors={selectedColors}
				selectedSizes={selectedSizes}
				selectedPriceRange={selectedPriceRange}
				onCategoryToggle={handleCategoryToggle}
				onColorToggle={handleColorToggle}
				onSizeToggle={handleSizeToggle}
				onPriceRangeChange={handlePriceRangeChange}
				activeFilters={activeFilters}
				onRemoveFilter={handleRemoveFilter}
				onClearFilters={handleClearFilters}
			/>
			<div className="w-full">
				<div className="container-content py-8">
					{filteredProducts.length > 0 ? (
						<ProductGrid products={filteredProducts} />
					) : (
						<div className="py-12 text-center">
							<p className="text-lg text-muted-foreground">No products match your filters.</p>
							<button
								onClick={handleClearFilters}
								className="mt-4 text-sm font-medium text-foreground underline underline-offset-4"
							>
								Clear all filters
							</button>
						</div>
					)}
					<Suspense fallback={<PaginationSkeleton />}>
						<Pagination pageInfo={pageInfo} />
					</Suspense>
				</div>
			</div>
		</>
	);
}
