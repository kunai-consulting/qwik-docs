import { component$ } from "@builder.io/qwik";
import { Accordion } from "@qwik-ui/headless";
import {
	buildNavTree,
	checkHasOverviewPage,
	type Doc,
	type SidebarNode,
} from "./utils";

export interface SidebarProps {
	docs: Doc[];
	defaultOrder: string[];
}

export const Sidebar = component$<SidebarProps>(({ docs, defaultOrder }) => {
	const allDocs = docs || [];
	const homeDoc = allDocs.find((doc) => doc.id === "home");

	const order: string[] = homeDoc?.data?.sidebarOrder || defaultOrder;

	const navTree = buildNavTree(
		allDocs.map((doc) => ({
			...doc,
			id: doc.filePath.replace(/^docs\/|\.mdx$/g, ""),
		})),
		order,
	);
	const currentDoc = allDocs.find(
		(doc) => doc.id === window.location.pathname.split("/").pop(),
	);

	const renderSidebarNode = (node: SidebarNode) => {
		const isNested = node.id.includes("/");

		if (!node.children.length) {
			const isActive = window.location.pathname.split("/").pop() === node.id;
			return (
				<Accordion.Item
					value={node.id}
					class={isNested ? "" : "border-b border-digital-gray-90"}
				>
					<a
						href={`/docs/${node.id}`}
						class="flex w-full items-center justify-between gap-2 text-lg font-medium px-2 group text-left py-3 transition-colors duration-300"
					>
						<span
							class={`uppercase ${isNested ? "text-xs" : "text-sm"} leading-[150%] tracking-[1.92px] font-sans-semi-bold ${isActive ? "text-light-blue-20" : ""}`}
						>
							{node.title}
						</span>
					</a>
				</Accordion.Item>
			);
		}

		const currentPath = window.location.pathname.split("/").pop() || "";
		const isCurrentSection = currentPath.startsWith(node.id);
		const isExactMatch = currentPath === node.id;
		const hasOverviewPage = checkHasOverviewPage(node, allDocs);

		const trigger = (
			<Accordion.Trigger
				class="flex w-full items-center justify-between gap-2 text-lg font-medium px-2 group text-left py-3 group transition-colors duration-300 cursor-pointer"
				onClick$={() => {
					if (!hasOverviewPage) return;
					const targetRoute = `/docs/${node.id}`;
					if (window.location.pathname.split("/").pop() !== node.id) {
						window.location.href = targetRoute;
					}
				}}
			>
				<span
					class={`uppercase ${isNested ? "text-xs" : "text-sm"} leading-[150%] tracking-[1.92px] font-sans-semi-bold group-data-[open]:text-[#9FDBEF] ${isExactMatch ? "text-light-blue-20" : ""}`}
				>
					{node.title}
				</span>
				<ChevronRight class="transform transition-transform rotate-0 group-data-[open]:rotate-[90deg] min-w-[18px] group-data-[open]:text-[#9FDBEF]" />
			</Accordion.Trigger>
		);

		return (
			<Accordion.Root
				collapsible={false}
				value={isCurrentSection ? node.id : undefined}
			>
				<Accordion.Item
					value={node.id}
					class={isNested ? "" : "border-b border-digital-gray-90"}
				>
					{trigger}
					<Accordion.Content>
						<div class="pl-4">
							{node.children.map((child: SidebarNode) =>
								renderSidebarNode(child),
							)}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		);
	};

	return (
		<aside class="sticky top-[86px] hidden lg:flex flex-col col-span-1 h-[calc(100vh-4rem)] text-digital-gray-10 max-w-[450px] border-r overflow-y-auto border-digital-gray-50">
			<Accordion.Root class="flex flex-col p-2" value={currentDoc?.id}>
				{navTree.map((node: SidebarNode) => renderSidebarNode(node))}
			</Accordion.Root>
		</aside>
	);
});

const ChevronRight = (props: { class?: string }) => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={props.class}
		aria-hidden="true"
	>
		<path
			d="M6.75 13.5L11.25 9L6.75 4.5"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);
