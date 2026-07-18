import { CategoriesGetAllDocument } from "@/gql/graphql";
import { graphqlLanguageCodeVariables } from "@/lib/graphql-locale";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export interface Category {
	id: string;
	name: string;
	slug: string;
}

export async function getAllCategories(localeSlug: string): Promise<Category[]> {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.categories, "all");

	const result = await executePublicGraphQL(CategoriesGetAllDocument, {
		variables: { ...graphqlLanguageCodeVariables(localeSlug) },
	});

	if (!result.ok) {
		console.error("[getAllCategories] Failed to fetch categories:", result.error.message);
		return [];
	}

	const edges = result.data.categories?.edges ?? [];
	return edges.map((edge) => {
		const node = edge.node;
		// Use translated name if available
		const name = node.translation?.name || node.name;
		return {
			id: node.id,
			name,
			slug: node.slug,
		};
	});
}
