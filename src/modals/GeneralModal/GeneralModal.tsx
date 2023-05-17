import { Modal, ModalProps } from "@/shared/components"

const modalProps: ModalProps = {
  align: "center",
  gap: 16,
  size: "md",
  panelCss: {
    "@max-sm": {
      width: "100%",
    },
  },
  contentCss: {
    paddingTop: "$48",
    paddingBottom: "$16",
    paddingX: 0,
    borderRadius: "$16",

    "@max-sm": {
      width: "100%",
    },
  },
}

export const GeneralModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Modal {...props} {...modalProps}>
      {children}
    </Modal>
  )
}
