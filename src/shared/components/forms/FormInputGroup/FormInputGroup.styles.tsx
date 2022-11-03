import { styled } from "@/config"

import { SFormFieldElement } from "../FormField/FormField.styles"

export const SFormInputGroup = styled("div", {})

export const SFormInputGroupItems = styled("div", {
  display: "flex",
  alignItems: "center",
  position: "relative",
  gap: "$12",
})

export const SFormInputGroupItem = styled("div", {
  flex: "1",
  position: "relative",

  "&:not(:first-of-type)": {
    marginLeft: -1,
  },

  [`${SFormFieldElement}`]: {
    borderRadius: 0,
  },

  firstOfType: {
    [`${SFormFieldElement}`]: {
      borderRadius: "$2 0 0 $2",
    },
  },
  lastOfType: {
    [`${SFormFieldElement}`]: {
      borderRadius: "0 $2 $2 0",
    },
  },
})
