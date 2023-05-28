import React, { CSSProperties } from "react";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";
import { useGlobals } from "@storybook/preview-api";

import { PARAM_KEY } from "./constants";
import { Key } from "./components/Key";

interface IKey {
  value: string;
  time: number;
}

interface KeyCSSProperties extends CSSProperties {
  '--sb-keyboard-key-color'?: string;
  '--sb-keyboard-key-background'?: string;
  '--sb-keyboard-key-border'?: string;
}

const getStyle = (theme: string): KeyCSSProperties => {
  return {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: '0',
    right: '0',
    width: 'max-content',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '5px',
    pointerEvents: 'none',
    '--sb-keyboard-key-color': theme === 'dark' ? '#fff' : '#000',
    '--sb-keyboard-key-background': theme === 'dark' ? '#272727' : '#e3e3e3',
    '--sb-keyboard-key-border': theme === 'dark' ? '#1a1a1a' : '#bfbfbf',
  }
};

export const withKeys = (
  Story: any,
  context: StoryContext<Renderer>
) => {
  const [ keys, setKeys ] = React.useState<IKey[]>([])
  const [globals] = useGlobals();
  const keysAddon: boolean = globals[PARAM_KEY];
  const isInDocs: boolean = context.viewMode === "docs";
  const { theme } = context.globals;

  React.useEffect(() => {
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
        <div style={getStyle(theme)}>
            {keys.map((key) => (
                <Key key={key.time} value={key.value} />
            ))}
        </div>
      )}
      <Story/>
    </>
  )
};
