/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
declare module "fast-loops" {
  export function objectFilter<K extends string, V, U>(
    obj: { [k in K]?: V },
    callbackFn: (value: V, key: K, obj: { [k in K]?: V }) => boolean,
  ): { [k in K]?: V }

  export function objectReduce<K extends string, V, U>(
    obj: { [k in K]?: V },
    callbackFn: (accumulator: U, value: V, key: K, obj: { [k in K]?: V }) => U,
    initialValue: U,
  ): U
}
