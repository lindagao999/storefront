import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { OrderDirection, ProductListPaginatedDocument, ProductOrderField } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { graphqlLanguageCodeVariables } from "@/lib/graphql-locale";
import { ProductGrid } from "@/ui/components/plp/product-grid";
import { toProductCardData } from "@/ui/components/plp/utils";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; channel: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "newest" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

/**
 * Newest Products - the latest 100 products added to the catalog,
 * sorted by creation date (newest first).
 */
export default async function NewestPage({
	params,
}: {
	params: Promise<{ locale: string; channel: string }>;
}) {
	const { locale, channel } = await params;
	const t = await getTranslations({ locale, namespace: "newest" });

	const result = await executePublicGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: 100,
			channel,
			sortBy: { field: ProductOrderField.CreatedAt, direction: OrderDirection.Desc },
			...graphqlLanguageCodeVariables(locale),
		},
	});

	const products =
		result.ok && result.data.products
			? result.data.products.edges.map((e) => toProductCardData(e.node, locale, channel))
			: [];

	return (
		<div className="mx-10 my-10">
			<h1 className="mb-8 text-[28px] font-bold text-[#1a237e]">{t("pageTitle")}</h1>
			{products.length > 0 ? (
				<ProductGrid locale={locale} channel={channel} products={products} desktopColumns={6} />
			) : (
				<p className="text-muted-foreground">{t("noProducts")}</p>
			)}
		</div>
	);
}
