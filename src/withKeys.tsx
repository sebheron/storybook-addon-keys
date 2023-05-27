import React from "react";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";
import { useGlobals } from "@storybook/preview-api";

import './withKeys.css'
import { PARAM_KEY } from "./constants";
import { Key } from "./components/Key";

const getStyle = (theme: string) => {
  return {
    position: 'absolute' as const,
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    top: 0,
    right: 0,
    width: 'max-content',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '5px',
  }
};

export const withKeys = (
  Story: any,
  context: StoryContext<Renderer>
) => {
  const [ keys, setKeys ] = React.useState<string[]>([])
  const [globals] = useGlobals();
  const keysAddon: boolean = globals[PARAM_KEY];
  const isInDocs: boolean = context.viewMode === "docs";
  const { theme } = context.globals;

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keysAddon && !keys.find((key) => key === event.key)) {
        setKeys((keys) => [...keys, event.key]);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (keysAddon) {
        setKeys((keys) => keys.filter((key) => key !== event.key));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysAddon]);

  return (
    <>
      {keysAddon && !isInDocs && (
        <div style={getStyle(theme)}>
            {keys.map((key) => (
                <Key key={key} value={key} />
            ))}
        </div>
      )}
      <Story/>
    </>
  )
};
