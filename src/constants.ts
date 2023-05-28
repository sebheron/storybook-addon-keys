import { KeyMap, KeysConfig } from "./interfaces";

export const ADDON_ID = "storybook/keys";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const GLOBAL_KEY = `keys-addon`;
export const PARAMS_KEY = 'keys';

const DEFAULT_KEY_MAP: KeyMap = {
    ' ': 'Space',
    'Enter': ' ↵ ',
    'ArrowUp': ' ↑ ',
    'ArrowDown': ' ↓ ',
    'ArrowLeft': ' ← ',
    'ArrowRight': ' → ',
    'Escape': 'Esc',
    'Backspace': ' ⌫ ',
    'Tab': ' ⇥ ',
    'Shift': ' ⇧ ',
    'Control': 'Ctrl',
    'Meta': ' ⊞ ',
}

export const DEFAULT_PARAMS: KeysConfig = {
    theme: false,
    position: 'top-right',
    size: 'medium',
    keyMap: DEFAULT_KEY_MAP,
    duration: 800,
}