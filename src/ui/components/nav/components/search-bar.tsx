import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { buildStorefrontPath } from "@/lib/storefront-path";

export const SearchBar = ({
	locale,
	channel,
	placeholder,
	srOnlyLabel,
}: {
	locale: string;
	channel: string;
	placeholder: string;
	srOnlyLabel: string;
}) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`${buildStorefrontPath(locale, channel, "/search")}?query=${encodeURIComponent(search)}`);
		}
	}

	return (
		<form action={onSubmit} className="group relative w-full max-w-md">
			<label className="relative block">
				<span className="sr-only">{srOnlyLabel}</span>
				{/* Search icon */}
				<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
					<SearchIcon
						className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground"
						aria-hidden
					/>
				</span>
				{/* Input */}
				<input
					type="text"
					name="search"
					placeholder={placeholder}
					autoComplete="off"
					required
					className="h-10 w-full rounded-lg border border-border/60 bg-background py-2 pl-11 pr-4 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-[#1a237e]/30 hover:shadow-md focus:border-[#1a237e] focus:bg-background focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20"
				/>
			</label>
		</form>
	);
};
