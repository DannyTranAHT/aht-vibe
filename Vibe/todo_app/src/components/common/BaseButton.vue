<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <button
    class="base-button"
    :class="[
      variant && `base-button--${variant}`,
      size && `base-button--${size}`
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.base-button--primary {
  background-color: #4CAF50;
  color: white;
}

.base-button--secondary {
  background-color: #9e9e9e;
  color: white;
}

.base-button--danger {
  background-color: #f44336;
  color: white;
}

.base-button--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.base-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.base-button:hover {
  opacity: 0.9;
}

.base-button:active {
  transform: scale(0.98);
}
</style>