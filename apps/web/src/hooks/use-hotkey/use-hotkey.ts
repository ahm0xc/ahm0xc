import { useEffect, useRef } from "react";

import type { HotkeyItemOptions } from "./parse-hotkey";
import { getHotkeyHandler, getHotkeyMatcher } from "./parse-hotkey";

export { getHotkeyHandler };
export type { HotkeyItemOptions };

export type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];

function shouldFireEvent(
  event: KeyboardEvent,
  tagsToIgnore: string[],
  triggerOnContentEditable = false
) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return (
      !event.target.isContentEditable &&
      !tagsToIgnore.includes(event.target.tagName)
    );
  }

  return true;
}

const DEFAULT_TAGS_TO_IGNORE = ["INPUT", "TEXTAREA", "SELECT"];

export function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore: string[] = DEFAULT_TAGS_TO_IGNORE,
  triggerOnContentEditable = false
) {
  const hotkeysRef = useRef(hotkeys);
  const tagsToIgnoreRef = useRef(tagsToIgnore);

  useEffect(() => {
    hotkeysRef.current = hotkeys;
    tagsToIgnoreRef.current = tagsToIgnore;
  });

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotkeysRef.current.forEach(
        ([
          hotkey,
          handler,
          options = { preventDefault: true, usePhysicalKeys: false },
        ]) => {
          if (
            getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) &&
            shouldFireEvent(
              event,
              tagsToIgnoreRef.current,
              triggerOnContentEditable
            )
          ) {
            if (options.preventDefault) {
              event.preventDefault();
            }

            handler(event);
          }
        }
      );
    };

    document.documentElement.addEventListener("keydown", keydownListener);
    return () =>
      document.documentElement.removeEventListener("keydown", keydownListener);
  }, [triggerOnContentEditable]);
}
