# Todo App Test Specification

## Store Tests (Pinia)

### Todo Management
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Initialize Store | Create new store instance | Empty todos array |
| Add Todo | Call addTodo with title | New todo added with correct properties |
| Delete Todo | Call deleteTodo with ID | Todo removed from store |
| Toggle Todo | Call toggleTodo with ID | Todo completion status toggled |
| Update Todo | Call updateTodo with ID and title | Todo title updated |

### Filtering Logic
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Filter Active | Set filter to 'active' | Returns only incomplete todos |
| Filter Completed | Set filter to 'completed' | Returns only completed todos |
| Filter All | Set filter to 'all' | Returns all todos |
| Update Filter | Call setFilter | Current filter value updated |

## Component Tests

### TodoList.vue
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Render List | Pass todos array | Shows all todo items |
| Empty State | Pass empty array | Shows empty state message |
| List Updates | Change store todos | List reflects changes |

### TodoItem.vue
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Render Item | Pass todo prop | Shows todo title and status |
| Toggle Complete | Click checkbox | Calls toggleTodo action |
| Edit Mode | Double click title | Shows edit input |
| Update Title | Submit edit form | Calls updateTodo action |
| Delete Todo | Click delete button | Calls deleteTodo action |

### TodoFilter.vue
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Render Filters | Component mount | Shows all filter options |
| Active Filter | Set current filter | Highlights correct option |
| Filter Click | Click filter option | Updates store filter |

### BaseButton.vue
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Variants | Pass variant prop | Applies correct classes |
| Sizes | Pass size prop | Applies correct classes |
| Click Event | Click button | Emits click event |
| Slot Content | Pass slot content | Renders content correctly |

## View Tests

### TodoView.vue
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Form Submit | Enter title and submit | Creates new todo |
| Empty Input | Submit empty form | Prevents creation |
| Component Layout | Render view | Components in correct order |

## Composable Tests

### useTodo.ts
| Test Case | Description | Expected Behavior |
|-----------|-------------|------------------|
| Todo Access | Get todos | Returns filtered todos |
| Filter Access | Get current filter | Returns current filter |
| Input Sanitization | Add todo with whitespace | Trims input |
| Empty Prevention | Add empty todo | Prevents creation |

## Coverage Goals

- Store: 100%
- Components: ≥90%
- Views: ≥90%
- Composables: 100%
- Integration: Key flows covered

## Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test TodoList.spec.ts

# Run with coverage
npm run test:coverage
```

## Test Setup Requirements

1. Install dependencies:
```bash
npm install -D vitest @vue/test-utils @pinia/testing
```

2. Configure Vitest in `vite.config.ts`:
```ts
test: {
  globals: true,
  environment: 'happy-dom'
}
```

3. Create test setup file at `src/test/setup.ts`:
```ts
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

config.global.plugins =