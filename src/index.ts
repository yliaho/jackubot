import 'module-alias/register'
import { JackuBot } from './jackubot'

new JackuBot({
  gitlab: {
    allowPrivateRepositories: true,
    privates: {
      privateToken: process.env.GITLAB_PRIVATE_TOKEN
    }
  },
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL
  }
})
