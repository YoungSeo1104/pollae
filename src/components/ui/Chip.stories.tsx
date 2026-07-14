import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Chip } from './Chip'

const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  args: { children: 'D-3' },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Status: Story = {}
export const Crown: Story = { args: { variant: 'crown', children: '👑 최다' } }
export const Hot: Story = { args: { variant: 'hot', children: '🔥 인기' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip>D-3</Chip>
      <Chip variant="crown">👑 최다</Chip>
      <Chip variant="hot">🔥 인기</Chip>
    </div>
  ),
}
