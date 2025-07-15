const { setActivePinia, createPinia } = require('pinia');
const { describe, it, expect } = require('vitest');
const { useTodoStore } = require('@/stores/todo');

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty todos', () => {
    const store = useTodoStore()
    expect(store.todos).toHaveLength(0)
  })

  it('adds new todo', () => {
    const store = useTodoStore()
    store.addTodo('Test Todo')
    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].title).toBe('Test Todo')
  })

  it('toggles todo completion', () => {
    const store = useTodoStore()
    store.addTodo('Test Todo')
    const todoId = store.todos[0].id
    store.toggleTodo(todoId)
    expect(store.todos[0].completed).toBe(true)
  })

  it('filters active todos', () => {
    const store = useTodoStore()
    store.addTodo('Active Todo')
    store.addTodo('Completed Todo')
    store.toggleTodo(store.todos[1].id)
    store.setFilter('active')
    expect(store.filteredTodos).toHaveLength(1)
    expect(store.filteredTodos[0].title).toBe('Active Todo')
  })
})