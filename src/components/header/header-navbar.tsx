import { component$, Slot } from "@builder.io/qwik";

export const HeaderNavbar = component$(() => {
	return (
		<nav class="flex items-center gap-4">
			<Slot />
		</nav>
	);
});
