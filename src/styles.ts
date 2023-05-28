import { CSSProperties } from 'react';

export const KeyCSS = (
    size: string | false,
    theme: string | false
): CSSProperties => {
    return {
        width: 'max-content',
        margin: '8px',
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
    }
};

export const KeysCSS = (
    position: string | false,
    opacity: number
): CSSProperties => {
    return {
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 'max-content',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: '#00000040',
        opacity,
        transition: 'opacity 100ms ease-in-out',
        // If position isn't recognised, we'll default to top-right.
        borderRadius: position && position === 'top-left' ? '0 0 4px 0' :
                      position && position === 'bottom-left' ? '0 4px 0 0' :
                      position && position === 'bottom-right' ? '4px 0 0 0' :
                      '0 0 0 4px',
        top: position && !position.includes('bottom') ? '0' : 'unset',
        bottom: position && position.includes('bottom') ? '0' : 'unset',
        right: position && !position.includes('left') ? '0' : 'unset',
        left: position && position.includes('left') ? '0' : 'unset',
        justifyContent: position && position.includes('left') ? 'flex-start' : 'flex-end',
    }
};