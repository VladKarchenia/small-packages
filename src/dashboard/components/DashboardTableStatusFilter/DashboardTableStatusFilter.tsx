import { useEffect, useState } from "react"

import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { ShipmentStatus } from "@/shared/types"
import { SHIPMENT_STATUSES } from "@/constants"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import {
  FormCheckbox,
  IResponseContentProps,
  ResponseContent,
  ResponseContentItem,
} from "@/shared/components"
import { DashboardTableFilter } from "@/dashboard/components"

const shipmentStatusesList: ShipmentStatus[] = Object.values(ShipmentStatus).filter((status) =>
  SHIPMENT_STATUSES.includes(status),
)

const getEnumKey = (value: ShipmentStatus) =>
  Object.keys(ShipmentStatus)[Object.values(ShipmentStatus).indexOf(value)] as ShipmentStatus

export const DashboardTableStatusFilter = () => {
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const { status } = useDashboardStateContext()
  const [isCheckAll, setIsCheckAll] = useState(false)

  useEffect(() => {
    if (status.length === shipmentStatusesList.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [status])

  if (isMediumAndAbove) {
    return (
      <DashboardTableFilter label="Status" name="status" amount={status.length}>
        <Content results={shipmentStatusesList} isCheckAll={isCheckAll} status={status} />
      </DashboardTableFilter>
    )
  }

  return <Content results={shipmentStatusesList} isCheckAll={isCheckAll} status={status} />
}

interface IContentProps extends Omit<IResponseContentProps, "results" | "handleCheckAllClick"> {
  results: ShipmentStatus[]
  status: ShipmentStatus[]
}

const Content = ({ results, status, ...props }: IContentProps) => {
  const { setStatusFilter, resetFilterField } = useDashboardActionContext()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = status.filter(
        (status) => status !== getEnumKey(event.currentTarget.value as ShipmentStatus),
      )
      return setStatusFilter(newArray)
    }

    const newArray = [...status, getEnumKey(event.currentTarget.value as ShipmentStatus)]
    return setStatusFilter(newArray)
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("status")
    }

    return setStatusFilter(shipmentStatusesList.map((i) => getEnumKey(i)))
  }

  return (
    <ResponseContent results={results} handleCheckAllClick={handleCheckAllClick} {...props}>
      {results.map((item) => (
        <ResponseContentItem key={item}>
          <FormCheckbox
            value={item}
            onChange={handleChange}
            name={item}
            id={item}
            label={item}
            checked={status.includes(getEnumKey(item))}
          />
        </ResponseContentItem>
      ))}
    </ResponseContent>
  )
}
