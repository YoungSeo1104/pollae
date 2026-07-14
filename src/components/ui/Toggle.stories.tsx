import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Toggle } from './Toggle'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  args: { checked: false, onChange: () => {} },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

// 상태 있는 컴포넌트 → render로 로컬 state 래핑
export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(true)
    return <Toggle checked={on} onChange={setOn} />
  },
}

export const On: Story = { args: { checked: true, onChange: () => {} } }
export const Off: Story = { args: { checked: false, onChange: () => {} } }
export const Disabled: Story = { args: { checked: true, disabled: true, onChange: () => {} } }
