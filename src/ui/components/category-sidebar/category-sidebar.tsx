\"use client\";

import { useState, useRef, useCallback, useEffect } from \"react\";
import { cn } from \"@/lib/utils\";
import { ChevronRight, Layers } from \"lucide-react\";
import { LinkWithChannel } from \"@/ui/atoms/link-with-channel\";

export interface CategoryItem {
\tid?: string;
\tname: string;
\thref: string;
\tchildren?: CategoryItem[];
\tproductCount?: number;
}

export interface CategorySidebarProps {
\theading?: string;
\tcategories: CategoryItem[];
\tallCategoriesHref?: string;
\tclassName?: string;
}

export function CategorySidebar({
\theading = \"Products\",
\tcategories,
\tallCategoriesHref = \"/products\",
\tclassName,
}: CategorySidebarProps) {
\tconst [flyout, setFlyout] = useState<{
\t\tcategory: CategoryItem;
\t\ttop: number;
\t\tleft: number;
\t} | null>(null);

\tconst sidebarRef = useRef<HTMLDivElement>(null);

\tconst handleHover = useCallback((category: CategoryItem, element: HTMLElement) => {
\t\tconst rect = element.getBoundingClientRect();
\t\tsetFlyout(category.children?.length ? { category, top: rect.top, left: rect.right + 8 } : null);
\t}, []);

\tconst handleLeave = useCallback(() => {
\t\tsetFlyout(null);
\t}, []);

\treturn (
\t\t<div ref={sidebarRef} className=\"relative\" suppressHydrationWarning>
\t\t\t<aside
\t\t\t\tclassName={cn(\"w-80 shrink-0 overflow-hidden rounded-lg bg-white shadow-lg\", className)}
\t\t\t\tonMouseLeave={() => setFlyout(null)}
\t\t\t>
\t\t\t\t{/* Header */}
\t\t\t\t<div className=\"flex items-center justify-between bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-4 py-3.5 text-white\">
\t\t\t\t\t<div className=\"flex items-center gap-2\">
\t\t\t\t\t\t<Layers className=\"h-4 w-4\" />
\t\t\t\t\t\t<span className=\"font-semibold\">{heading}</span>
\t\t\t\t\t</div>
\t\t\t\t\t<LinkWithChannel
\t\t\t\t\t\thref={allCategoriesHref}
\t\t\t\t\t\tclassName=\"text-xs opacity-80 transition-opacity hover:underline hover:opacity-100\"
\t\t\t\t\t\tprefetch={false}
\t\t\t\t\t>
\t\t\t\t\t\tView All
\t\t\t\t\t</LinkWithChannel>
\t\t\t\t</div>

\t\t\t\t{/* Category List */}
\t\t\t\t<div className=\"scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent max-h-[640px] overflow-y-auto\">
\t\t\t\t\t<ul className=\"divide-y divide-gray-100\">
\t\t\t\t\t\t{categories.map((category) => (
\t\t\t\t\t\t\t<li key={category.href || category.id}>
\t\t\t\t\t\t\t\t<CategoryLink item={category} depth={0} onHover={handleHover} onLeave={handleLeave} />
\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t))}
\t\t\t\t\t</ul>
\t\t\t\t</div>

\t\t\t\t{/* 底部快捷链接 */}
\t\t\t\t<div className=\"border-t border-gray-100 bg-gray-50/50 p-3\">
\t\t\t\t\t<div className=\"grid grid-cols-2 gap-2\">
\t\t\t\t\t\t<LinkWithChannel
\t\t\t\t\t\t\thref=\"/inquiry\"
\t\t\t\t\t\t\tclassName=\"flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-medium text-[#1a237e] shadow-sm transition-all hover:bg-[#1a237e] hover:text-white\"
\t\t\t\t\t\t\tprefetch={false}
\t\t\t\t\t\t>
\t\t\t\t\t\t\t📋 Quick Quote
\t\t\t\t\t\t</LinkWithChannel>
\t\t\t\t\t\t<LinkWithChannel
\t\t\t\t\t\t\thref=\"/sample\"
\t\t\t\t\t\t\tclassName=\"flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-medium text-[#1a237e] shadow-sm transition-all hover:bg-[#1a237e] hover:text-white\"
\t\t\t\t\t\t\tprefetch={false}
\t\t\t\t\t\t>
\t\t\t\t\t\t\t🧪 Free Sample
\t\t\t\t\t\t</LinkWithChannel>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</aside>

\t\t\t{/* 右侧弹出子分类浮层 */}
\t\t\t{flyout && flyout.category.children && flyout.category.children.length > 0 && (
\t\t\t\t<div
\t\t\t\t\tclassName=\"fixed z-50 w-80 rounded-lg border border-gray-200 bg-white shadow-xl\"
\t\t\t\t\tstyle={{ left: flyout.left, top: flyout.top }}
\t\t\t\t\tonMouseEnter={() => setFlyout(flyout)}
\t\t\t\t\tonMouseLeave={() => setFlyout(null)}
\t\t\t\t>
\t\t\t\t\t<div className=\"border-b border-gray-100 bg-gradient-to-r from-[#1a237e]/5 to-transparent px-4 py-2.5 text-sm font-semibold text-[#1a237e]\">
\t\t\t\t\t\t{flyout.category.name}
\t\t\t\t\t</div>
\t\t\t\t\t<div className=\"max-h-[480px] overflow-y-auto\">
\t\t\t\t\t\t<ul className=\"divide-y divide-gray-50\">
\t\t\t\t\t\t\t{flyout.category.children.map((child) => (
\t\t\t\t\t\t\t\t<li key={child.href || child.id}>
\t\t\t\t\t\t\t\t\t<CategoryLink item={child} depth={1} />
\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t))}
\t\t\t\t\t\t</ul>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t)}
\t\t</div>
\t);
}

function CategoryLink({
\titem,
\tdepth = 0,
\tonHover,
\tonLeave: _onLeave,
}: {
\titem: CategoryItem;
\tdepth?: number;
\tonHover?: (item: CategoryItem, element: HTMLElement) => void;
\tonLeave?: () => void;
}) {
\tconst [showChildren, setShowChildren] = useState(false);
\tconst hasChildren = item.children && item.children.length > 0;
\tconst divRef = useRef<HTMLDivElement>(null);

\treturn (
\t\t<div
\t\t\tref={divRef}
\t\t\tonMouseEnter={() => {
\t\t\t\tif (depth === 0 && onHover && divRef.current) {
\t\t\t\t\tonHover(item, divRef.current);
\t\t\t\t} else {
\t\t\t\t\tsetShowChildren(true);
\t\t\t\t}
\t\t\t}}
\t\t\tonMouseLeave={() => {
\t\t\t\tif (depth > 0) {
\t\t\t\t\tsetShowChildren(false);
\t\t\t\t}
\t\t\t}}
\t\t>
\t\t\t<div
\t\t\t\tclassName={cn(
\t\t\t\t\t\"flex items-center justify-between px-4 py-3 text-sm transition-all\",
\t\t\t\t\t\"hover:bg-gradient-to-r hover:from-[#1a237e]/5 hover:to-transparent\",
\t\t\t\t\tdepth > 0 && \"bg-gray-50/50 pl-8\",
\t\t\t\t)}
\t\t\t>
\t\t\t\t<LinkWithChannel
\t\t\t\t\thref={item.href}
\t\t\t\t\tclassName=\"flex flex-1 items-center gap-2 text-gray-700 transition-colors hover:text-[#1a237e]\"
\t\t\t\t\tprefetch={false}
\t\t\t\t>
\t\t\t\t\t{/* 缩进指示器 */}
\t\t\t\t\t{depth > 0 && <span className=\"h-1.5 w-1.5 rounded-full bg-[#1a237e]/30\" />}

\t\t\t\t\t{/* 分类名称 */}
\t\t\t\t\t<span className=\"flex-1 whitespace-normal break-words font-medium\">{item.name}</span>

\t\t\t\t\t{/* 产品数量徽章 */}
\t\t\t\t\t{item.productCount !== undefined && (
\t\t\t\t\t\t<span
\t\t\t\t\t\t\tclassName={cn(
\t\t\t\t\t\t\t\t\"ml-2 rounded-full px-2 py-0.5 text-xs\",
\t\t\t\t\t\t\t\titem.productCount > 0 ? \"bg-[#1a237e]/10 text-[#1a237e]\" : \"bg-gray-100 text-gray-400\",
\t\t\t\t\t\t\t)}
\t\t\t\t\t\t>
\t\t\t\t\t\t\t{item.productCount}
\t\t\t\t\t\t</span>
\t\t\t\t\t)}
\t\t\t\t</LinkWithChannel>

\t\t\t\t{/* 子分类指示箭头 */}
\t\t\t\t{hasChildren && depth > 0 && (
\t\t\t\t\t<ChevronRight
\t\t\t\t\t\tclassName={cn(
\t\t\t\t\t\t\t\"ml-1 h-4 w-4 text-gray-400 transition-transform duration-200\",
\t\t\t\t\t\t\tshowChildren && \"rotate-90\",
\t\t\t\t\t\t)}
\t\t\t\t\t/>
\t\t\t\t)}
\t\t\t</div>

\t\t\t{/* Sub-categories (仅 depth > 0 时使用行内展开) */}
\t\t\t{depth > 0 && hasChildren && showChildren && (
\t\t\t\t<ul className=\"ml-4 border-l-2 border-[#1a237e]/10\">
\t\t\t\t\t{item.children!.map((child) => (
\t\t\t\t\t\t<li key={child.href || child.id}>
\t\t\t\t\t\t\t<CategoryLink item={child} depth={depth + 1} />
\t\t\t\t\t\t</li>
\t\t\t\t\t))}
\t\t\t\t</ul>
\t\t\t)}
\t\t</div>
\t);
}

/**
 * Client-side loader: fetches categories after mount so the server always
 * renders the skeleton — no hydration mismatch possible.
 */
export function CategorySidebarClient({
\tchannel,
\theading = \"Products\",
\tallCategoriesHref = \"/products\",
\tclassName,
}: {
\tchannel: string;
\theading?: string;
\tallCategoriesHref?: string;
\tclassName?: string;
}) {
\tconst [items, setItems] = useState<CategoryItem[]>([]);
\tconst [loading, setLoading] = useState(true);

\tuseEffect(() => {
\t\tlet cancelled = false;
\t\tfetch(`/api/categories?channel=${encodeURIComponent(channel)}`)
\t\t\t.then((res) => res.json())
\t\t\t.then((data: unknown) => {
\t\t\t\tif (!cancelled) {
\t\t\t\t\tconst result = data as { categories: CategoryItem[] };
\t\t\t\t\tsetItems(result.categories ?? []);
\t\t\t\t\tsetLoading(false);
\t\t\t\t}
\t\t\t})
\t\t\t.catch(() => {
\t\t\t\tif (!cancelled) {
\t\t\t\t\tsetLoading(false);
\t\t\t\t}
\t\t\t});
\t\treturn () => {
\t\t\tcancelled = true;
\t\t};
\t}, [channel]);

\tif (loading) {
\t\treturn (
\t\t\t<div className={cn(\"w-80 shrink-0 overflow-hidden rounded-lg bg-white shadow-lg\", className)} suppressHydrationWarning>
\t\t\t\t<div className=\"h-[52px] animate-pulse bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] opacity-40\" />
\t\t\t\t{[...Array(8)].map((_, i) => (
\t\t\t\t\t<div key={i} className=\"h-12 animate-pulse border-b border-gray-100 px-4 py-3\">
\t\t\t\t\t\t<div className=\"h-4 w-3/4 rounded bg-gray-200\" />
\t\t\t\t\t</div>
\t\t\t\t))}
\t\t\t</div>
\t\t);
\t}

\treturn (
\t\t<CategorySidebar
\t\t\tcategories={items}
\t\t\theading={heading}
\t\t\tallCategoriesHref={allCategoriesHref}
\t\t\tclassName={className}
\t\t/>
\t);
}

