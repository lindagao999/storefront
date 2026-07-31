"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Layers } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export interface CategoryItem {
	id?: string;
	name: string;
	href: string;
	children?: CategoryItem[];
	productCount?: number;
}

export interface CategorySidebarProps {
	heading?: string;
	categories: CategoryItem[];
	allCategoriesHref?: string;
	className?: string;
}

export function CategorySidebar({
	heading = "Products",
	categories,
	allCategoriesHref = "/products",
	className,
}: CategorySidebarProps) {
	const [flyout, setFlyout] = useState<{
		category: CategoryItem;
		top: number;
		left: number;
	} | null>(null);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleHover = useCallback((category: CategoryItem, element: HTMLElement) => {
		const rect = element.getBoundingClientRect();
		setFlyout(category.children?.length ? { category, top: rect.top, left: rect.right + 8 } : null);
	}, []);

	const handleLeave = useCallback(() => {
		setFlyout(null);
	}, []);

	return (
		<div ref={sidebarRef} className="relative" suppressHydrationWarning>
			<aside
				className={cn("w-80 shrink-0 overflow-hidden rounded-lg bg-white shadow-lg", className)}
				onMouseLeave={() => setFlyout(null)}
			>
				{/* Header */}
				<div className="flex items-center justify-between bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-4 py-3.5 text-white">
					<div className="flex items-center gap-2">
						<Layers className="h-4 w-4" />
						<span className="font-semibold">{heading}</span>
					</div>
					<LinkWithChannel
						href={allCategoriesHref}
						className="text-xs opacity-80 transition-opacity hover:underline hover:opacity-100"
						prefetch={false}
					>
						View All
					</LinkWithChannel>
				</div>

				{/* Category List */}
				<div className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent max-h-[640px] overflow-y-auto">
					<ul className="divide-y divide-gray-100">
						{categories.map((category) => (
							<li key={category.href || category.id}>
								<CategoryLink item={category} depth={0} onHover={handleHover} onLeave={handleLeave} />
							</li>
						))}
					</ul>
				</div>

				{/* 底部快捷链接 */}
				<div className="border-t border-gray-100 bg-gray-50/50 p-3">
					<div className="grid grid-cols-2 gap-2">
						<LinkWithChannel
							href="/inquiry"
							className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-medium text-[#1a237e] shadow-sm transition-all hover:bg-[#1a237e] hover:text-white"
							prefetch={false}
						>
							📋 Quick Quote
						</LinkWithChannel>
						<LinkWithChannel
							href="/sample"
							className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-medium text-[#1a237e] shadow-sm transition-all hover:bg-[#1a237e] hover:text-white"
							prefetch={false}
						>
							🧪 Free Sample
						</LinkWithChannel>
					</div>
				</div>
			</aside>

			{/* 右侧弹出子分类浮层 */}
			{flyout && flyout.category.children && flyout.category.children.length > 0 && (
				<div
					className="fixed z-50 w-80 rounded-lg border border-gray-200 bg-white shadow-xl"
					style={{ left: flyout.left, top: flyout.top }}
					onMouseEnter={() => setFlyout(flyout)}
					onMouseLeave={() => setFlyout(null)}
				>
					<div className="border-b border-gray-100 bg-gradient-to-r from-[#1a237e]/5 to-transparent px-4 py-2.5 text-sm font-semibold text-[#1a237e]">
						{flyout.category.name}
					</div>
					<div className="max-h-[480px] overflow-y-auto">
						<ul className="divide-y divide-gray-50">
							{flyout.category.children.map((child) => (
								<li key={child.href || child.id}>
									<CategoryLink item={child} depth={1} />
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

function CategoryLink({
	item,
	depth = 0,
	onHover,
	onLeave: _onLeave,
}: {
	item: CategoryItem;
	depth?: number;
	onHover?: (item: CategoryItem, element: HTMLElement) => void;
	onLeave?: () => void;
}) {
	const [showChildren, setShowChildren] = useState(false);
	const hasChildren = item.children && item.children.length > 0;
	const divRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={divRef}
			onMouseEnter={() => {
				if (depth === 0 && onHover && divRef.current) {
					onHover(item, divRef.current);
				} else {
					setShowChildren(true);
				}
			}}
			onMouseLeave={() => {
				if (depth > 0) {
					setShowChildren(false);
				}
			}}
		>
			<div
				className={cn(
					"flex items-center justify-between px-4 py-3 text-sm transition-all",
					"hover:bg-gradient-to-r hover:from-[#1a237e]/5 hover:to-transparent",
					depth > 0 && "bg-gray-50/50 pl-8",
				)}
			>
				<LinkWithChannel
					href={item.href}
					className="flex flex-1 items-center gap-2 text-gray-700 transition-colors hover:text-[#1a237e]"
					prefetch={false}
				>
					{/* 缩进指示器 */}
					{depth > 0 && <span className="h-1.5 w-1.5 rounded-full bg-[#1a237e]/30" />}

					{/* 分类名称 */}
					<span className="flex-1 whitespace-normal break-words font-medium">{item.name}</span>

					{/* 产品数量徽章 */}
					{item.productCount !== undefined && (
						<span
							className={cn(
								"ml-2 rounded-full px-2 py-0.5 text-xs",
								item.productCount > 0 ? "bg-[#1a237e]/10 text-[#1a237e]" : "bg-gray-100 text-gray-400",
							)}
						>
							{item.productCount}
						</span>
					)}
				</LinkWithChannel>

				{/* 子分类指示箭头 */}
				{hasChildren && depth > 0 && (
					<ChevronRight
						className={cn(
							"ml-1 h-4 w-4 text-gray-400 transition-transform duration-200",
							showChildren && "rotate-90",
						)}
					/>
				)}
			</div>

			{/* Sub-categories (仅 depth > 0 时使用行内展开) */}
			{depth > 0 && hasChildren && showChildren && (
				<ul className="ml-4 border-l-2 border-[#1a237e]/10">
					{item.children!.map((child) => (
						<li key={child.href || child.id}>
							<CategoryLink item={child} depth={depth + 1} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
