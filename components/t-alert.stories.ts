import { Meta, Story } from '@storybook/vue3'
import { TAlert } from '@variantjs/vue'

export default {
  component: TAlert,
  title: 't-alert',
  args: {
    show: true,
    message: 'Hi there!',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-alert v-bind="args">{{args.message}}</t-alert>',
})
export const Default = Template.bind({})
export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  message: 'oops!',
  show: true,
}
export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  message: 'success!',
  show: true,
}
