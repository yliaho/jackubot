import { GitLabWebhookServer } from './index'
import { GitLabWebhookServerOptions } from './interfaces'

export interface IGitLabWebhookServerPrivates {
  privateToken?: string
  secretToken?: string
}

/**
 * Why, you may ask?
 * No one can sniff out stuff during runtime that was put in here.
 * @See [MDN Explanation of WeakMap's best use case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#WeakMap_object)
 */
export const privates = new WeakMap<
  GitLabWebhookServer,
  IGitLabWebhookServerPrivates
>()
