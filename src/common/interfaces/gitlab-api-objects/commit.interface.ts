export interface CommitStats {
  additions: number
  deletions: number
  total: number
}

export interface Commit {
  id: string
  short_id: string
  created_at: Date
  parent_ids: string[]
  title: string
  message: string
  author_name: string
  author_email: string
  authored_date: Date
  commiter_name: string
  committer_email: string
  committed_date: Date
  stats: CommitStats
  status: null | unknown
  last_pipeline: null | unknown
  project_id: number
}
