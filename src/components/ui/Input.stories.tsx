import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './Input'
import { Avatar } from './Avatar'
import { COLORS } from '@/lib/theme'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'padded' },
  args: { placeholder: '예) 동아리 MT 일정 잡기' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: '동아리 MT 잡기' } }
export const WithAvatarPrefix: Story = {
  args: {
    placeholder: '이름',
    prefix: <Avatar size={32} avatar="🐰" avatarColor={COLORS.primarySoft} />,
  },
}
