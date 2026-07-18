import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "sample" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function SamplePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "sample" });

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
								<label className="mb-1.5 block text-sm font-medium">{t("companyName")} *</label>
								<input
									type="text"
									required
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
								<label className="mb-1.5 block text-sm font-medium">{t("email")} *</label>
								<input
									type="email"
									required
									placeholder={t("emailPlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("address")} *</label>
							<input
								type="text"
								required
								placeholder={t("addressPlaceholder")}
								className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
							/>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("sampleListTitle")}</label>
							<div className="overflow-hidden rounded-md border border-border">
								<table className="w-full text-sm">
									<thead className="bg-[#e8f0fe] text-[#1a237e]">
										<tr>
											<th className="px-3 py-2 text-left font-medium">{t("tableModel")}</th>
											<th className="px-3 py-2 text-left font-medium">{t("tableBrand")}</th>
											<th className="px-3 py-2 text-left font-medium">{t("tableQty")}</th>
											<th className="px-3 py-2 text-left font-medium">{t("tablePackage")}</th>
										</tr>
									</thead>
									<tbody>
										{[1, 2, 3].map((row) => (
											<tr key={row} className="border-b border-border last:border-b-0">
												<td className="px-3 py-2">
													<input
														type="text"
														placeholder={t("modelPlaceholder")}
														className="w-full rounded border border-input bg-background px-2 py-1 text-xs outline-none focus:border-[#1a237e]"
													/>
												</td>
												<td className="px-3 py-2">
													<input
														type="text"
														placeholder={t("brandPlaceholder")}
														className="w-full rounded border border-input bg-background px-2 py-1 text-xs outline-none focus:border-[#1a237e]"
													/>
												</td>
												<td className="px-3 py-2">
													<input
														type="number"
														defaultValue={10}
														min={1}
														className="w-16 rounded border border-input bg-background px-2 py-1 text-xs outline-none focus:border-[#1a237e]"
													/>
												</td>
												<td className="px-3 py-2">
													<input
														type="text"
														placeholder={t("packagePlaceholder")}
														className="w-full rounded border border-input bg-background px-2 py-1 text-xs outline-none focus:border-[#1a237e]"
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("applicationLabel")}</label>
							<textarea
								rows={3}
								placeholder={t("applicationPlaceholder")}
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
							📋 {t("rulesTitle")}
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("rule1")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("rule2")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("rule3")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("rule4")}
							</li>
							<li className="flex items-start gap-2">
								<span className="text-[#1a237e]">✓</span>
								{t("rule5")}
							</li>
						</ul>
					</div>

					<div className="rounded-xl bg-card p-5 shadow-sm">
						<h3 className="mb-3 flex items-center gap-2 font-semibold text-[#1a237e]">
							📞 {t("contactTitle")}
						</h3>
						<p className="mb-1 text-sm font-medium">0755-28198292 / 28198283</p>
						<p className="text-sm text-muted-foreground">sales@anfully.com</p>
						<p className="text-sm text-muted-foreground">Fifi.support@anfully.com</p>
					</div>
				</aside>
			</div>
		</div>
	);
}
