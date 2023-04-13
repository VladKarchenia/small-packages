import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useFormContext } from "react-hook-form"

import { useBoundStore } from "@/store"
import { useCreateShipment, useUpdateShipment } from "@/shipment/hooks"
import { IShipmentResponse } from "@/api/types"
import { RouteParams, ShippingType, ShipmentState } from "@/shared/types"
import { HOME, TRACKING } from "@/constants"

import { Button, Flex, Hidden, Link, Spacer } from "@/shared/components"
import { StepActionsBar } from "@/shipment/components"

export const StepperFooter = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const shippingType = useBoundStore((state) => state.shippingType)
  const navigate = useNavigate()
  const { watch, getValues } = useFormContext<ShipmentState>()
  const { date } = watch()
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const { mutate: createShipment } = useCreateShipment()
  const { mutate: updateShipment } = useUpdateShipment()

  return (
    <Flex direction="column">
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        <Flex css={{ gap: "$16" }}>
          {shippingType === ShippingType.Quote ? (
            <Button type="submit" full disabled={!date}>
              Create shipment
            </Button>
          ) : (
            <Button
              type="submit"
              full
              onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}`)}
            >
              Continue
            </Button>
          )}

          {/* TODO: different requests for create and edit mode, also need to define if this button is disabled based on fields value */}
          {/* TODO: after save request need to redirect to the quote details page */}
          {shippingType === ShippingType.Quote ? (
            <Button
              action="secondary"
              full
              disabled={false}
              onClick={() =>
                isEditMode
                  ? updateShipment(getValues(), {
                      onSuccess: (data: IShipmentResponse) => {
                        if (shippingType === ShippingType.Quote) {
                          navigate(`${TRACKING}/${shippingType}/${data.id}`)
                        }
                        // TODO: else navigate to edit shipment page
                        //  else {
                        //   navigate(`${TRACKING}/${data.id}`)
                        // }
                      },
                    })
                  : createShipment(getValues(), {
                      onSuccess: (data: IShipmentResponse) => {
                        if (shippingType === ShippingType.Quote) {
                          navigate(`${TRACKING}/${shippingType}/${data.id}`)
                        }
                        // TODO: else navigate to edit shipment page
                        //  else {
                        //   navigate(`${TRACKING}/${data.id}`)
                        // }
                      },
                    })
              }
              css={{ "@sm": { display: "none" } }}
            >
              Save
            </Button>
          ) : null}
        </Flex>
      </StepActionsBar>

      {/* TODO: Add print button Here */}

      <Hidden above="sm">
        <Spacer size={20} />
        <Link
          as="button"
          type="button"
          onClick={() => navigate(HOME)}
          fontWeight="bold"
          css={{ width: "100%" }}
        >
          Back to Home page
        </Link>
        <Spacer size={24} />
      </Hidden>
    </Flex>
  )
}
