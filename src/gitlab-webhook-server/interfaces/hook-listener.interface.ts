import { BaseHook, PushHook } from './gitlab-objects'

export type HookListener = (object: PushHook) => void
