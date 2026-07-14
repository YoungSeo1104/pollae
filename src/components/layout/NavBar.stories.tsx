import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NavBar } from './NavBar'
import { Chip } from '@/components/ui/Chip'

const meta = {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const WithBack: Story = { args: { title: '새 투표 만들기', onBack: () => {} } }
export const NoBack: Story = { args: { title: '', onBack: false } }
export const WithRight: Story = {
  args: { title: '일정 후보', onBack: () => {}, right: <Chip>4 / 30</Chip> },
}
