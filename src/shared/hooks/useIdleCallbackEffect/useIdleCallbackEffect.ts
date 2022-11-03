import { DependencyList, useCallback, useEffect, useRef } from "react"

import { useLatest } from "@/shared/hooks"

export declare type IdleCallbackCreator = typeof requestIdleCallback
export declare type IdleCallbackHandle = ReturnType<IdleCallbackCreator>

export declare type IdleCallbackEffectCallback = (requestIdleCallback: IdleCallbackCreator) => void

const getRequestIdleCallback = () =>
  window.requestIdleCallback ||
  function (cb) {
    return setTimeout(function () {
      const start = Date.now()

      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 1)
  }

/**
 * This works like a regular `useEffect` hook, except that it adds a `requestIdleCallback` like function to the callback args.
 * Any registered idle callbacks will be canceled on unmount.
 *
 * @param effect Works like a `useEffect` callback, but receives one argument, instead of none. The argument is a function that can be called to trigger the effect when the browser is idle.
 * @param deps Your regular useEffect dependency array.
 */
export const useIdleCallbackEffect = (effect: IdleCallbackEffectCallback, deps: DependencyList) => {
  const effectRef = useLatest(effect)

  const idleCallbackHandle = useRef<IdleCallbackHandle | null>(null)

  const idleCallbackFunc = useCallback<IdleCallbackCreator>(
    (callback, options) => {
      const ric = getRequestIdleCallback()

      idleCallbackHandle.current = ric(callback, options)

      return idleCallbackHandle.current
    },
    [idleCallbackHandle],
  )

  useEffect(() => {
    return effectRef.current(idleCallbackFunc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    return function onUnmount() {
      if (idleCallbackHandle.current !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        window.cancelIdleCallback(idleCallbackHandle.current!)
      }
    }
  }, [idleCallbackHandle])
}
