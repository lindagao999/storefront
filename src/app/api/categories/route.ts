import { NextRequest, NextResponse } from "next/server";
import { getAllCategories } from "@/lib/catalog/get-all-categories";
import type { CategoryItem } from "@/ui/components/category-sidebar/category-sidebar";

function toCategoryItem(cat: Awaited<ReturnType<typeof getAllCategories>>[number]): CategoryItem {
	return {
		name: cat.name,
		href: `/categories/${cat.slug}`,
		productCount: cat.productCount,
		children: cat.children?.length ? cat.children.map(toCategoryItem) : undefined,
	};
}

export async function GET(request: NextRequest) {
	const channel = request.nextUrl.searchParams.get("channel") || "global-store";
	try {
		const categories = await getAllCategories(channel);
		return NextResponse.json({ categories: categories.map(toCategoryItem) });
	} catch (e) {
		console.error("[api/categories] Failed:", e);
		return NextResponse.json({ categories: [] }, { status: 500 });
	}
}
