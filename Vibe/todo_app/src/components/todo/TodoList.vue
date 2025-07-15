<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import { useTodo } from '@/composables/useTodo'

const { todos } = useTodo()
</script>

<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />
  </ul>
</template>