import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export interface Category {
	id: string;
	name: string;
	slug: string;
	productCount?: number;
	children?: Category[];
	parentId?: string;
}

export async function getAllCategories(channel: string): Promise<Category[]> {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.categories, "all");

	// Fetch all categories using pagination (API limits first to 100)
	const allEdges: any[] = [];
	let hasNextPage = true;
	let after: string | null = null;

	while (hasNextPage) {
		const afterClause: string = after ? `, after: "${after}"` : "";
		const query = `query {
  categories(first: 100${afterClause}) {
    edges {
      node {
        id
        name
        slug
        level
        parent { id }
        products(channel: "${channel}", first: 0) { totalCount }
      }
      cursor
    }
    pageInfo { hasNextPage endCursor }
  }
}`;

		const url = process.env.NEXT_PUBLIC_SALEOR_API_URL;
		let response: Response;
		try {
			response = await fetch(url!, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query }),
			});
		} catch {
			console.warn("[getAllCategories] fetch rejected (likely prerender), returning empty");
			return [];
		}

		if (!response.ok) {
			console.error("[getAllCategories] HTTP error:", response.status);
			return [];
		}

		const json: any = await response.json();
		if (json.errors) {
			console.error("[getAllCategories] GraphQL errors:", json.errors);
			return [];
		}

		const edges = json.data?.categories?.edges ?? [];
		allEdges.push(...edges);
		hasNextPage = json.data?.categories?.pageInfo?.hasNextPage ?? false;
		after = json.data?.categories?.pageInfo?.endCursor ?? null;
	}

	console.log("[getAllCategories] fetched", allEdges.length, "categories total");

	// Build flat list first
	const flatCategories: (Category & { level: number; parentId: string | null })[] = allEdges.map(
		(edge: any) => {
			const node = edge.node;
			return {
				id: node.id,
				name: node.name,
				slug: node.slug,
				productCount: node.products?.totalCount ?? undefined,
				level: node.level,
				parentId: node.parent?.id ?? null,
			};
		},
	);

	// Build tree: group children under their parent
	const categoryMap = new Map<string, Category>();
	const topLevelCategories: Category[] = [];

	// First pass: create all entries
	for (const cat of flatCategories) {
		categoryMap.set(cat.id, {
			id: cat.id,
			name: cat.name,
			slug: cat.slug,
			productCount: cat.productCount,
			parentId: cat.parentId ?? undefined,
			children: [],
		});
	}

	// Second pass: nest children under parents
	for (const cat of flatCategories) {
		const node = categoryMap.get(cat.id)!;
		if (cat.parentId && categoryMap.has(cat.parentId)) {
			const parent = categoryMap.get(cat.parentId)!;
			parent.children!.push(node);
		} else {
			topLevelCategories.push(node);
		}
	}

	return topLevelCategories;
}
