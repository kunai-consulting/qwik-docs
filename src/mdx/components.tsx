import type { Component, PropsOf } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

import { cn } from "~/utils/cn";

export const components: Record<string, Component> = {
  p: component$<PropsOf<"p">>(({ ...props }) => {
    return (
      <p
        {...props}
        class={cn("leading-7 [&:not(:first-child)]:mt-6", props.class)}
      >
        <Slot />
      </p>
    );
  }),
  h1: component$<PropsOf<"h1">>(({ ...props }) => {
    return (
      <h1
        {...props}
        class={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          props.class,
        )}
      >
        <Slot />
      </h1>
    );
  }),
  h2: component$<PropsOf<"h2">>(({ ...props }) => {
    return (
      <h2
        {...props}
        class={cn(
          "mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
          props.class,
        )}
      >
        <Slot />
      </h2>
    );
  }),
  h3: component$<PropsOf<"h3">>(({ ...props }) => {
    return (
      <h3
        {...props}
        class={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
          props.class,
        )}
      >
        <Slot />
      </h3>
    );
  }),
  h4: component$<PropsOf<"h4">>(({ ...props }) => {
    return (
      <h4
        {...props}
        class={cn(
          "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
          props.class,
        )}
      >
        <Slot />
      </h4>
    );
  }),
  h5: component$<PropsOf<"h5">>(({ ...props }) => {
    return (
      <h5
        {...props}
        class={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          props.class,
        )}
      >
        <Slot />
      </h5>
    );
  }),
  a: component$<PropsOf<"a">>(({ ...props }) => {
    return (
      <a
        {...props}
        class={cn(
          "font-medium text-zinc-900 underline underline-offset-4",
          props.class,
        )}
        target="_blank"
        rel="noreferrer"
      >
        <Slot />
      </a>
    );
  }),
  ul: component$<PropsOf<"ul">>(({ ...props }) => {
    return (
      <ul {...props} class={cn("my-6 ml-6 list-disc", props.class)}>
        <Slot />
      </ul>
    );
  }),
  ol: component$<PropsOf<"ol">>(({ ...props }) => {
    return (
      <ol {...props} class={cn("my-6 ml-6 list-decimal", props.class)}>
        <Slot />
      </ol>
    );
  }),
  li: component$<PropsOf<"li">>(({ ...props }) => {
    return (
      <li {...props} class={cn("mt-2", props.class)}>
        <Slot />
      </li>
    );
  }),
  blockquote: component$<PropsOf<"blockquote">>(({ ...props }) => {
    return (
      <blockquote
        {...props}
        class={cn(
          "mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
          props.class,
        )}
      >
        <Slot />
      </blockquote>
    );
  }),
  hr: component$<PropsOf<"hr">>(({ ...props }) => {
    return (
      <hr {...props} class={cn("my-4 border-zinc-200 md:my-8", props.class)} />
    );
  }),
  img: component$<PropsOf<"img">>(({ ...props }) => {
    return (
      <img
        {...props}
        class={cn("rounded-md border border-zinc-200", props.class)}
      />
    );
  }),
  pre: component$<PropsOf<"pre">>(({ ...props }) => {
    return (
      <pre
        {...props}
        class={cn("mb-4 mt-6 overflow-x-auto rounded-lg py-4", props.class)}
      >
        <Slot />
      </pre>
    );
  }),
  code: component$<PropsOf<"code">>(({ ...props }) => {
    return (
      <code
        {...props}
        class={cn(
          "relative rounded border bg-red-200  bg-opacity-25 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-600",
          props.class,
        )}
      >
        <Slot />
      </code>
    );
  }),
  table: component$<PropsOf<"table">>(({ ...props }) => {
    return (
      <table
        {...props}
        class={cn(
          "mt-6 w-full border-collapse border border-zinc-200",
          props.class,
        )}
      >
        <Slot />
      </table>
    );
  }),
  th: component$<PropsOf<"th">>(({ ...props }) => {
    return (
      <th
        {...props}
        class={cn(
          "border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
          props.class,
        )}
      >
        <Slot />
      </th>
    );
  }),
  td: component$<PropsOf<"td">>(({ ...props }) => {
    return (
      <td
        {...props}
        class={cn(
          "border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          props.class,
        )}
      >
        <Slot />
      </td>
    );
  }),
  tr: component$<PropsOf<"tr">>(({ ...props }) => {
    return (
      <tr
        {...props}
        class={cn(
          "m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
          props.class,
        )}
      />
    );
  }),
};
