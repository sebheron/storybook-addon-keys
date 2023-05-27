import type { Meta, StoryObj } from '@storybook/react';

import { Key } from '../components/Key';

const meta: Meta = {
    title: 'Components/Key',
    component: Key
};
export default meta;
type Story = StoryObj<typeof Key>;

export const Default: Story = {
    args: {
        value: 'Space'
    }
}