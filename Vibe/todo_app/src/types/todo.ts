export interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

export type TodoFilter = 'all' | 'active' | 'completed'