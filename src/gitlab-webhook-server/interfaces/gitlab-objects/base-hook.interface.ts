export type HookObjectKind = 'push' | 'ummmm'

export interface BaseHook<T extends String = ''> {
  object_kind: T | HookObjectKind
  event_name: T | HookObjectKind
}
