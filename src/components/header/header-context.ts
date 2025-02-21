import { type Signal, createContextId } from "@builder.io/qwik";

export interface HeaderContext {
	pathnameSig: Signal<string>;
}

export const HeaderContextId = createContextId<HeaderContext>("header-context");
