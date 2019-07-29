export interface GitLabWebhookServerOptions {
  privates: {
    /**
     * @url [GitLab personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
     */
    privateToken: string

    /**
     * @url [GitLab webhook secret tokens](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#secret-token)
     */
    secretToken?: string
  }
  allowPrivateRepositories?: boolean
  port?: number
  url?: string
}
