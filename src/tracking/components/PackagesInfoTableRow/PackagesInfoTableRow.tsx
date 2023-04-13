import { ShippingType } from "@/shared/types"
import { spaceAndEnterKeyDown } from "@/shared/utils"

import { Copy, Flex, Grid, GridItem, Redacted } from "@/shared/components"
import { IconDropArrowDown, IconDropArrowTop } from "@/shared/icons"

import { usePackagesContext } from "../PackagesInfo"

interface IPackagesInfoTableRowProps {
  packageNumber?: string | number
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
      align="center"
      css={{
        padding: "$16",
        borderBottom: isTableHead ? "1px solid $theme-n4-n7" : "none",
      }}
    >
      <GridItem column={shippingType === ShippingType.Quote ? "1 / span 4" : "1 / span 4"}>
        {isTableHead ? (
          <SortablePackageNumber packageNumber={packageNumber} isPlaceholder={isPlaceholder} />
        ) : isPlaceholder ? (
          <Redacted height="$24" width="$80" text animated />
        ) : (
          <Copy color="theme-b-n3">{packageNumber}</Copy>
        )}
      </GridItem>
      {shippingType === ShippingType.Shipment ? (
        <GridItem column="5 / span 6">
          {isPlaceholder && !isTableHead ? (
            <Redacted height="$24" width="100px" text animated />
          ) : (
            <Copy
              color="theme-b-n3"
              fontWeight={isTableHead ? "bold" : "regular"}
              uppercase={{ "@initial": false, "@lg": isTableHead ? true : false }}
            >
              {packageTrackingNumber}
            </Copy>
          )}
        </GridItem>
      ) : null}
      <GridItem column={shippingType === ShippingType.Quote ? "5 / span 10" : "11 / span 6"}>
        {isPlaceholder && !isTableHead ? (
          <Redacted height="$24" width="140px" text animated />
        ) : (
          <Copy
            color="theme-b-n3"
            fontWeight={isTableHead ? "bold" : "regular"}
            uppercase={{ "@initial": false, "@lg": isTableHead ? true : false }}
          >
            {dimensions}
          </Copy>
        )}
      </GridItem>
      <GridItem column={shippingType === ShippingType.Quote ? "15 / span 10" : "17 / span 4"}>
        {isPlaceholder && !isTableHead ? (
          <Redacted height="$24" width="100px" text animated />
        ) : (
          <Copy
            color="theme-b-n3"
            fontWeight={isTableHead ? "bold" : "regular"}
            uppercase={{ "@initial": false, "@lg": isTableHead ? true : false }}
          >
            {weight}
          </Copy>
        )}
      </GridItem>
      {shippingType === ShippingType.Shipment ? (
        <GridItem column="21 / span 4">
          {isPlaceholder && !isTableHead ? (
            <Redacted height="$24" width="100px" text animated />
          ) : (
            <Copy
              color="theme-b-n3"
              fontWeight={isTableHead ? "bold" : "regular"}
              uppercase={{ "@initial": false, "@lg": isTableHead ? true : false }}
            >
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
  packageNumber?: string | number
  isPlaceholder?: boolean
}) => {
  const { ascSortDirection, setAscSortDirection } = usePackagesContext("SortablePackageNumber")

  return (
    <>
      {isPlaceholder ? (
        <Copy color="theme-b-n3" fontWeight="bold">
          {packageNumber}
        </Copy>
      ) : (
        <Flex
          align="center"
          justify="between"
          onClick={() => setAscSortDirection(!ascSortDirection)}
          tabIndex={0}
          onKeyDown={(e: { key: string }) =>
            spaceAndEnterKeyDown(e.key) && setAscSortDirection(!ascSortDirection)
          }
          css={{
            height: "$40",
            paddingX: "$12",
            backgroundColor: "$theme-vlt-ydt",
            border: "1px solid $theme-vl-yl",
            color: "$theme-b-n3",
            transition: "150ms ease-out",
            cursor: "pointer",

            hover: {
              backgroundColor: "$theme-vlr-ydr",
              borderColor: "$theme-vl-yl",
            },

            keyboardFocus: {
              outline: "1px solid $theme-vl-n3",
            },
          }}
        >
          <Copy fontWeight="bold" uppercase={{ "@initial": false, "@lg": true }}>
            {packageNumber}
          </Copy>
          <Flex css={{ color: "inherit" }}>
            {ascSortDirection ? <IconDropArrowDown size="xs" /> : <IconDropArrowTop size="xs" />}
          </Flex>
        </Flex>
      )}
    </>
  )
}
