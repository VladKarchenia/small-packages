import { useModalsClose } from "@/shared/hooks"
import {
  CreateShipmentModal,
  CancelShipmentModal,
  DeleteShipmentModal,
  CancelQuoteModal,
  DeleteQuoteModal,
  ReloadRatesModal,
} from "@/modals"

// lazy?
// const TimePeriodModal = dynamic(() =>
//   import("../TimePeriodModal").then((module) => module.TimePeriodModal),
// )

export const ModalsContainer = () => {
  useModalsClose()

  return (
    <>
      <CreateShipmentModal />
      <CancelShipmentModal />
      <DeleteShipmentModal />
      <CancelQuoteModal />
      <DeleteQuoteModal />
      <ReloadRatesModal />
    </>
  )
}
