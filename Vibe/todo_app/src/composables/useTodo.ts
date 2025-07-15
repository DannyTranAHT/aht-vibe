import { useTodoStore } from '@/stores/todo'
import type { TodoFilter } from '@/types/todo'

export function useTodo() {
  const store = useTodoStore()

  const addTodo = (title: string) => {
    if (title.trim()) {
      store.addTodo(title.trim())
    }
  }

  const toggleTodo = (id: number) => {
    store.toggleTodo(id)
  }

  const deleteTodo = (id: number) => {
    store.deleteTodo(id)
  }

  const updateTodo = (id: number, title: string) => {
    if (title.trim()) {
      store.updateTodo(id, title.trim())
    }
  }

  const setFilter = (filter: TodoFilter) => {
    store.setFilter(filter)
  }

  return {
    todos: store.filteredTodos,
    currentFilter: store.filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter
  }
}