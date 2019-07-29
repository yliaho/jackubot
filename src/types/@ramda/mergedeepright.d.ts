declare module '@ramda/mergedeepright' {
  import { MergeDeep } from 'ramda'
  export default function mergeDeepRight<A, B>(a: A, b: B): MergeDeep<B, A>
}
