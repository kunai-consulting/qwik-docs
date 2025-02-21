import { component$, Slot } from "@builder.io/qwik";

export const HeaderLogo = component$(() => {
	return (
		<a href="/" class="flex items-center gap-3">
			<Slot />
		</a>
	);
});
