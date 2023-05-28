import React from 'react';
import type { Renderer, StoryContext } from "@storybook/types";
import { useEffect, useGlobals, useParameter, useState } from "@storybook/preview-api";

import { KeysCSS, KeyCSS, KeyAnimation } from "./styles";
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

  const [ keys, setKeys ] = useState<IKey[]>([])
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!keysAddon || event.repeat) return;
      const time = Date.now();
      setKeys((keys) => [...keys, { value: event.key, time }]);
      setTimeout(() => {
        setKeys((keys) => keys.filter((key) => key.time !== time));
      }, 1000);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keysAddon]);

  return (
    <>
      {keysAddon && !isInDocs && (
        <div style={KeysCSS(params.position)}>
            <style>{KeyAnimation()}</style>
            {keys.map((key) => (
                <div key={key.time} style={KeyCSS(params.size, params.theme ?? theme, params.duration)}>
                     {(params.keyMap && params.keyMap[key.value]) || key.value}
                </div>
            ))}
        </div>
      )}
      <Story/>
    </>
  )
};
