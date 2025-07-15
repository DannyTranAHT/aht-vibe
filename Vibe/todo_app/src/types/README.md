# Types

TypeScript type definitions used throughout the application.

## Type Overview

### `todo.ts`
- `Todo` interface:
  - `id`: Unique identifier
  - `title`: Todo text content
  - `completed`: Completion status
  - `createdAt`: Creation timestamp
- `TodoFilter` type:
  - Union type of 'all' | 'active' | 'completed'