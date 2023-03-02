import { IParcel, ShippingType } from "@/shared/types"

import { Copy, Divider, Flex, Stack } from "@/shared/components"

import { SPackagesInfoCard } from "./PackagesInfoCard.styles"

interface IPackagesInfoCardProps {
  parcel: IParcel
  shippingType: ShippingType
}

export const PackagesInfoCard = ({ parcel, shippingType }: IPackagesInfoCardProps) => {
  return (
    <SPackagesInfoCard key={parcel.packageId}>
      <Flex align="start" css={{ width: "100%", paddingBottom: "$16" }}>
        <Copy scale={8} color="system-black" bold>
          Package {parcel.packageId}
        </Copy>
      </Flex>
      <Divider />
      <PackagesInfoCardDetails parcel={parcel} shippingType={shippingType} />
    </SPackagesInfoCard>
  )
}

const PackagesInfoCardDetails = ({ parcel, shippingType }: IPackagesInfoCardProps) => {
  return (
    <Stack space={12} css={{ marginTop: "$16" }}>
      {/* TODO: add package tracking number */}
      {shippingType === ShippingType.Shipment ? (
        <PackagesInfoCardDetailsLine title="Tracking number" value="-" />
      ) : null}
      <PackagesInfoCardDetailsLine
        title="Dimensions (L x W x H)"
        value={`${parcel.dimensions.length}x${parcel.dimensions.width}x${parcel.dimensions.height} in`}
      />
      <PackagesInfoCardDetailsLine
        title="Weight"
        value={`${parseFloat(parcel.weight) * parcel.quantity} lb`}
      />
      {shippingType === ShippingType.Shipment ? (
        <PackagesInfoCardDetailsLine
          title="Declared value"
          value={`$${parseInt(parcel.totalPrice) * parcel.quantity}`}
        />
      ) : null}
    </Stack>
  )
}

const PackagesInfoCardDetailsLine = ({ title, value }: { title: string; value: string }) => (
  <Flex align="center" justify="between">
    <Copy scale={9} css={{ paddingRight: "$32", minWidth: "max-content" }}>
      {title}
    </Copy>
    <Copy scale={9} color="system-black" truncate>
      {value}
    </Copy>
  </Flex>
)
