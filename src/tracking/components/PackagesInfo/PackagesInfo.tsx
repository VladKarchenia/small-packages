import { useMemo, useState } from "react"

import { createContext } from "@/shared/utils"
import { mediaQueries } from "@/stitches/theme"
import { IPackaging, IParcel, IParcels, ShippingType } from "@/shared/types"
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

  const devidedParcels = useMemo(
    () =>
      sortedParcels.reduce(
        (res: IParcel[], parcel) => [
          ...res,
          ...Array.from({ length: parcel.quantity }, () => ({ ...parcel, quantity: 1 })),
        ],
        [],
      ),
    [sortedParcels],
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
            css={{ gap: "$4", color: "$theme-b-n3" }}
          >
            <Copy scale={3} fontWeight="bold">
              All packages
            </Copy>
            {ascSortDirection ? <IconLongArrowDown /> : <IconLongArrowTop />}
          </Flex>
          <Spacer size={16} />
        </Hidden>

        <Flex css={{ gap: "$16", "@md": { gap: "$32" } }}>
          <Flex css={{ gap: "$4" }}>
            <Copy scale={9} color="theme-n6-n5">
              {isMediumAndAbove ? "Quantity" : "QTY"}:
            </Copy>
            <Copy scale={9} color="theme-b-n3">
              {packaging.totalPackagesNumber}
            </Copy>
          </Flex>
          <Flex css={{ gap: "$4" }}>
            <Copy scale={9} color="theme-n6-n5">
              {isMediumAndAbove ? "Total weight" : "TW"}:
            </Copy>
            <Copy scale={9} color="theme-b-n3">
              {Object.values(parcels)
                .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                .toFixed(1)}
            </Copy>
          </Flex>
          {shippingType === ShippingType.Shipment ? (
            <Flex css={{ gap: "$4" }}>
              <Copy scale={9} color="theme-n6-n5">
                {isMediumAndAbove ? "Declared value" : "DV"}:
              </Copy>
              <Copy scale={9} color="theme-b-n3">
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
            {devidedParcels.map((parcel, index) => (
              <PackagesInfoCard
                key={index}
                parcel={parcel}
                packageNumber={index + 1}
                shippingType={shippingType}
              />
            ))}
          </Stack>
        </Hidden>

        <Hidden below="md">
          <PackagesInfoTable parcels={devidedParcels} shippingType={shippingType} />
        </Hidden>
      </GridContainer>
    </PackagesProvider>
  )
}
