import { component$, type PropsOf, useStyles$ } from "@builder.io/qwik";
import { Accordion } from "@qwik-ui/headless";
import {
	buildNavTree,
	checkHasOverviewPage,
	// type Doc,
	type SidebarNode,
} from "./utils";

import styles from "./accordion.css?inline";
import { cn } from "~/utils/cn";

type SidebarProps = {
	defaultOrder: string[];
} & PropsOf<"aside">;

const docsWithPaths = import.meta.glob("/docs/**/*.mdx", { eager: true });
const docs = Object.entries(docsWithPaths).map(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	([path, module]: [string, any]) => ({
		path,
		frontmatter: module.frontmatter,
	}),
);

export const Sidebar = component$<SidebarProps>(
	({ defaultOrder, ...props }) => {
		const allDocs = docs;
		const navTree = buildNavTree(allDocs, defaultOrder);

		useStyles$(styles);

		const renderSidebarNode = (node: SidebarNode) => {
			const isNested = node.id.includes("/");

			if (!node.children.length) {
				const isActive = false;
				return (
					<Accordion.Item class="collapsible" value={node.id}>
						<a
							href={`/docs/${node.id}`}
							class="flex w-full items-center justify-between gap-2 px-2 py-3 text-left transition-colors duration-300 hover:bg-neutral-100"
						>
							<span
								class={`${isNested ? "text-xs" : "text-sm"} font-medium tracking-wide ${
									isActive ? "text-primary" : "text-neutral-800"
								}`}
							>
								{node.title}
							</span>
						</a>
					</Accordion.Item>
				);
			}

			const hasOverviewPage = checkHasOverviewPage(node, allDocs);

			const trigger = (
				<Accordion.Trigger
					class="collapsible-trigger"
					onClick$={() => {
						if (!hasOverviewPage) return;
						const targetRoute = `/docs/${node.id}`;
						window.location.href = targetRoute;
					}}
				>
					<span
						class={`${
							isNested ? "text-xs" : "text-sm"
						} font-medium tracking-wide text-neutral-800 group-data-[open]:text-primary`}
					>
						{node.title}
					</span>
					<ChevronRight class="min-w-[18px] transform rotate-0 transition-transform group-data-[open]:rotate-[90deg] group-data-[open]:text-primary" />
				</Accordion.Trigger>
			);

			return (
				<Accordion.Root collapsible={false} value={undefined}>
					<Accordion.Item class="collapsible" value={node.id}>
						{trigger}
						<Accordion.Content class="collapsible-content collapsible-content-outline">
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
			<aside {...props} class={cn("sticky top-0 h-[100vh]", props.class)}>
				<Accordion.Root>
					{navTree.map((node: SidebarNode) => renderSidebarNode(node))}
				</Accordion.Root>
			</aside>
		);
	},
);

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
