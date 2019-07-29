import { GitLabWebhookServerOptions } from '@/gitlab-webhook-server/interfaces'
import { DiscordMessengerOptions } from '@/discord-messenger/interfaces'

export interface JackuBotOptions {
  gitlab: GitLabWebhookServerOptions
  discord: DiscordMessengerOptions
}
