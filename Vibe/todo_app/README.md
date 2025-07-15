# Todo List App

A scalable Todo List application built with Vue 3, utilizing the Composition API, TypeScript, and Pinia for state management.

## Features

- Add, edit, and delete tasks
- Mark tasks as "completed" or "pending"
- Filter tasks by status: all, completed, pending
- Responsive and user-friendly interface

## Project Structure

```
todo_app/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── base.css
│   │       └── variables.css
│   ├── components/
│   │   ├── common/
│   │   │   └── BaseButton.vue
│   │   └── todo/
│   │       ├── TodoList.vue
│   │       ├── TodoItem.vue
│   │       └── TodoFilter.vue
│   ├── composables/
│   │   └── useTodo.ts
│   ├── stores/
│   │   └── todo.ts
│   ├── types/
│   │   └── todo.ts
│   ├── views/
│   │   └── TodoView.vue
│   ├── App.vue
│   ├── main.ts
│   └── router/
│       └── index.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/todo_app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd todo_app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    npm run dev
    ```

## Usage

- Add new tasks using the input field
- Click on a task to mark it as "completed"
- Use the filter buttons to view tasks by status
- Edit or delete tasks as needed

## Technologies

- Vue 3
- TypeScript
- Pinia
- Vite

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to improve the app.