import { component$, type PropsOf, Slot } from "@builder.io/qwik";

export const Footer = component$((props: PropsOf<"footer">) => {
	return (
		<footer
			class={
				"flex w-full items-center flex-col bg-white text-black px-6 py-6 font-sans"
			}
			{...props}
		>
			<Slot />
		</footer>
	);
});
