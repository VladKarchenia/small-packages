import { useModalsClose } from "@/shared/hooks"
import { CreateShipmentModal } from "../CreateShipmentModal"
import { CancelShipmentModal } from "../CancelShipmentModal"
import { DeleteShipmentModal } from "../DeleteShipmentModal"
import { CancelQuoteModal } from "../CancelQuoteModal"
import { DeleteQuoteModal } from "../DeleteQuoteModal"
import { ReloadRatesModal } from "../ReloadRatesModal"

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
