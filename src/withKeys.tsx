import React from 'react';
import type { Renderer, StoryContext } from "@storybook/types";
import { useEffect, useGlobals, useParameter, useState } from "@storybook/preview-api";

import KeysCSS from './KeysCSS';
import { GLOBAL_KEY, PARAMS_KEY, DEFAULT_PARAMS } from "./constants";
import { Key } from "./components/Key";
import { KeysConfig } from './typings.interface';

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
            {keys.map((key) => (
                <Key key={key.time}
                     value={key.value}
                     size={params.size}
                     keyMap={params.keyMap}
                     theme={params.theme ?? theme} />
            ))}
        </div>
      )}
      <Story/>
    </>
  )
};
