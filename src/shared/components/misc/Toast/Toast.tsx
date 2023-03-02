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
      return <IconInfoCircle css={{ color: "$brand-blue-dark" }} />
    case "warning":
      return <IconWarning css={{ color: "$brand-yellow-primary" }} />
    case "success":
      return <IconTickCircle css={{ color: "$brand-green-primary" }} />
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
      <Copy scale={10} color="system-black">
        {data.text}
      </Copy>
    </Grid>
  )
}
