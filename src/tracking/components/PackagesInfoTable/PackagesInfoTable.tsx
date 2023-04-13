import { IParcel, ShippingType } from "@/shared/types"

import { Stack } from "@/shared/components"
import { PackagesInfoTableRow } from "@/tracking/components"

interface IPackagesInfoCardProps {
  parcels: IParcel[]
  shippingType: ShippingType
}

export const PackagesInfoTable = ({ parcels, shippingType }: IPackagesInfoCardProps) => {
  return (
    <>
      <PackagesInfoTableRow
        packageNumber="Package number"
        packageTrackingNumber="Package tracking number"
        dimensions="Dimensions (L x W x H)"
        weight="Weight"
        declaredValue="Declared Value"
        shippingType={shippingType}
        isTableHead
      />

      <Stack space={0}>
        {parcels.map((parcel, index) => (
          <PackagesInfoTableRow
            key={index}
            packageNumber={index + 1}
            packageTrackingNumber="-"
            dimensions={
              parcel.dimensions.length && parcel.dimensions.width && parcel.dimensions.height
                ? `${parcel.dimensions.length}x${parcel.dimensions.width}x${parcel.dimensions.height} in`
                : "-"
            }
            weight={`${parcel.weight} lb`}
            declaredValue={`$${parcel.totalPrice}`}
            shippingType={shippingType}
          />
        ))}
      </Stack>
    </>
  )
}
