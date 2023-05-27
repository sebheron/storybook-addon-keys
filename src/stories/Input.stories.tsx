import React from 'react';
import type { Meta } from '@storybook/react';

import { Input } from './Input';

const meta: Meta = {
    title: 'Test/Input',
    component: Input
};
export default meta;

export const Default = () => {
    const [value, setValue] = React.useState('Hello World');
    return (
        <Input  
            value={value}
            onChange={setValue}
        />
    );
}