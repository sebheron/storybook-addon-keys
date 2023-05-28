import { CSSProperties } from 'react';

const fadeOut = {
    '0%': {
        opacity: 0.8,
    },
    '100%': {
        opacity: 0,
    },
};

const getDuration = (duration: number | false): string => {
    return (duration && parseInt(duration.toString()) ? duration : 800)
    .toLocaleString("en-US", { useGrouping: false });
};

export const KeyAnimation = (): string => {
    const keyframes = `@keyframes sb-keys-keyboard-fade-out { ${Object.entries(fadeOut).map(([key, value]) => `${key} { ${Object.entries(value).map(([key, value]) => `${key}: ${value};`).join(' ')} }`).join(' ')} }`;
    return keyframes;
};

export const KeyCSS = (
    size: string | false,
    theme: string | false,
    duration: number | false
): CSSProperties => {
    return {
        width: 'max-content',
        fontSize: size === 'small' ? '1em' : size === 'large' ? '1.4em' : '1.2em',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color: theme && theme === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: theme && theme === 'dark' ? '#181818' : '#f5f5f5',
        borderRight: `3px solid ${theme && theme === 'dark' ? '#0b0b0b' : '#bfbfbf'}`,
        borderBottom: `3px solid ${theme && theme === 'dark' ? '#0b0b0b' : '#bfbfbf'}`,
        borderRadius: '4px',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: size === 'small' ? '2px 4px' : size === 'large' ? '6px 10px' : '4px 8px',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        userSelect: 'none',
        animation: `sb-keys-keyboard-fade-out 200ms ease-out ${getDuration(duration)}ms forwards`,
    }
};

export const KeysCSS = (
    position: string | false
): CSSProperties => {
    return {
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 'max-content',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        pointerEvents: 'none',
        // If position isn't recognised, we'll default to top-right.
        top:position && !position.includes('bottom') ? '0' : 'unset',
        bottom:position && position.includes('bottom') ? '0' : 'unset',
        right:position && !position.includes('left') ? '0' : 'unset',
        left: position && position.includes('left') ? '0' : 'unset',
        justifyContent: position && position.includes('left') ? 'flex-start' : 'flex-end',
        zIndex: 9999,
    }
};