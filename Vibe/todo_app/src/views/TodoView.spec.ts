import { useTodoStore } from '@/stores/todo'
import TodoView from '@/views/TodoView.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('TodoView.vue', () => {
  it('adds new todo', async () => {
    const wrapper = mount(TodoView, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    const input = wrapper.find('input[type="text"]')
    await input.setValue('New Todo')
    await input.trigger('keyup.enter')

    const store = useTodoStore()
    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].title).toBe('New Todo')
  })

  it('shows todo list', () => {
    const wrapper = mount(TodoView, {
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

    expect(wrapper.find('.todo-list').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Todo')
  })
})