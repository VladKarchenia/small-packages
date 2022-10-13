import { useRef, useEffect, MutableRefObject } from "react";

import { globalEventTarget } from "@/utils";

export type EventListenerOptions = {
  /** The element to listen on. Defaults to `global` (i.e. `window`). */
  element?: EventTarget | MutableRefObject<EventTarget | null> | null;
  /** Indicates events will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. */
  capture?: boolean;
  /** Indicates that the handler will be invoked immediatetly executed */
  immediate?: boolean;
  /** Indicates that the handler will never call `preventDefault()`. */
  passive?: boolean;
  /** Indicates that the handler should be invoked at most once after being added. If true, the handler would be automatically removed when invoked. */
  once?: boolean;
};

interface EventListener<T> {
  (evt?: T): void;
}

/** Provides a declarative addEventListener */
export const useEventListener = <T>(
  /** eventName - The name of the event. */
  eventName: string,
  /** A function that handles the event. */
  handler: EventListener<T>,
  /** A optional object containing `element`, `capture`, `immediate`, `passive` and `once`. */
  options: EventListenerOptions = {}
) => {
  const savedHandlerRef = useRef<EventListener<T>>();

  const { element = globalEventTarget, capture, immediate, passive, once } = options;

  useEffect(() => {
    savedHandlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const isRefObject = element && Object.prototype.hasOwnProperty.call(element, "current");
    const currentTarget = isRefObject
      ? (element as MutableRefObject<EventTarget | null>).current
      : (element as EventTarget | null);

    if (currentTarget === null || typeof currentTarget.addEventListener !== "function") {
      return;
    }

    const eventListener = (evt: Event) => {
      const event = evt as unknown as any;

      savedHandlerRef.current?.(event);
    };

    const opts = { capture, passive, once };

    if (immediate) savedHandlerRef.current?.();
    currentTarget.addEventListener(eventName, eventListener, opts);

    return () => {
      currentTarget.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, immediate, passive, once]);
};
