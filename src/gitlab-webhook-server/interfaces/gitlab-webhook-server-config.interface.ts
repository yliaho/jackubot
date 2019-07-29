import { GitLabWebhookServerOptions } from './gitlab-webhook-server-options.interface'

export interface GitLabWebhookServerConfig
  extends Pick<
    GitLabWebhookServerOptions,
    'allowPrivateRepositories' | 'port' | 'url'
  > {}
