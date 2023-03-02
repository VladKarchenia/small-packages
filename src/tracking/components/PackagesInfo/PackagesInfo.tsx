import { useMemo, useState } from "react"

import { createContext } from "@/shared/utils"
import { mediaQueries } from "@/stitches/theme"
import { IPackaging, IParcels, ShippingType } from "@/shared/types"
import { useMedia } from "@/shared/hooks"

import { Copy, Flex, GridContainer, Hidden, Spacer, Stack } from "@/shared/components"
import { IconLongArrowDown, IconLongArrowTop } from "@/shared/icons"
import { PackagesInfoCard, PackagesInfoTable } from "@/tracking/components"

type PackagesContextValue = {
  ascSortDirection: boolean
  setAscSortDirection: React.Dispatch<React.SetStateAction<boolean>>
}

export const [PackagesProvider, usePackagesContext] =
  createContext<PackagesContextValue>("Packages")

interface IPackagesInfoProps {
  packaging: IPackaging
  parcels: IParcels
  shippingType: ShippingType
}

export const PackagesInfo = ({ packaging, parcels, shippingType }: IPackagesInfoProps) => {
  const [ascSortDirection, setAscSortDirection] = useState(true)
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)

  const sortedParcels = useMemo(
    () =>
      Object.values(parcels).sort((a, b) =>
        ascSortDirection
          ? parseInt(a.packageId) - parseInt(b.packageId)
          : parseInt(b.packageId) - parseInt(a.packageId),
      ),
    [parcels, ascSortDirection],
  )

  return (
    <PackagesProvider ascSortDirection={ascSortDirection} setAscSortDirection={setAscSortDirection}>
      <GridContainer
        fullBleed={{ "@initial": false, "@sm": true }}
        css={{
          "@initial": {
            maxWidth: "100%",
            paddingBottom: "$48",
          },
          "@md": {
            marginLeft: "initial",
          },
        }}
      >
        <Hidden above="md">
          <Flex
            align="center"
            onClick={() => setAscSortDirection(!ascSortDirection)}
            css={{ gap: "$4" }}
          >
            <Copy scale={8} color="system-black" bold>
              All packages
            </Copy>
            {ascSortDirection ? <IconLongArrowDown /> : <IconLongArrowTop />}
          </Flex>
          <Spacer size={16} />
        </Hidden>

        <Flex css={{ gap: "$16", "@md": { gap: "$32" } }}>
          <Flex css={{ gap: "$4" }}>
            <Copy scale={{ "@initial": 9, "@md": 8 }}>
              {isMediumAndAbove ? "Quantity" : "QTY"}:
            </Copy>
            <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
              {packaging.totalPackagesNumber}
            </Copy>
          </Flex>
          <Flex css={{ gap: "$4" }}>
            <Copy scale={{ "@initial": 9, "@md": 8 }}>
              {isMediumAndAbove ? "Total weight" : "TW"}:
            </Copy>
            <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
              {Object.values(parcels)
                .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                .toFixed(1)}
            </Copy>
          </Flex>
          {shippingType === ShippingType.Shipment ? (
            <Flex css={{ gap: "$4" }}>
              <Copy scale={{ "@initial": 9, "@md": 8 }}>
                {isMediumAndAbove ? "Declared value" : "DV"}:
              </Copy>
              <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                {Object.values(parcels)
                  .reduce((sum, i) => (sum += parseInt(i.totalPrice) * i.quantity), 0)
                  .toFixed(0)}
              </Copy>
            </Flex>
          ) : null}
        </Flex>

        <Spacer size={{ "@initial": 16, "@md": 24 }} />

        <Hidden above="md">
          <Stack space={16}>
            {sortedParcels.map((parcel) => (
              <PackagesInfoCard
                key={parcel.packageId}
                parcel={parcel}
                shippingType={shippingType}
              />
            ))}
          </Stack>
        </Hidden>

        <Hidden below="md">
          <PackagesInfoTable parcels={sortedParcels} shippingType={shippingType} />
        </Hidden>
      </GridContainer>
    </PackagesProvider>
  )
}
