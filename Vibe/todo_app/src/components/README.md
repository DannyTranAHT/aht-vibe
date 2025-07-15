# Components

This directory contains reusable Vue components for the Todo application.

## Component Overview

### `TodoList.vue`
- Renders the list of todo items
- Uses TodoItem component for each todo
- Receives filtered todos from the store via useTodo composable

### `TodoItem.vue`
- Displays individual todo items
- Handles editing, deletion, and completion toggling
- Supports double-click to edit and escape to cancel
- Uses BaseButton for consistent styling

### `TodoFilter.vue`
- Provides filtering options (All/Active/Completed)
- Shows active filter state
- Updates filter in store

### `common/BaseButton.vue`
- Reusable button component
- Provides consistent styling across the app