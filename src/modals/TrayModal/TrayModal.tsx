import { Modal, ModalProps } from "@/shared/components"

const modalProps: ModalProps = {
  align: { "@initial": "bottom", "@sm": "center" },
  gap: { "@initial": 0, "@sm": 32 },
  size: "md",
  panelCss: {
    "@max-sm": {
      width: "100%",
    },
  },
  contentCss: {
    paddingX: "$0",

    "@max-sm": {
      width: "100%",
      borderRadius: "$2 $2 0 0",
    },
    "@sm": {
      borderRadius: 24,
    },
  },
  closeButton: {
    css: {
      height: "$32",
      width: "$40",

      "@sm": {
        height: "$48",
      },
    },
  },
}

export const TrayModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Modal {...props} {...modalProps}>
      {children}
    </Modal>
  )
}
