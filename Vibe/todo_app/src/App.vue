ibe/todo_app/todo-app/src/App.vue
<script setup lang="ts">
// App root component
</script>

<template>
  <div class="app">
    <header>
      <h1>Vue Todo App</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  color: var(--color-heading);
  font-size: 2rem;
}
</style>