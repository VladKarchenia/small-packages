import { toast } from "react-toastify"

import { IToastProps, Toast, ToastType } from "@/shared/components"

function getProgressStyle(type: ToastType) {
  switch (type) {
    case "error":
      return {
        backgroundColor: "var(--colors-special-error)",
      }
    case "info":
      return {
        backgroundColor: "var(--colors-brand-blue-dark)",
      }
    case "warning":
      return {
        backgroundColor: "var(--colors-brand-yellow-primary)",
      }
    case "success":
      return {
        backgroundColor: "var(--colors-brand-green-primary)",
      }
    case "default":
      return {}
  }
}

export const showToast = ({ type, text }: IToastProps) => {
  return toast(Toast, {
    type,
    icon: false,
    position: "bottom-right",
    progressStyle: getProgressStyle(type),
    data: {
      type,
      text,
    },
  })
}
