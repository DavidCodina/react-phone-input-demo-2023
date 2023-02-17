// Use these types instead of: import { Story, Meta } from '@storybook/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ClickCounter } from './index'

/* ======================
        default
====================== */
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Components/ClickCounter',
  component: ClickCounter,
  // args: {}
  // argTypes: {},
  parameters: {
    componentSubtitle: 'An amazing ClickCounter component!'
    // docs: {
    //   description: {
    //     component: `<div><p>...</p></div>`
    //   }
    // },
  }
} as ComponentMeta<typeof ClickCounter>

///////////////////////////////////////////////////////////////////////////
//
// I used to type cast this as Meta - import { Meta, Story } from '@storybook/react'
// But the above type casting is what's done in new examples.
//
// Gotcha: if the component props were set to any, then we could do this:
// as ComponentMeta<typeof ClickCounter>
//
// However, if they are typed with an interface AND that interface is defined
// in the component file then, we'll get a bunch of red squiggly lines here:
// Default export of the module has or is using private name 'IClickCounter'.
// In that case, we'd need to bring in IClickCounter and use it instead of typeof ClickCounter.
//
// Strangely though, if the interface is defined in a SEPERATE file, then we
// will NOT get that error here.
//
///////////////////////////////////////////////////////////////////////////

/* ======================
        Template
====================== */
// Here, I used to use: const Template: Story<IClickCounter> = (args: any) => { ... }
// However, the new default examples do this instead:

const Template: ComponentStory<typeof ClickCounter> = (args: any) => {
  return <ClickCounter {...args} />
}

/* ======================
      DefaultExample
====================== */

export const DefaultExample = Template.bind({})
DefaultExample.args = {}

// DefaultExample.parameters = {
//   docs: { storyDescription: `<p>...</p>` }
// }
// DefaultExample.decorators = [
//   (Story) => (<div style={{ minHeight: 200 }}><Story /></div>)
// ]
