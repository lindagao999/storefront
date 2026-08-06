import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { executeRawGraphQL, type GraphQLResult } from "@/lib/graphql";
import { NavHrefLink } from "@/ui/atoms/nav-href-link";

// 有 logo 的品牌（slug -> 图片），其余品牌显示文字
const MANUFACTURER_LOGOS: Record<string, string> = {
	adi: "/brand-logos/analog-devices.webp",
	vishay: "/brand-logos/vishay.webp",
	microchip: "/brand-logos/microchip.webp",
	amphenol: "/brand-logos/amphenol.webp",
	nxp: "/brand-logos/nxp-semiconductors.webp",
	murata: "/brand-logos/murata.webp",
};

type BrandValue = { name: string; slug: string };

type BrandAttributeData = {
	attribute: {
		choices: {
			pageInfo: { hasNextPage: boolean; endCursor: string | null };
			edges: { node: BrandValue }[];
		};
	};
};

async function getBrandValues(): Promise<BrandValue[]> {
	const values: BrandValue[] = [];
	let after: string | null = null;

	for (let page = 0; page < 5; page++) {
		const result: GraphQLResult<BrandAttributeData> = await executeRawGraphQL<BrandAttributeData>({
			query: `query($after: String) {
				attribute(slug: "brand") {
					choices(first: 100, after: $after) {
						pageInfo { hasNextPage endCursor }
						edges { node { name slug } }
					}
				}
			}`,
			variables: { after },
		});

		if (!result.ok || !result.data?.attribute) {
			break;
		}

		for (const edge of result.data.attribute.choices.edges) {
			values.push(edge.node);
		}

		if (!result.data.attribute.choices.pageInfo.hasNextPage) {
			break;
		}
		after = result.data.attribute.choices.pageInfo.endCursor;
	}

	return values;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; channel: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "manufacturer" });

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

/**
 * All Manufacturers - list every brand from the Brand attribute.
 */
export default async function ManufacturerPage({
	params,
}: {
	params: Promise<{ locale: string; channel: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "manufacturer" });

	const brands = (await getBrandValues()).sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div className="mx-10 my-10">
			<h1 className="mb-8 text-[28px] font-bold text-[#1a237e]">{t("pageTitle")}</h1>
			<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
				{brands.map((brand) => {
					const logo = MANUFACTURER_LOGOS[brand.slug];
					return (
						<NavHrefLink
							key={brand.slug}
							href={`/search?brand=${encodeURIComponent(brand.slug)}`}
							className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
						>
							{logo ? (
								/* eslint-disable-next-line @next/next/no-img-element -- static brand logo */
								<img src={logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
							) : (
								<span className="text-center text-sm font-semibold text-gray-700">{brand.name}</span>
							)}
						</NavHrefLink>
					);
				})}
			</div>
		</div>
	);
}
