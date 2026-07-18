import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "inquiry" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function InquiryPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "inquiry" });

	return (
		<div className="container-content py-8 pb-16">
			{/* Breadcrumb */}
			<nav className="mb-6 text-sm">
				<span className="text-muted-foreground">{t("breadcrumbHome")}</span>
				<span className="mx-2 text-muted-foreground">›</span>
				<span className="text-foreground">{t("breadcrumbCurrent")}</span>
			</nav>

			<h1 className="mb-2 text-center text-3xl font-bold text-[#1a237e] md:text-4xl">{t("pageTitle")}</h1>
			<p className="mb-8 text-center text-muted-foreground">{t("pageSubtitle")}</p>

			<div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
				{/* Form */}
				<div className="rounded-xl bg-card p-6 shadow-sm md:p-8">
					<h2 className="mb-6 text-lg font-semibold text-[#1a237e]">{t("formTitle")}</h2>
					<form className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("companyName")}</label>
								<input
									type="text"
									placeholder={t("companyNamePlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("contactPerson")} *</label>
								<input
									type="text"
									required
									placeholder={t("contactPersonPlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("contactPhone")} *</label>
								<input
									type="tel"
									required
									placeholder={t("contactPhonePlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
								<input
									type="email"
									placeholder={t("emailPlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">
								{t("modelLabel")}{" "}
								<span className="font-normal text-muted-foreground">{t("modelLabelSmall")}</span>
							</label>
							<div className="space-y-2">
								<div className="flex gap-2">
									<input
										type="text"
										placeholder={t("modelPlaceholder")}
										className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
									/>
									<input
										type="number"
										placeholder={t("qtyPlaceholder")}
										min="1"
										className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
									/>
								</div>
							</div>
							<button type="button" className="mt-2 text-sm text-[#2b5ba9] hover:text-[#1a237e]">
								{t("addModel")}
							</button>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("brandLabel")}</label>
								<select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]">
									<option>{t("brandAny")}</option>
									<option>Murata</option>
									<option>TDK</option>
									<option>Samsung</option>
									<option>YAGEO</option>
									<option>KEMET</option>
								</select>
							</div>
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("qtyLabel")}</label>
								<select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]">
									<option>{t("qtySample")}</option>
									<option>{t("qtySmall")}</option>
									<option>{t("qtyBatch")}</option>
									<option>{t("qtyLarge")}</option>
								</select>
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("remarkLabel")}</label>
							<textarea
								rows={4}
								placeholder={t("remarkPlaceholder")}
								className="resize-vertical w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
							/>
						</div>

						<button
							type="submit"
							className="w-full rounded-md bg-[#1a237e] py-3 font-medium text-white transition-colors hover:bg-[#2b5ba9]"
						>
							{t("submit")}
						</button>
					</form>
				</div>

				{/* Sidebar */}
				<aside className="space-y-5">
					<div className="rounded-xl bg-card p-5 shadow-sm">
						<h3 className="mb-3 flex items-center gap-2 font-semibold text-[#1a237e]">
							📋 {t("tipsTitle1")}
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("tip1")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("tip2")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("tip3")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("tip4")}
							</li>
						</ul>
					</div>

					<div className="rounded-xl bg-card p-5 shadow-sm">
						<h3 className="mb-3 flex items-center gap-2 font-semibold text-[#1a237e]">
							📞 {t("tipsTitle2")}
						</h3>
						<p className="mb-1 text-sm font-medium">0755-28198292 / 28198283</p>
						<p className="text-sm text-muted-foreground">sales@anfully.com</p>
						<p className="mt-2 text-xs text-muted-foreground">{t("workTime")}</p>
					</div>

					<div className="rounded-xl bg-card p-5 shadow-sm">
						<h3 className="mb-3 flex items-center gap-2 font-semibold text-[#1a237e]">
							📊 {t("tipsTitle3")}
						</h3>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">{t("priceSample")}</span>
								<span className="font-medium text-[#1a237e]">{t("priceSampleVal")}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">{t("priceBatch")}</span>
								<span className="font-medium text-[#1a237e]">{t("priceBatchVal")}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">{t("priceLarge")}</span>
								<span className="font-medium text-[#1a237e]">{t("priceLargeVal")}</span>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
