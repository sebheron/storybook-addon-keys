import React from 'react';
import './input.css';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

export const Input = ({
    value,
    onChange,
}: InputProps) => {
    return (
        <input
            className="sbtest-keyboard-inputbox"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
