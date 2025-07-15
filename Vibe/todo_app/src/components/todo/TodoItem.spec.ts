import TodoItem from '@/components/todo/TodoItem.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('TodoItem.vue', () => {
  const todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    createdAt: new Date()
  }

  it('renders todo correctly', () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    expect(wrapper.find('.todo-title').text()).toBe(todo.title)
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false)
  })

  it('emits toggle event', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')![0]).toEqual([todo.id])
  })

  it('emits delete event', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    await wrapper.find('.delete-btn').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')![0]).toEqual([todo.id])
  })
})