export interface PushHookProject {
  id: number
  name: string
  description: string
  web_url: string
  avatar_url: string | null
  git_ssh_url: string
  git_http_url: string
  namespace: string
  visibility_level: number
  path_with_namespace: string
  default_branch: string
  ci_config_path: unknown | null // TODO: what is the type here?
  homepage: string
  url: string
  ssh_url: string
  http_url: string
}
