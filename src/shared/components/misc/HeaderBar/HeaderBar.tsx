import { createShipmentFn } from "@/api/shipmentApi"
import { ShipmentInput } from "@/api/types"
import { Box, Button, ButtonIcon, Copy, Flex, Hidden } from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"
import { ShipmentStatus } from "@/shared/types"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

export const HeaderBar = ({ title, onClick }: { title: string; onClick: () => void }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const { mutate: createShipment, isLoading } = useMutation(
    () =>
      createShipmentFn({
        ORGANIZATION_ID: user?.activeOrganizationId,
        SHIPMENT_STATUS:
          Object.keys(ShipmentStatus)[
            Object.values(ShipmentStatus).indexOf(ShipmentStatus.QUOTE_DRAFT)
          ],
      } as ShipmentInput),
    {
      // onSuccess: ({ id }: IShipmentResponse) => {
      onSuccess: ({ id }: any) => {
        // TODO: navigate to edit shipment page or tracking page based on id
        // shippingType === ShippingType.Quote
        id ? navigate(`/edit/quote/${id}`) : navigate(`/edit/shipment/${id}`)
      },
      // onError: (error: any) => {
      //   if (Array.isArray((error as any).response.data.error)) {
      //     ;(error as any).response.data.error.forEach((el: any) =>
      //       toast.error(el.message, {
      //         position: "top-right",
      //       }),
      //     )
      //   } else {
      //     toast.error((error as any).response.data.message, {
      //       position: "top-right",
      //     })
      //   }
      // },
    },
  )

  // Add logic to conditionally create or update shipment
  const onSaveHandler = () => createShipment()

  return (
    <Flex
      align="center"
      css={{ padding: "$16 $8", "@sm": { paddingTop: "$0", paddingBottom: "$40" } }}
    >
      <Hidden above="sm">
        <ButtonIcon
          type="button"
          ariaLabel="Back button"
          icon={<IconChevronLeft size="sm" />}
          onClick={onClick}
          css={{ flex: "0 0 auto" }}
        />
      </Hidden>
      <Box
        css={{
          flex: "1 1 100%",
          paddingRight: "$32",
          textAlign: "center",
          "@sm": { textAlign: "start" },
        }}
      >
        <Copy scale={{ "@initial": 8, "@sm": 5 }} color="system-black" bold>
          {title}
        </Copy>
      </Box>
      <Hidden below="sm">
        <Button action="secondary" onClick={onSaveHandler} css={{ width: "$128", height: "$40" }}>
          {/* TODO: fix default button copy */}
          <Copy as="span" scale={8} color="system-black" bold>
            Save
          </Copy>
        </Button>
      </Hidden>
    </Flex>
  )
}
