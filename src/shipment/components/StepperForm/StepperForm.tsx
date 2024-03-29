import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { useCheckUpdates, useCreateShipment, useUpdateShipment } from "@/shipment/hooks"
import { useShipmentById } from "@/shared/data"
import { scrollTo } from "@/shared/utils"
import {
  DIMENSION_DEFAULT,
  EDIT,
  PACKAGE_COST_DEFAULT,
  PACKAGE_CURRENCY_DEFAULT,
  PACKAGE_ID_DEFAULT,
  PACKAGE_QUANTITY_DEFAULT,
  PACKAGE_WEIGHT_DEFAULT,
  READY_DATE_DEFAULT,
  TOTAL_PACKAGES_NUMBER_DEFAULT,
  TRACKING,
} from "@/constants"
import { IShipmentResponse } from "@/api/types"
import {
  PackageType,
  PickupType,
  RouteParams,
  ShippingType,
  ShipmentState,
  PackagingType,
  IdenticalPackagesType,
  ResidentialType,
} from "@/shared/types"
import { StepName, IStepsDataItem, StepperState } from "@/shipment/types"

import { Box, Stepper, useStepperContext } from "@/shared/components"
import { StepItem, StepperHeader } from "@/shipment/components"

const initialShipmentState: ShipmentState = {
  sender: {
    name: "",
    phone: "",
    extension: "",
    email: "",
    company: "",
    fullAddress: {
      displayName: "",
      country: "United States",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      latitude: "",
      longitude: "",
    },
  },
  senderReturn: {
    name: "",
    phone: "",
    extension: "",
    email: "",
    company: "",
    fullAddress: {
      displayName: "",
      country: "",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      latitude: "",
      longitude: "",
    },
  },
  recipient: {
    name: "",
    phone: "",
    extension: "",
    email: "",
    company: "",
    fullAddress: {
      displayName: "",
      country: "United States",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      latitude: "",
      longitude: "",
      isResidential: JSON.parse(ResidentialType.Nonresidential),
    },
  },
  packaging: {
    pickupType: PickupType.DEFAULT,
    packagingType: PackagingType.Own,
    totalPackagesNumber: TOTAL_PACKAGES_NUMBER_DEFAULT,
    packageContent: "",
    identicalPackages: IdenticalPackagesType.Identical,
  },
  parcels: {
    [PACKAGE_ID_DEFAULT]: {
      weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
      dimensions: {
        length: `${DIMENSION_DEFAULT}`,
        width: `${DIMENSION_DEFAULT}`,
        height: `${DIMENSION_DEFAULT}`,
      },
      totalPrice: `${PACKAGE_COST_DEFAULT}`,
      totalCurrency: PACKAGE_CURRENCY_DEFAULT,
      packageId: PACKAGE_ID_DEFAULT,
      packageType: PackageType.Custom,
      quantity: PACKAGE_QUANTITY_DEFAULT,
    },
  },
  date: READY_DATE_DEFAULT,
  rate: {
    rateType: "",
    name: "",
    price: 0,
    currency: "",
    id: "",
  },
  currentLocation: {
    displayName: "",
    latitude: "",
    longitude: "",
  },
  shipmentStatus: null,
  hasReturnAddress: false,
}

interface IStepperFormProps {
  title: string
  defaultStep: StepName
  stepsData: IStepsDataItem[]
  setStepperState: React.Dispatch<React.SetStateAction<StepperState>>
}

export const StepperForm = ({
  title,
  defaultStep,
  stepsData,
  setStepperState,
}: IStepperFormProps) => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const navigate = useNavigate()
  const [shippingType, setShippingType] = useBoundStore(
    (state) => [state.shippingType, state.setShippingType],
    shallow,
  )
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")
  const { data } = useShipmentById(shipmentId)

  const methods = useForm<ShipmentState>({
    mode: "onChange",
    defaultValues: {
      sender: data?.sender || initialShipmentState.sender,
      senderReturn: data?.senderReturn || initialShipmentState.senderReturn,
      recipient: data?.recipient || initialShipmentState.recipient,
      packaging: data?.packaging || initialShipmentState.packaging,
      parcels: data?.parcels || initialShipmentState.parcels,
      date: data?.date || initialShipmentState.date,
      rate: data?.rate || initialShipmentState.rate,
      shipmentStatus: data?.shipmentStatus || initialShipmentState.shipmentStatus,
      hasReturnAddress: data?.hasReturnAddress || initialShipmentState.hasReturnAddress,
    },
  })

  useCheckUpdates({ formState: methods.getValues(), setStepperState })

  const { mutate: createShipment } = useCreateShipment()
  const { mutate: updateShipment } = useUpdateShipment()

  const onSubmitHandler = (data: ShipmentState) =>
    isEditMode
      ? updateShipment(data, {
          onSuccess: (data: IShipmentResponse) => {
            if (shippingType === ShippingType.Quote) {
              setShippingType(ShippingType.Shipment)
              navigate(`${EDIT}/shipment/${data.id}`)
            } else {
              navigate(`${TRACKING}/${shippingType}/${data.id}`)
            }
          },
        })
      : createShipment(data, {
          onSuccess: (data: IShipmentResponse) => {
            if (shippingType === ShippingType.Quote) {
              setShippingType(ShippingType.Shipment)
              navigate(`${EDIT}/shipment/${data.id}`)
            } else {
              navigate(`${TRACKING}/${shippingType}/${data.id}`)
            }
          },
        })

  useEffect(() => {
    scrollTo({ position: { top: 0, left: 0 } })
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <Stepper defaultSelected={[defaultStep]}>
          <StepperHeader title={title} />
          <StepperFormContainer stepsData={stepsData} shippingType={shippingType} />
          {/* <StepperFooter /> */}
        </Stepper>
      </form>
    </FormProvider>
  )
}

const StepperFormContainer = ({
  stepsData,
  shippingType,
}: {
  stepsData: IStepsDataItem[]
  shippingType: ShippingType
}) => {
  const { stepHeight } = useStepperContext("StepperForm")

  return (
    <Box
      css={{
        "@sm": {
          position: "relative",
          height: stepHeight,
          minHeight: shippingType === ShippingType.Quote ? 400 : 700,
        },
      }}
    >
      {stepsData.map((step) => (
        <StepItem
          key={step.title}
          title={step.title}
          data={step.data}
          mainContent={step.mainContent}
          totalSteps={stepsData.length}
        />
      ))}
    </Box>
  )
}
