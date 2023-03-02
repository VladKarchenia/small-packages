import { ShippingType } from "@/shared/types"

import { Copy, Flex, Grid, GridItem, Redacted } from "@/shared/components"
import { IconDropArrowDown, IconDropArrowTop } from "@/shared/icons"

import { usePackagesContext } from "../PackagesInfo"

interface IPackagesInfoTableRowProps {
  packageNumber?: string
  packageTrackingNumber?: string
  dimensions?: string
  weight?: string
  declaredValue?: string
  shippingType: ShippingType
  isTableHead?: boolean
  isPlaceholder?: boolean
}

export const PackagesInfoTableRow = ({
  packageNumber,
  packageTrackingNumber,
  dimensions,
  weight,
  declaredValue,
  shippingType,
  isTableHead,
  isPlaceholder,
}: IPackagesInfoTableRowProps) => {
  return (
    <Grid
      columns={24}
      columnGap={{ "@sm": 16, "@lg": 32 }}
      css={{
        padding: "$16",
        borderBottom: isTableHead ? "1px solid $neutrals-4" : "none",
      }}
    >
      <GridItem column={shippingType === ShippingType.Quote ? "1 / span 4" : "1 / span 4"}>
        {isTableHead ? (
          <SortablePackageNumber packageNumber={packageNumber} isPlaceholder={isPlaceholder} />
        ) : isPlaceholder ? (
          <Redacted height="$24" width="$80" text animated />
        ) : (
          <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black">
            {packageNumber}
          </Copy>
        )}
      </GridItem>
      {shippingType === ShippingType.Shipment ? (
        <GridItem column="5 / span 6">
          {isPlaceholder && !isTableHead ? (
            <Redacted height="$24" width="100px" text animated />
          ) : (
            <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black" bold={isTableHead}>
              {packageTrackingNumber}
            </Copy>
          )}
        </GridItem>
      ) : null}
      <GridItem column={shippingType === ShippingType.Quote ? "5 / span 10" : "11 / span 6"}>
        {isPlaceholder && !isTableHead ? (
          <Redacted height="$24" width="140px" text animated />
        ) : (
          <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black" bold={isTableHead}>
            {dimensions}
          </Copy>
        )}
      </GridItem>
      <GridItem column={shippingType === ShippingType.Quote ? "15 / span 10" : "17 / span 4"}>
        {isPlaceholder && !isTableHead ? (
          <Redacted height="$24" width="100px" text animated />
        ) : (
          <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black" bold={isTableHead}>
            {weight}
          </Copy>
        )}
      </GridItem>
      {shippingType === ShippingType.Shipment ? (
        <GridItem column="21 / span 4">
          {isPlaceholder && !isTableHead ? (
            <Redacted height="$24" width="100px" text animated />
          ) : (
            <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black" bold={isTableHead}>
              {declaredValue}
            </Copy>
          )}
        </GridItem>
      ) : null}
    </Grid>
  )
}

const SortablePackageNumber = ({
  packageNumber,
  isPlaceholder,
}: {
  packageNumber?: string
  isPlaceholder?: boolean
}) => {
  const { ascSortDirection, setAscSortDirection } = usePackagesContext("SortablePackageNumber")

  return (
    <>
      {isPlaceholder ? (
        <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black" bold>
          {packageNumber}
        </Copy>
      ) : (
        <Flex
          align="center"
          justify="between"
          css={{ cursor: "pointer" }}
          onClick={() => setAscSortDirection(!ascSortDirection)}
        >
          <Copy scale={{ "@sm": 9, "@lg": 8 }} color="system-black" bold>
            {packageNumber}
          </Copy>
          <Flex css={{ paddingTop: "$2" }}>
            {ascSortDirection ? <IconDropArrowDown size="xs" /> : <IconDropArrowTop size="xs" />}
          </Flex>
        </Flex>
      )}
    </>
  )
}
