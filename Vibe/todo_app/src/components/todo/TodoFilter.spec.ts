import TodoFilter from '@/components/todo/TodoFilter.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('TodoFilter.vue', () => {
  it('renders all filter options', () => {
    const wrapper = mount(TodoFilter)
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons).toHaveLength(3)
    expect(buttons.map(btn => btn.text())).toEqual(['All', 'Active', 'Completed'])
  })

  it('emits filter change event', async () => {
    const wrapper = mount(TodoFilter)
    await wrapper.findAll('.filter-btn')[1].trigger('click')
    expect(wrapper.emitted('update:filter')).toBeTruthy()
    expect(wrapper.emitted('update:filter')![0]).toEqual(['active'])
  })

  it('highlights active filter', () => {
    const wrapper = mount(TodoFilter, {
      props: { modelValue: 'active' }
    })
    expect(wrapper.find('.filter-btn.active').text()).toBe('Active')
  })
})