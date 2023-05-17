import { toast } from "react-toastify"

import { boxShadows } from "@/stitches/utils"

import { IToastProps, Toast, ToastType } from "@/shared/components"

function getProgressStyle(type: ToastType) {
  switch (type) {
    case "error":
      return {
        backgroundColor: "var(--colors-special-error)",
      }
    case "info":
      return {
        backgroundColor: "var(--colors-special-info)",
      }
    case "warning":
      return {
        backgroundColor: "var(--colors-special-warning)",
      }
    case "success":
      return {
        backgroundColor: "var(--colors-special-success)",
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
    style: {
      borderRadius: 0,
      boxShadow: boxShadows.toast,
    },
    data: {
      type,
      text,
    },
  })
}
