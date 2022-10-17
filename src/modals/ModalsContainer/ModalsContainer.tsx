import { useModalsClose } from "@/shared/hooks"
import { TimePeriodModal } from "../TimePeriodModal"

// lazy?
// const TimePeriodModal = dynamic(() =>
//   import("../TimePeriodModal").then((module) => module.TimePeriodModal),
// )

export const ModalsContainer = () => {
  useModalsClose()

  return (
    <>
      <TimePeriodModal />
    </>
  )
}
