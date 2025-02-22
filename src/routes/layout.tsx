import "~/mdx/mdx.css";

import { component$, Slot } from "@builder.io/qwik";
import { useLocation, type RequestHandler } from "@builder.io/qwik-city";
import { QwikLogo } from "~/assets/qwik-logo";
import { Header } from "~/components";
import { Footer } from "~/components/footer/footer";
import { Sidebar } from "~/components/sidebar/sidebar";
import { components } from "~/mdx/components";
import { MDXProvider } from "~/mdx/provider";

export const onGet: RequestHandler = async ({ cacheControl }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.dev/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	});
};

export default component$(() => {
	const location = useLocation();
	const defaultOrder = [
		"getting-started",
		"tutorials",
		"guides",
		"api-reference",
		"test-folder",
		"another-folder",
	];
	return (
		<MDXProvider components={components}>
			<main class="min-h-screen flex flex-col">
				<Header.Root
					class="bg-white"
					isFullWidth
					pathname={location.url.pathname}
				>
					<Header.Logo>
						<QwikLogo />
					</Header.Logo>
				</Header.Root>
				<div class="flex flex-1">
					<Sidebar class="hidden w-64 lg:block" defaultOrder={defaultOrder} />
					<div class="flex-1 px-4 py-8">
						<Slot />
					</div>
				</div>
				<Footer />
			</main>
		</MDXProvider>
	);
});
