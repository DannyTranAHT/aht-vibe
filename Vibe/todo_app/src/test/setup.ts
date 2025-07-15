import { createTestingPinia } from '@pinia/testing'
import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

// Configure Vue Test Utils
config.global.plugins = [
  createTestingPinia({
  })
]
// Test utilities
export const createTodo = (title: string) => ({
  id: Date.now(),
  title,
  completed: false,
  createdAt: new Date()
})
// Add custom matchers
expect.extend({
  toHaveBeenCalledWith(received: any, ...expected: any[]) {
    const pass = received.mock.calls.some((call: any[]) =>
      JSON.stringify(call) === JSON.stringify(expected)
    )
    return {
      pass,
      message: () => `expected ${received} ${pass ? 'not ' : ''}to have been called with ${expected}`
    }
  }
})