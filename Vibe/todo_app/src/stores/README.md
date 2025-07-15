# Stores

Contains Pinia store definitions for state management.

## Store Overview

### `todo.ts`
- Manages todo items state and filter state
- Provides actions for CRUD operations:
  - `addTodo`: Add new todo
  - `toggleTodo`: Toggle completion status
  - `deleteTodo`: Remove todo
  - `updateTodo`: Edit todo title
  - `setFilter`: Update current filter
- Computed property `filteredTodos` for filtering logic