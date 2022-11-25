import { styled } from "@/config"

export const SPicture = styled("picture", {})

export const SPictureImg = styled("img", {
  height: "auto",
  width: "100%",

  variants: {
    lazyblur: {
      false: {
        transition: "opacity 400ms",

        "&.lazyload, &.lazyloading": {
          opacity: 0,
        },

        "&.lazyloaded": {
          opacity: 1,
        },
      },
      true: {
        transition: "filter 400ms",

        "&.lazyloading": {
          filter: "blur(10px)",
        },

        "&.lazyloaded": {
          filter: "blur(0px)",
        },
      },
    },
  },
})
