import { ToastContentProps } from "react-toastify"

import { Copy, Grid } from "@/shared/components"
import { IconCrossCircle, IconInfoCircle, IconTickCircle, IconWarning } from "@/shared/icons"

import { SToastIcon } from "./Toast.styles"

export type ToastType = "error" | "info" | "warning" | "success" | "default"

function getToastIcon(type: ToastType) {
  switch (type) {
    case "error":
      return <IconCrossCircle css={{ color: "$special-error" }} />
    case "info":
      return <IconInfoCircle css={{ color: "$special-info" }} />
    case "warning":
      return <IconWarning css={{ color: "$special-warning" }} />
    case "success":
      return <IconTickCircle css={{ color: "$special-success" }} />
    case "default":
      return null
  }
}

export interface IToastProps {
  type: ToastType
  text: string
}

export const Toast = ({ data }: ToastContentProps<IToastProps>) => {
  if (!data) return null

  return (
    <Grid columns="$40 1fr" gap={16} css={{ alignItems: "center" }}>
      <SToastIcon align="center" justify="center" type={data.type}>
        {getToastIcon(data.type)}
      </SToastIcon>
      <Copy color="neutrals-12">{data.text}</Copy>
    </Grid>
  )
}
