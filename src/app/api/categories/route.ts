import { NextRequest, NextResponse } from "next/server";
import { getAllCategories } from "@/lib/catalog/get-all-categories";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	const channel = request.nextUrl.searchParams.get("channel") || "global-store";
	try {
		const categories = await getAllCategories(channel);
		return NextResponse.json({ categories });
	} catch (e) {
		console.error("[api/categories] Failed:", e);
		return NextResponse.json({ categories: [] }, { status: 500 });
	}
}
