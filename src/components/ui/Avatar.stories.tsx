import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Avatar, type AvatarSize } from './Avatar'
import { COLORS } from '@/lib/theme'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  args: { avatar: '🐻', avatarColor: '#FFD9A8', size: 44 },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Host: Story = { args: { avatar: '🐱', avatarColor: '#C8A8E9', host: true } }
export const NotVoted: Story = { args: { avatar: '🐧', avatarColor: '#A8D8FF', done: false } }
export const WithRing: Story = { args: { avatar: '🦄', avatarColor: '#FFAACC', ring: '#fff' } }

const sizes: AvatarSize[] = [28, 36, 44, 56]

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((s) => (
        <Avatar key={s} size={s} avatar="🐻" avatarColor="#FFD9A8" />
      ))}
    </div>
  ),
}

export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {['🐰', '🐻', '🐱', '🐧', '🦊'].map((e, i) => (
        <div key={e} style={{ marginLeft: i === 0 ? 0 : -10 }}>
          <Avatar size={36} avatar={e} avatarColor={COLORS.primarySoft} ring="#fff" />
        </div>
      ))}
    </div>
  ),
}

// avatar/avatarColor 미지정 → 마운트 시 랜덤
export const Random: Story = {
  args: { avatar: undefined, avatarColor: undefined },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Avatar key={i} {...args} size={44} />
      ))}
    </div>
  ),
}
