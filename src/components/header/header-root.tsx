import {
	component$,
	Slot,
	useContextProvider,
	useSignal,
} from "@builder.io/qwik";
import { HeaderContextId } from "./header-context";

type HeaderProps = {
	isFullWidth: boolean;
	pathname: string;
};

export const HeaderRoot = component$(
	({ isFullWidth, pathname }: HeaderProps) => {
		const pathnameSig = useSignal(pathname);
		const context = {
			pathnameSig,
		};

		useContextProvider(HeaderContextId, context);
		return (
			<header class="flex px-6 lg:px-10 justify-center sticky h-[86px] top-0 bg-core-blue-70 z-50 border-b border-digital-gray-50">
				<div
					class={`flex justify-between w-full items-center ${!isFullWidth ? "max-w-screen-lg" : ""}`}
				>
					<Slot />
				</div>
			</header>
		);
	},
);
