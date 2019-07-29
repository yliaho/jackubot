import { createServer, IncomingMessage, ServerResponse, Server } from 'http'
import { privates } from './gitlab-webhook-server.privates'
import {
  GitLabWebhookServerOptions,
  HookListener,
  GitLabWebhookServerConfig
} from './interfaces/'
import { PushHook, BaseHook } from './interfaces/gitlab-objects'
import { HTTPMessageHandler } from '@/http-message-handler/'
import { EventEmitter } from 'events'
import mergeDeepRight from '@ramda/mergedeepright'

const defaultConfig: Partial<GitLabWebhookServerConfig> = {
  allowPrivateRepositories: false,
  port: 8080,
  url: '/'
}

export class GitLabWebhookServer extends HTTPMessageHandler {
  public listeners: Array<HookListener> = []
  public readonly config: GitLabWebhookServerConfig
  private eventEmitter: EventEmitter = new EventEmitter()

  constructor(options: GitLabWebhookServerOptions) {
    super()
    if (!options.privates || !options.privates.privateToken) {
      throw new Error(`${GitLabWebhookServer.name}: No private token set.`)
    }

    const { privates: privateValues, ...config } = options
    this.config = mergeDeepRight(defaultConfig, config)
    privates.set(this, privateValues)

    const server: Server = createServer((...args) =>
      this.handleRequest(...args)
    )

    this.eventEmitter.on('hook', object => {
      this.listeners.forEach(listener => {
        listener(object)
      })
    })

    server.listen(this.config.port)
  }

  public addEventListener(event: 'hook', listener: HookListener): void {
    if (event !== 'hook') {
      console.warn(
        `${GitLabWebhookServer.name}: Warning! Invalid event type: ${event}`
      )
      return
    }

    this.listeners.push(listener)
  }

  private async handleRequest(
    incomingMessage: IncomingMessage,
    serverResponse: ServerResponse
  ): Promise<void> {
    if (incomingMessage.url !== this.config.url) {
      serverResponse.writeHead(400)
      serverResponse.end()
      return
    }

    try {
      serverResponse.writeHead(201)

      const object = this.handleHookObjectKind(
        await this.readIncomingMessage<BaseHook>(incomingMessage)
      )
      this.eventEmitter.emit('hook', object)
    } finally {
      serverResponse.end()
    }
  }

  private handleHookObjectKind(result: Partial<BaseHook>) {
    if (!result.object_kind) {
      throw new Error(
        `${
          GitLabWebhookServer.name
        }: invalid hook object. Missing \`object_kind\` property.`
      )
    }

    if (result.object_kind === 'push') {
      return result as PushHook
    }

    throw new Error(`${GitLabWebhookServer.name}: invalid object_kind.`)
  }
}
