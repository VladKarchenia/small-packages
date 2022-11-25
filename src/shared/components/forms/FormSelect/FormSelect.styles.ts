import { styled } from "@/config"

import { SFormFieldElement } from "../FormField/FormField.styles"

export const SFormSelectValue = styled("div", SFormFieldElement, {
  pointerEvents: "none",

  variants: {
    isPlaceholder: {
      true: {
        backgroundColor: "$neutrals-1",
      },
    },
  },
})

export const SFormSelect = styled("select", {
  width: "100%",
  position: "absolute",
  zIndex: "$1",
  left: "0px",
  right: "0px",
  top: "0px",
  bottom: "0px",
  opacity: "0",
  cursor: "pointer",
  appearance: "none",
  "-webkit-appearance": "none",
})

export const SFormSelectOption = styled("option", {
  reset: true,
  backgroundColor: "$system-white",
  width: "100%",
  height: "$40",
})

export const SFormSelectContainer = styled("div", {})
