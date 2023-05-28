import React from 'react';
import './Key.css';

interface KeyProps {
    value: string;
    size: string | false;
    theme: string | false;
    keyMap: { [key: string]: string } | false;
}

export const Key = ({
    value,
    size,
    theme,
    keyMap
}: KeyProps) => {
    const classes = 'sb-keyboard-key'
    + (size ? ' sb-keyboard-key--${size}' : '');
    + (theme ? ' sb-keyboard-key--${theme}' : '');
    return (
        <div className={classes}>
            {(keyMap && keyMap[value]) || value}
        </div>
    );
}