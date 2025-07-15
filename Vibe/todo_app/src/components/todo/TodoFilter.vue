<script setup lang="ts">
import { useTodo } from '@/composables/useTodo'
import type { TodoFilter } from '@/types/todo'
import BaseButton from '@/components/common/BaseButton.vue'

const { currentFilter, setFilter } = useTodo()

const filters: TodoFilter[] = ['all', 'active', 'completed']
</script>

<template>
  <div class="todo-filter">
    <BaseButton
      v-for="filter in filters"
      :key="filter"
      :variant="currentFilter === filter ? 'primary' : 'secondary'"
      size="small"
      @click="setFilter(filter)"
    >
      {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
    </BaseButton>
  </div>
</template>

<style scoped>
.todo-filter {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  justify-content: center;
}
</style>