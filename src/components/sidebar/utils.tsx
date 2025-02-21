export interface SidebarNode {
	id: string;
	title: string;
	children: SidebarNode[];
}

export interface Doc {
	id: string;
	filePath: string;
	data?: {
		sidebarOrder?: string[];
		title?: string;
	};
}

export function buildNavTree(docs: Doc[], order: string[]) {
	const tree: SidebarNode[] = [];

	// First, create top-level sections based on the order
	for (const section of order) {
		const sectionDocs = docs.filter(
			(doc) => doc.id.startsWith(`${section}/`) || doc.id === section,
		);
		if (sectionDocs.length > 0) {
			const node: SidebarNode = {
				id: section,
				title: formatTitle(section),
				children: [],
			};

			// Find the overview/index page for this section
			const overviewDoc = sectionDocs.find((doc) => doc.id === section);
			if (overviewDoc) {
				node.title = overviewDoc.data?.title || formatTitle(section);
			}

			// Add child pages
			for (const doc of sectionDocs.filter((doc) => doc.id !== section)) {
				const parts = doc.id.split("/");
				if (parts.length === 2) {
					// Direct child of section
					node.children.push({
						id: doc.id,
						title: doc.data?.title || formatTitle(parts[1]),
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
	return allDocs.some((doc) => doc.id === node.id);
}
