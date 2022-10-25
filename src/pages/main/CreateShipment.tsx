import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormInput,
  Grid,
  GridContainer,
  GridItem,
  Spacer,
  Stack,
  Title,
  useAccordionContext,
} from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { IStep, ShipmentContextProvider, useShipmentContext } from "@/shared/state"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCallback } from "react"
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { object, string, TypeOf } from "zod"

export const CreateShipment = () => {
  return (
    <ShipmentContextProvider>
      <CommonLayout>
        <GridContainer>
          <Spacer size={40} />
          <Box>Create Shipment</Box>
          <Spacer size={40} />
          <AccordionWrapper />
        </GridContainer>
      </CommonLayout>
    </ShipmentContextProvider>
  )
}

const AccordionWrapper = () => {
  const shipmentContext = useShipmentContext()

  const stepsData = [
    {
      title: "1. Address Information",
      data: shipmentContext?.state.info,
      content: <AddressInfo stepName={shipmentContext?.state.info.name} nextStep="shipment" />,
    },
    {
      title: "2. Shipment Details",
      data: shipmentContext?.state.shipment,
      content: (
        <ShipmentDetails stepName={shipmentContext?.state.shipment.name} nextStep="summary" />
      ),
    },
    {
      title: "3. Summary",
      nextStep: "confirmation",
      data: shipmentContext?.state.summary,
      content: <Summary stepName={shipmentContext?.state.summary.name} nextStep="confirmation" />,
    },
    {
      title: "4. Confirmation",
      data: shipmentContext?.state.confirmation,
      content: <Confirmation />,
    },
  ]

  // const readStorage = () =>
  //   window.sessionStorage.getItem("selectedStep") || shipmentContext?.state.activeStep || ""

  // const [previouslySelectedPanel, setPreviouslySelectedPanel] = useStorageState(
  //   "sessionStorage",
  //   "selectedStep",
  //   readStorage(),
  // )

  const handleSelectedChange = useCallback(
    (selected: string[]) => {
      if (selected.length) {
        // setPreviouslySelectedPanel(selected[0])
        shipmentContext?.dispatch({
          type: "SET_ACTIVE_STEP",
          payload: selected[0],
        })
      }
    },
    // [setPreviouslySelectedPanel],
    [],
  )

  return (
    <Accordion
      // defaultSelected={[previouslySelectedPanel]}
      defaultSelected={["info"]}
      css={{ borderTop: 0 }}
      onSelectedChange={handleSelectedChange}
    >
      {stepsData.map((step) => (
        <AccordionItemWrapper
          key={step.title}
          title={step.title}
          data={step.data}
          content={step.content}
        />
      ))}
    </Accordion>
  )
}

const AccordionItemWrapper = ({
  title,
  data,
  content,
}: {
  title: string
  data?: IStep
  content: React.ReactNode
}) => {
  return (
    <AccordionItem value={data?.name || ""} disabled={data?.disabled}>
      <AccordionHeader scale={4} thin>
        <AccordionButton
          size="large"
          compact
          css={{
            padding: "$32",

            hover: {
              backgroundColor: "$system-white",
            },
          }}
        >
          {title}
        </AccordionButton>
      </AccordionHeader>
      <AccordionPanel contentCss={{ padding: "$32" }}>{content}</AccordionPanel>
    </AccordionItem>
  )
}

const AddressInfo = ({ stepName = "", nextStep }: { stepName?: string; nextStep: string }) => {
  const addressInfoSchema = object({
    sendersName: string().min(1, "Your name is required"),
    fromAddress: string().min(1, "Your address is required"),
    recipientsName: string().min(1, "Recipient's address is required"),
    toAddress: string().min(1, "Recipient's address is required"),
  })

  type AddressInfoInput = TypeOf<typeof addressInfoSchema>

  const defaultValues: AddressInfoInput = {
    sendersName: "",
    fromAddress: "",
    recipientsName: "",
    toAddress: "",
  }

  const methods = useForm<AddressInfoInput>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(addressInfoSchema),
    reValidateMode: "onBlur",
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods

  const { setSelected } = useAccordionContext("AddressInfo")
  const shipmentContext = useShipmentContext()

  const onSubmitHandler: SubmitHandler<AddressInfoInput> = (values) => {
    addressInfoSchema.parse(values)

    if (isValid) {
      setSelected(["shipment"])

      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: stepName,
          completed: true,
          disabled: false,
        },
      })
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "shipment",
          completed: false,
          disabled: false,
        },
      })
    }
  }

  // const handleSelect = (step: string) => {
  //   if (isValid) {
  //     setSelected([step])

  //     if (stepName === "info") {
  //       shipmentContext?.dispatch({
  //         type: "SET_STEP_DATA",
  //         payload: {
  //           name: stepName,
  //           completed: true,
  //           disabled: false,
  //         },
  //       })
  //       shipmentContext?.dispatch({
  //         type: "SET_STEP_DATA",
  //         payload: {
  //           name: "shipment",
  //           completed: false,
  //           disabled: false,
  //         },
  //       })
  //     }

  //     if (stepName === "shipment") {
  //       shipmentContext?.dispatch({
  //         type: "SET_STEP_DATA",
  //         payload: {
  //           name: stepName,
  //           completed: true,
  //           disabled: false,
  //         },
  //       })
  //       shipmentContext?.dispatch({
  //         type: "SET_STEP_DATA",
  //         payload: {
  //           name: "summary",
  //           completed: false,
  //           disabled: false,
  //         },
  //       })
  //     }

  //     if (stepName === "summary") {
  // shipmentContext?.dispatch({
  //   type: "SET_STEP_DATA",
  //   payload: {
  //     name: stepName,
  //     completed: true,
  //     disabled: false,
  //   },
  // })
  // shipmentContext?.dispatch({
  //   type: "SET_STEP_DATA",
  //   payload: {
  //     name: "confirmation",
  //     completed: false,
  //     disabled: false,
  //   },
  // })
  //     }

  //     if (stepName === "confirmation") {
  //       shipmentContext?.dispatch({
  //         type: "SET_STEP_DATA",
  //         payload: {
  //           name: stepName,
  //           completed: true,
  //           disabled: false,
  //         },
  //       })
  //     }
  //   }
  // }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <GridContainer fullBleed>
          <Grid
            columns={{ "@initial": "1fr", "@sm": "1fr 1fr" }}
            columnGap={{ "@initial": 0, "@sm": 32 }}
          >
            <GridItem>
              <Title as="h5">From Address</Title>
              <Spacer size={24} />
              <Stack space={24}>
                <Controller
                  control={control}
                  defaultValue={defaultValues.sendersName}
                  name="sendersName"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="sendersName"
                        label="Your Name"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
                <Controller
                  control={control}
                  defaultValue={defaultValues.fromAddress}
                  name="fromAddress"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="fromAddress"
                        label="Address"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
              </Stack>
            </GridItem>
            <GridItem>
              <Title as="h5">To Address</Title>
              <Spacer size={24} />
              <Stack space={24}>
                <Controller
                  control={control}
                  defaultValue={defaultValues.recipientsName}
                  name="recipientsName"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="recipientsName"
                        label="Recipient Name"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
                <Controller
                  control={control}
                  defaultValue={defaultValues.toAddress}
                  name="toAddress"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="toAddress"
                        label="Address"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
              </Stack>
            </GridItem>
          </Grid>
          <Spacer size={32} />
          <Button type="submit">Continue</Button>
          {/* <Button onClick={() => handleSelect(nextStep)} type="submit"> */}
          {/* <Button
            onClick={() => (nextStep ? handleSelect(nextStep) : navigate("/"))}
            type={nextStep ? "submit" : "button"}
          >
            {nextStep ? "Continue" : "Finish"}
          </Button> */}
          <Spacer size={32} />
        </GridContainer>
      </form>
    </FormProvider>
  )
}

const ShipmentDetails = ({ stepName = "", nextStep }: { stepName?: string; nextStep: string }) => {
  const packageInfoSchema = object({
    height: string().min(1, "Height is required"),
    width: string().min(1, "Width is required"),
    depth: string().min(1, "Depth is required"),
  })

  type PackageInfoInput = TypeOf<typeof packageInfoSchema>

  const defaultValues: PackageInfoInput = {
    height: "",
    width: "",
    depth: "",
  }

  const methods = useForm<PackageInfoInput>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(packageInfoSchema),
    // reValidateMode: "onBlur",
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods

  const { setSelected } = useAccordionContext("ShipmentDetails")
  const shipmentContext = useShipmentContext()

  const onSubmitHandler: SubmitHandler<PackageInfoInput> = (values) => {
    packageInfoSchema.parse(values)

    if (isValid) {
      setSelected(["summary"])

      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: stepName,
          completed: true,
          disabled: false,
        },
      })
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "summary",
          completed: false,
          disabled: false,
        },
      })
    }
  }

  // const handleSelect = (step: string) => {
  //   if (isValid) {
  //     setSelected([step])

  //     shipmentContext?.dispatch({
  //       type: "SET_STEP_DATA",
  //       payload: {
  //         name: stepName,
  //         completed: true,
  //         disabled: false,
  //       },
  //     })
  //     shipmentContext?.dispatch({
  //       type: "SET_STEP_DATA",
  //       payload: {
  //         name: "summary",
  //         completed: false,
  //         disabled: false,
  //       },
  //     })
  //   }
  // }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <GridContainer fullBleed>
          <Grid
            columns={{ "@initial": "1fr", "@sm": "1fr 1fr 1fr" }}
            columnGap={{ "@initial": 0, "@sm": 32 }}
          >
            <GridItem>
              <Title as="h5">Package Details</Title>
              <Spacer size={24} />
              <Controller
                control={control}
                defaultValue={defaultValues.height}
                name="height"
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id="height"
                      label="Package height"
                      type="text"
                      error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </GridItem>
            <GridItem>
              <Spacer size={56} />
              <Controller
                control={control}
                defaultValue={defaultValues.width}
                name="width"
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id="width"
                      label="Package width"
                      type="text"
                      error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </GridItem>
            <GridItem>
              <Spacer size={56} />
              <Controller
                control={control}
                defaultValue={defaultValues.depth}
                name="depth"
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id="depth"
                      label="Package depth"
                      type="text"
                      error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </GridItem>
          </Grid>
          <Spacer size={32} />
          <Button type="submit">Continue</Button>
          {/* <Button onClick={() => handleSelect(nextStep)} type="submit"> */}
          <Spacer size={32} />
        </GridContainer>
      </form>
    </FormProvider>
  )
}

const Summary = ({ stepName = "", nextStep }: { stepName?: string; nextStep: string }) => {
  const { setSelected } = useAccordionContext("Summary")
  const shipmentContext = useShipmentContext()

  const handleSelect = () => {
    setSelected(["confirmation"])

    shipmentContext?.dispatch({
      type: "SET_STEP_DATA",
      payload: {
        name: stepName,
        completed: true,
        disabled: false,
      },
    })
    shipmentContext?.dispatch({
      type: "SET_STEP_DATA",
      payload: {
        name: "confirmation",
        completed: false,
        disabled: false,
      },
    })
  }

  return (
    <GridContainer fullBleed>
      <Box>Summary content</Box>
      <Spacer size={32} />
      <Button onClick={() => handleSelect()}>Continue</Button>
      <Spacer size={32} />
    </GridContainer>
  )
}

const Confirmation = () => {
  const navigate = useNavigate()

  const handleSelect = () => {
    return navigate("/")
  }

  return (
    <GridContainer fullBleed>
      <Box>Confirmation content</Box>
      <Spacer size={32} />
      <Button onClick={() => handleSelect()}>Finish</Button>
      <Spacer size={32} />
    </GridContainer>
  )
}
