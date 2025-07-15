<script setup lang="ts">
import TodoList from '@/components/todo/TodoList.vue'
import TodoFilter from '@/components/todo/TodoFilter.vue'
import { useTodo } from '@/composables/useTodo'
import { ref } from 'vue'

const { addTodo } = useTodo()
const newTodo = ref('')

const handleSubmit = () => {
  addTodo(newTodo.value)
  newTodo.value = ''
}
</script>

<template>
  <div class="todo-view">
    <h1>Todo App</h1>
    
    <form @submit.prevent="handleSubmit">
      <input
        v-model="newTodo"
        placeholder="What needs to be done?"
        type="text"
      >
    </form>

    <TodoFilter />
    <TodoList />
  </div>
</template>