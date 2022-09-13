type ToDo = {
  title: string
  completed: boolean
  created_at: Date
  completed_at?: Date
  description?: string
  id: string
}

type Filter = "ALL" | "COMPLETED" | "NOT_COMPLETED"

export type { ToDo, Filter }
