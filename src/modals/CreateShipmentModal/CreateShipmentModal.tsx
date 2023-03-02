import { useNavigate } from "react-router-dom"

import { useBoundStore } from "@/store"
import { useModal, useModalActions } from "@/shared/hooks"
import { ShippingType } from "@/shared/types"
import { CREATE } from "@/constants"

import { CreateRoundedButton, Modal, ModalProps, Stack } from "@/shared/components"

const modalProps: ModalProps = {
  align: { "@initial": "bottomRight" },
  gap: { "@initial": 0 },
  size: "dimensionless",
  overlayCss: {
    zIndex: "$8",
  },
  panelCss: {
    // ($96 + $40) - the absolute panel position from the bottom of the screen
    bottom: `calc($96 + $40)`,
    left: "auto",
    right: "$16",
    zIndex: "$8",
  },
  contentCss: {
    padding: 0,
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
  const setShippingType = useBoundStore((state) => state.setShippingType)

  const handleClick = (type: ShippingType) => {
    setShippingType(type)
    navigate(`${CREATE}/${type}`)
    close("createShipment")
  }

  return (
    <Modal {...createShipment} {...modalProps}>
      <Stack space={20} css={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        <CreateRoundedButton
          label="Create a quote"
          ariaLabel="Create a quote"
          onClick={() => handleClick(ShippingType.Quote)}
        />
        <CreateRoundedButton
          label="Create a shipment"
          ariaLabel="Create a shipment"
          onClick={() => handleClick(ShippingType.Shipment)}
        />
      </Stack>
    </Modal>
  )
}
