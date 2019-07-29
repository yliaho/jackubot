import { BaseHook } from './base-hook.interface'
import { PushHookProject } from './project.interface'
import { Commit } from './commit.interface'
import { Repository } from './repository.interface'

export interface PushHook extends BaseHook<'push'> {
  before: string
  after: string
  ref: string
  checkout_sha: string
  message: string | null
  user_id: number
  user_name: string
  user_username: string
  user_email: string
  user_avatar: string
  project_id: number
  project: PushHookProject
  commits: Commit[]
  total_commits_count: number
  push_options: { [key: string]: unknown } // TODO: types???
  repository: Repository
}
