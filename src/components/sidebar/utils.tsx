export interface SidebarNode {
	id: string;
	title: string;
	children: SidebarNode[];
}

export interface Doc {
	path: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	frontmatter: any;
}

export function buildNavTree(docs: Doc[], order: string[]) {
	const tree: SidebarNode[] = [];

	// First, create top-level sections based on the order
	for (const section of order) {
		// Adjust path matching to account for /docs/ prefix
		const sectionPath = `/docs/${section}`;
		const sectionDocs = docs.filter((doc) => {
			const cleanPath = doc.path.replace(".mdx", "");
			return cleanPath.startsWith(sectionPath);
		});

		if (sectionDocs.length > 0) {
			const node: SidebarNode = {
				id: section,
				title: formatTitle(section),
				children: [],
			};

			// Find the overview/index page for this section
			const overviewDoc = sectionDocs.find(
				(doc) => doc.path === `/docs/${section}/overview.mdx`,
			);
			if (overviewDoc) {
				node.title = overviewDoc.frontmatter?.title || formatTitle(section);
			}

			// Add child pages
			for (const doc of sectionDocs.filter(
				(doc) => doc.path !== `/docs/${section}/overview.mdx`,
			)) {
				const parts = doc.path
					.replace("/docs/", "")
					.replace(".mdx", "")
					.split("/");

				if (parts.length === 2) {
					// Direct child of section
					node.children.push({
						id: `${parts[0]}/${parts[1]}`,
						title: doc.frontmatter?.title || formatTitle(parts[1]),
						children: [],
					});
				}
			}

			// Sort children alphabetically or by custom order if specified
			node.children.sort((a, b) => a.title.localeCompare(b.title));
			tree.push(node);
		}
	}

	return tree;
}

function formatTitle(id: string): string {
	return id
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function checkHasOverviewPage(
	node: SidebarNode,
	allDocs: Doc[],
): boolean {
	return allDocs.some((doc) => doc.path === node.id);
}
