import 'module-alias/register'
import { JackuBot } from './jackubot'

try {
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
  }).start()
} catch (err) {
  console.error(err)
}
