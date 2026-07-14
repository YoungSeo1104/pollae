import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PageWrapper } from './PageWrapper'
import { NavBar } from './NavBar'
import { PrimaryBtn } from '@/components/ui/PrimaryBtn'
import { COLORS } from '@/lib/theme'

const meta = {
  title: 'Layout/PageWrapper',
  component: PageWrapper,
  parameters: { layout: 'fullscreen' },
  args: { children: null },
} satisfies Meta<typeof PageWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const WithContent: Story = {
  render: () => (
    <div style={{ maxWidth: 390, height: 640, margin: '0 auto' }}>
      <PageWrapper>
        <NavBar title="Pollae" onBack={false} />
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>
            우리,<br />언제 만날까요?
          </div>
          <div style={{ flex: 1 }} />
          <PrimaryBtn>새 투표 만들기</PrimaryBtn>
        </div>
      </PageWrapper>
    </div>
  ),
}
