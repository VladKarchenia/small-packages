/**
 * @link https://gist.github.com/eyecatchup/d210786daa23fd57db59634dd231f341#file-smooth-scrolling-poyfill-js
 * @author Stephan Schmitz
 */

type ScrollCoords = {
  left?: number
  top?: number
}

type ScrollValue = number | ScrollCoords

type ScrollToOptions = {
  position?: ScrollValue
  offset?: ScrollValue

  selector?: string
  element?: HTMLElement | null
  scrollElement?: Element | null
  instant?: boolean
}

// native smooth scrolling for Chrome, Firefox & Opera
// @see: https://caniuse.com/#feat=css-scroll-behavior
const nativeScrollTo = (coords: ScrollCoords, smooth: boolean, el?: Element | null) => {
  const element = el || window

  element.scroll({
    behavior: smooth ? "smooth" : "auto",
    left: coords.left,
    top: coords.top,
  })
}

// polyfilled smooth scrolling for IE, Edge & Safari
const smoothScrollTo = (coords: ScrollCoords, duration: number, el?: Element | null) => {
  const element = el || document.scrollingElement || document.documentElement,
    startDate = +new Date()

  const start = {
    left: element.scrollLeft,
    top: element.scrollTop,
  }

  const change = {
    left: typeof coords.left !== "undefined" ? coords.left - start.left : 0,
    top: typeof coords.top !== "undefined" ? coords.top - start.top : 0,
  }

  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const animateScroll = () => {
    const currentDate = +new Date()
    const currentTime = currentDate - startDate

    element.scrollLeft = easeInOutQuad(currentTime, start.left, change.left, duration)
    element.scrollTop = easeInOutQuad(currentTime, start.top, change.top, duration)

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      if (typeof coords.top !== "undefined") {
        element.scrollTop = coords.top
      }

      if (typeof coords.left !== "undefined") {
        element.scrollLeft = coords.left
      }
    }
  }

  animateScroll()
}

// detect support for the behavior property in ScrollOptions
const supportsNativeSmoothScroll = () => "scrollBehavior" in document.documentElement.style

// smooth scrolling stub
export const scrollTo = ({
  position,
  offset,
  selector,
  element,
  scrollElement,
  instant = false,
}: ScrollToOptions) => {
  const pos = parseScrollValueToCoords(position)
  const off = parseScrollValueToCoords(offset)
  const el = selector ? (document.querySelector(selector) as HTMLElement) : element

  if (el) {
    pos.left = el.offsetLeft
    pos.top = el.offsetTop
  }

  if (pos) {
    const finalCoords = {
      left: typeof pos.left !== "undefined" ? pos.left - (off.left || 0) : undefined,
      top: typeof pos.top !== "undefined" ? pos.top - (off.top || 0) : undefined,
    }

    if (!instant) {
      if (supportsNativeSmoothScroll()) {
        nativeScrollTo(finalCoords, true, scrollElement)
      } else {
        smoothScrollTo(finalCoords, 400, scrollElement)
      }
    } else {
      nativeScrollTo(finalCoords, false, scrollElement)
    }
  }
}

function parseScrollValueToCoords(value?: ScrollValue) {
  if (typeof value === "undefined") {
    return {}
  }

  if (typeof value === "number") {
    return {
      left: undefined,
      top: value,
    }
  }

  return value
}
