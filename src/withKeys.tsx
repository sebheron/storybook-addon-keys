import React from 'react';
import type { Renderer, StoryContext } from "@storybook/types";
import { useEffect, useGlobals, useParameter, useRef, useState } from "@storybook/preview-api";

import { KeysCSS, KeyCSS } from "./styles";
import { GLOBAL_KEY, PARAMS_KEY, DEFAULT_PARAMS } from "./constants";
import { KeysConfig } from './interfaces';

type IKey = {
  value: string;
  time: number;
}

export const withKeys = (
  Story: any,
  context: StoryContext<Renderer>
) => {
  const { theme } = context.globals;
  const isInDocs: boolean = context.viewMode === "docs";

  const [globals] = useGlobals();
  const keysAddon = globals[GLOBAL_KEY];

  const userParams = useParameter(PARAMS_KEY, DEFAULT_PARAMS);
  const params: KeysConfig = { ...DEFAULT_PARAMS, ...userParams };

  const [ opacity, setOpacity ] = useState<number>(0);
  const keys = useRef<IKey[]>([]);
  const down = useRef<boolean>(false);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!keysAddon) return;
    down.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!keysAddon || event.repeat) return;
    const time = Date.now();
    const newKey: IKey = { value: event.key, time };
    const currentKeys = down.current ? [...keys.current, newKey] : [newKey];
    keys.current = currentKeys;
    down.current = true;
    setOpacity(1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0);
    }, params.duration || 800);
    return () => clearTimeout(timeout);
  }, [opacity]);
  
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keysAddon]);

  return (
    <>
      {keysAddon && !isInDocs && (
        <div style={KeysCSS(params.position, opacity)}>
            {keys.current.map((key) => (
                <div key={key.time} style={KeyCSS(params.size, params.theme ?? theme)}>
                     {(params.keyMap && params.keyMap[key.value]) || key.value}
                </div>
            ))}
        </div>
      )}
      <Story/>
    </>
  )
};
