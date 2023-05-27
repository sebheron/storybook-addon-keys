import React from 'react';
import './Key.css';

interface KeyProps {
    value: string;
}

export const Key = ({
    value,
}: KeyProps) => {
    return (
        <div className="sb-keyboard-key">
            {value}
        </div>
    );
}