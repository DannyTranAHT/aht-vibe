import TodoList from '@/components/todo/TodoList.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('TodoList.vue', () => {
  it('renders todos correctly', () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            todo: {
              todos: [{ id: 1, title: 'Test Todo', completed: false }]
            }
          }
        })]
      }
    })

    expect(wrapper.findAll('.todo-item')).toHaveLength(1)
    expect(wrapper.text()).toContain('Test Todo')
  })

  it('shows empty state message', () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(wrapper.find('.empty-state').text()).toBe('No todos available')
  })
})