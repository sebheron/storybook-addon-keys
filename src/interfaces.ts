export type KeyMap = {
    [key: string]: string;
}

export interface KeysConfig {
    theme: false | string;
    position: false | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size: false | 'small' | 'medium' | 'large';
    keyMap: false | KeyMap;
    duration: false | number;
}