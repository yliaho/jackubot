import { IncomingMessage } from 'http'

export class HTTPMessageHandler {
  constructor() {}

  protected readIncomingMessage<T>(message: IncomingMessage): Promise<T> {
    const stream = []
    return new Promise((resolve, reject) => {
      message
        .on('data', chunk => {
          stream.push(chunk)
        })
        .on('end', () => {
          resolve(JSON.parse(Buffer.concat(stream).toString()))
        })
        .on('error', () => {
          reject(
            new Error(
              `${HTTPMessageHandler.name}: could not read incoming message.`
            )
          )
        })
    })
  }
}
