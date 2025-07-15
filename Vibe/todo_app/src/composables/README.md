# Composables

Reusable composition functions that encapsulate common logic.

## Composable Overview

### `useTodo.ts`
- Provides abstraction over todo store operations
- Adds input validation and data sanitization
- Exposes methods:
  - `addTodo`: Add sanitized todo
  - `toggleTodo`: Toggle completion
  - `deleteTodo`: Remove todo
  - `updateTodo`: Update with validation
  - `setFilter`: Update filter
- Provides reactive access to filtered todos and current filter