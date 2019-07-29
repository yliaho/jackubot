import { DiscordMessengerOptions, DiscordMessengerConfig } from './interfaces'
import fetch from 'node-fetch'
import { WebhookPayload } from './interfaces/discord-objects'

export class DiscordMessenger {
  public readonly config: DiscordMessengerConfig
  constructor(options: DiscordMessengerOptions) {
    if (!options.webhookUrl) {
      throw new Error(`${DiscordMessenger.name}: No webhook url set.`)
    }

    const [
      _protocol,
      _,
      _tld,
      _api,
      _webhooks,
      webhookId,
      webhookToken
    ] = options.webhookUrl.split('/')
    this.config = {
      webhookId,
      webhookToken
    }
  }

  public async executeWebhookMessage(payload: WebhookPayload) {
    const k = await fetch(
      `https://discordapp.com/api/webhooks/${this.config.webhookId}/${
        this.config.webhookToken
      }`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          ['Content-Type']: `application/json`,
          ['Authorization']: `Bearer ${this.config.webhookToken}`
        }
      }
    )
  }
}
