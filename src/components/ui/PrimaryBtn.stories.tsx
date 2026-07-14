import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PrimaryBtn } from './PrimaryBtn'

const meta = {
  title: 'UI/PrimaryBtn',
  component: PrimaryBtn,
  parameters: { layout: 'centered' },
  args: { children: '새 투표 만들기' },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PrimaryBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Ghost: Story = { args: { ghost: true, children: '참여한 투표 보기' } }
export const Disabled: Story = { args: { disabled: true, children: '비활성' } }
