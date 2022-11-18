import { CreateButton, Modal, ModalProps, Stack } from "@/shared/components"
import { useModal, useModalActions } from "@/shared/hooks"
import { ShippingType } from "@/shipment"
import { useNavigate } from "react-router-dom"

const modalProps: ModalProps = {
  align: { "@initial": "bottomRight" },
  gap: { "@initial": 0 },
  size: "dimensionless",
  overlayCss: {
    zIndex: "$8",
  },
  panelCss: {
    bottom: "94px",
    left: "auto",
    right: "$16",
    zIndex: "$8",
  },
  contentCss: {
    padding: "$0",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  closeButton: {
    css: {
      display: "none",
    },
  },
}

export const CreateShipmentModal = () => {
  const navigate = useNavigate()
  const [createShipment] = useModal("createShipment")
  const { close } = useModalActions()

  const handleClick = (type: ShippingType) => {
    navigate(`/create/${type}`)
    close("createShipment")
  }

  return (
    <Modal {...createShipment} {...modalProps}>
      <Stack space={20} css={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        <CreateButton
          label="Creare a quote"
          iconSize="sm"
          ariaLabel="Creare a quote"
          onClick={() => handleClick(ShippingType.Quote)}
        />
        <CreateButton
          label="Creare a shipment"
          iconSize="sm"
          ariaLabel="Creare a shipment"
          onClick={() => handleClick(ShippingType.Shipment)}
        />
      </Stack>
    </Modal>
  )
}
