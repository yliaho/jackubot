import { JackuBotOptions } from './common/interfaces/jackubot-options.interface'
import { GitLabWebhookServer } from './gitlab-webhook-server'
import { DiscordMessenger } from './discord-messenger'
import { PushHook } from './gitlab-webhook-server/interfaces/gitlab-objects'
import fetch from 'node-fetch'
import { Commit } from './common/interfaces/gitlab-api-objects/commit.interface'
import { DiscordEmbedField } from './discord-messenger/interfaces/discord-objects/discord-embed.interface'

export class JackuBot {
  private readonly gitlabWebhookServer: GitLabWebhookServer
  private readonly discordMessenger: DiscordMessenger

  constructor(options: JackuBotOptions) {
    this.gitlabWebhookServer = new GitLabWebhookServer(options.gitlab)
    this.discordMessenger = new DiscordMessenger(options.discord)
  }

  public start() {
    this.gitlabWebhookServer.addEventListener('hook', async data =>
      this.webhookPushListener(data)
    )
  }

  private async webhookPushListener(data: PushHook) {
    const detailedCommits = await Promise.all(
      data.commits.map(commit =>
        fetch(
          `https://gitlab.com/api/v4/projects/${
            data.project_id
          }/repository/commits/${commit.id}`,
          {
            headers: {
              ['Private-Token']: process.env.GITLAB_PRIVATE_TOKEN
            }
          }
        ).then(res => res.json())
      )
    )

    const fields = this.composeCommitEmbedFields(
      detailedCommits.map((d, i) => ({ ...d, url: data.commits[i].url }))
    )

    this.discordMessenger.executeWebhookMessage({
      content:
        `${data.user_name} pushed to branch ` +
        `\`${data.ref.slice(11)}\` of ` +
        `${data.project.name}`,
      embeds: [
        {
          color: 0xfca326,
          author: {
            name: `${data.project.namespace}/${data.project.name}`,
            url: data.project.http_url,
            icon_url: data.project.avatar_url
          },
          fields
        }
      ]
    })
  }

  private composeCommitEmbedFields(
    commits: Array<Commit & { url: string }>
  ): DiscordEmbedField[] {
    return commits.map(commit => ({
      name:
        commit.committer_name === commit.author_name
          ? `${commit.author_name}`
          : `${commit.author_name} with ${commit.committer_name}`,
      value:
        `[\`${commit.id.slice(0, 8)}\`](${commit.url}) ` +
        `– ${commit.title} ` +
        `– **(+${commit.stats.additions} | -${commit.stats.deletions})**)`
    }))
  }
}
