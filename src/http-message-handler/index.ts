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
          try {
            const string: string = Buffer.concat(stream).toString()

            resolve(JSON.parse(string))
          } catch (err) {
            console.warn(
              `${
                HTTPMessageHandler.name
              }: unable to parse request data. Input is not valid JSON.`
            )
            return
          }
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
