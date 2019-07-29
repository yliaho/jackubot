import { DiscordEmbed } from './discord-embed.interface'

export interface WebhookPayload {
  content: string
  username?: string
  avatar_url?: string
  tts?: boolean
  file?: any
  embeds?: Partial<DiscordEmbed>[]
}
