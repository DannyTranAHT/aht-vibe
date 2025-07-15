<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '@/types/todo'
import { useTodo } from '@/composables/useTodo'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps<{
  todo: Todo
}>()

const { toggleTodo, deleteTodo, updateTodo } = useTodo()
const isEditing = ref(false)
const editedTitle = ref(props.todo.title)

const handleEdit = () => {
  updateTodo(props.todo.id, editedTitle.value)
  isEditing.value = false
}
</script>

<template>
  <li :class="{ completed: todo.completed }">
    <div v-if="!isEditing" class="todo-item">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo(todo.id)"
      >
      <span @dblclick="isEditing = true">{{ todo.title }}</span>
      <BaseButton @click="deleteTodo(todo.id)">Delete</BaseButton>
    </div>
    <input
      v-else
      v-model="editedTitle"
      @blur="handleEdit"
      @keyup.enter="handleEdit"
      @keyup.escape="isEditing = false"
    >
  </li>
</template>