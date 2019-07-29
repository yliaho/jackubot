export interface Commit {
  id: string
  message: string
  timestamp: Date
  url: string
  author: {
    name: string
    email: string
  }
  addedd: unknown
  modified: unknown
  removed: unknown[]
}
