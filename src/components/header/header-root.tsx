import {
	component$,
	type PropsOf,
	Slot,
	useContextProvider,
	useSignal,
} from "@builder.io/qwik";
import { HeaderContextId } from "./header-context";
import { cn } from "~/utils/cn";

type HeaderProps = {
	isFullWidth: boolean;
	pathname: string;
} & PropsOf<"header">;

export const HeaderRoot = component$(
	({ isFullWidth, pathname, ...props }: HeaderProps) => {
		const pathnameSig = useSignal(pathname);
		const context = {
			pathnameSig,
		};

		useContextProvider(HeaderContextId, context);
		return (
			<header
				{...props}
				class={cn(
					"flex px-6 lg:px-10 justify-center sticky h-[86px] top-0 z-50 border-b",
					props.class ?? "",
				)}
			>
				<div
					class={`flex justify-between w-full items-center ${!isFullWidth ? "max-w-screen-lg" : ""}`}
				>
					<Slot />
				</div>
			</header>
		);
	},
);
