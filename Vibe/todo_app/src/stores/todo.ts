import type { Todo, TodoFilter } from '@/types/todo'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filter = ref<TodoFilter>('all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  function addTodo(title: string) {
    todos.value.push({
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function updateTodo(id: number, title: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.title = title
  }

  function setFilter(newFilter: TodoFilter) {
    filter.value = newFilter
  }

  return {
    todos,
    filter,
    filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter
  }
})