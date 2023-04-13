import { useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { useBoundStore } from "@/store"
import {
  DIMENSION_DEFAULT,
  DIMENSION_MAX,
  DIMENSION_MIN,
  ENVELOPE_HEIGHT_DEFAULT,
  ENVELOPE_LENGTH_DEFAULT,
  PACKAGE_COST_DEFAULT,
  PACKAGE_COST_MAX,
  PACKAGE_COST_MIN,
  PACKAGE_CURRENCY_DEFAULT,
  PACKAGE_ID_DEFAULT,
  PACKAGE_QUANTITY_DEFAULT,
  PACKAGE_WEIGHT_DEFAULT,
  PACKAGE_WEIGHT_MAX,
  PACKAGE_WEIGHT_MIN,
  PARCEL_LIMIT,
  TOTAL_PACKAGES_NUMBER_DEFAULT,
} from "@/constants"
import { useMedia } from "@/shared/hooks"
import { CSS } from "@/stitches/config"
import { mediaQueries } from "@/stitches/theme"
import {
  PickupType,
  ShippingType,
  ShipmentState,
  PackagingType,
  PackageType,
  IdenticalPackagesType,
} from "@/shared/types"
import { StepName } from "@/shipment/types"

import {
  Box,
  Button,
  ButtonIcon,
  Copy,
  Divider,
  ErrorLabel,
  Flex,
  FormInput,
  FormInputGroup,
  FormInputGroupItem,
  FormRadioGroup,
  FormRadioInput,
  FormSelect,
  Grid,
  GridContainer,
  GridItem,
  Hidden,
  IconTooltip,
  Spacer,
  Stack,
  Title,
  useStepperContext,
} from "@/shared/components"
import { IconBin, IconPlus, IconWarning } from "@/shared/icons"
import { StepActionsBar, StepInputGroup } from "@/shipment/components"

const pickupTypeList: PickupType[] = Object.values(PickupType)
const packagingTypeList: PackagingType[] = Object.values(PackagingType)
const packagesAmountList: number[] = Array.from(new Array(PARCEL_LIMIT), (_, index) => index + 1)

export const PackageDetails = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: StepName.SHIPMENT, nextStep: StepName.DATE) => void
}) => {
  const shippingType = useBoundStore((state) => state.shippingType)
  const { setSelected } = useStepperContext("ShipmentDetails")

  const {
    watch,
    formState: { errors },
  } = useFormContext<ShipmentState>()
  const { packaging, parcels } = watch()
  const currentParcelsQuantity = Object.values(parcels).reduce((sum, i) => (sum += i.quantity), 0)

  const onContinueHandler = () => {
    setSelected([StepName.DATE])
    handleContinueClick(StepName.SHIPMENT, StepName.DATE)
  }

  return (
    <GridContainer fullBleed>
      <Hidden below="sm">
        <Title as="h3" scale={3}>
          Shipment Details
        </Title>
        <Spacer size={40} />
      </Hidden>
      <StepInputGroup
        start={<PickupTypeField />}
        end={
          <Grid
            columns={{
              "@initial": "1fr",
              "@md": shippingType === ShippingType.Quote ? "1fr 1fr" : "1fr",
            }}
            rows={{
              "@initial": shippingType === ShippingType.Quote ? "1fr 1fr" : "1fr",
              "@md": "1fr",
            }}
            columnGap={16}
            rowGap={24}
          >
            <GridItem>
              <PackagingTypeField />
            </GridItem>

            {shippingType === ShippingType.Quote ? (
              <GridItem>
                <TotalPackagesNumberField />
              </GridItem>
            ) : null}
          </Grid>
        }
      />

      <Spacer size={24} />

      {shippingType === ShippingType.Shipment ? (
        <>
          <StepInputGroup start={<PackageContentField />} end={<TotalPackagesNumberField />} />
          <Spacer size={24} />
        </>
      ) : null}

      {packaging.totalPackagesNumber > 1 ? (
        <>
          <Spacer size={{ "@initial": 16, "@md": 24 }} />
          <IdenticalPackagesField />
          <Spacer size={{ "@initial": 32, "@md": 40 }} />
        </>
      ) : null}

      {packaging.identicalPackages === IdenticalPackagesType.Identical ? (
        <>
          {Object.values(parcels).map((parcel) => (
            <StepInputGroup
              key={`identical-${parcel.packageId}`}
              start={
                <>
                  <FormInputGroup
                    id={`dimensions-input-group-${parcel.packageId}`}
                    label="Dimensions, in"
                    labelProps={{ hidden: true, required: shippingType === ShippingType.Shipment }}
                  >
                    <FormInputGroupItem>
                      <LengthField
                        packageId={parcel.packageId}
                        description="Length, in"
                        withTooltip
                        hasError={
                          !!errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message
                        }
                      />
                    </FormInputGroupItem>

                    <FormInputGroupItem>
                      <WidthField
                        packageId={parcel.packageId}
                        description="Width, in"
                        withTooltip
                        hasError={!!errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message}
                      />
                    </FormInputGroupItem>

                    <FormInputGroupItem>
                      <HeightField
                        packageId={parcel.packageId}
                        description="Height, in"
                        withTooltip
                        hasError={
                          !!errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message
                        }
                      />
                    </FormInputGroupItem>
                  </FormInputGroup>

                  {errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message ||
                  errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message ||
                  errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message ? (
                    <Box css={{ position: "absolute" }}>
                      <Flex>
                        <ErrorLabel>
                          {errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message ||
                            errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message ||
                            errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message}
                        </ErrorLabel>
                      </Flex>
                    </Box>
                  ) : null}
                </>
              }
              end={
                <Grid
                  columns={{
                    "@initial": "1fr",
                    "@md": shippingType === ShippingType.Quote ? "1fr" : "1fr 1fr",
                  }}
                  rows={{
                    "@initial": shippingType === ShippingType.Quote ? "1fr" : "1fr 1fr",
                    "@md": "1fr",
                  }}
                  columnGap={16}
                  rowGap={24}
                >
                  <GridItem>
                    <WeightField
                      packageId={parcel.packageId}
                      description="Weight per package, lb"
                      error={errors?.parcels?.[parcel.packageId]?.weight?.message}
                    />
                  </GridItem>

                  {shippingType === ShippingType.Shipment ? (
                    <GridItem>
                      <TotalPriceField
                        packageId={parcel.packageId}
                        description="Declared value, USD"
                        withTooltip
                        error={errors?.parcels?.[parcel.packageId]?.totalPrice?.message}
                      />
                    </GridItem>
                  ) : null}
                </Grid>
              }
            />
          ))}

          {packaging.totalPackagesNumber > 1 ? (
            <>
              <Spacer size={{ "@initial": 24, "@md": 40 }} />
              <Flex css={{ gap: "$24" }}>
                <Box>
                  <Copy color="theme-b-n3" fontWeight="bold">
                    {Object.values(parcels)
                      .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                      .toFixed(1)}
                  </Copy>
                  <Copy scale={10} color="theme-n6-n5">
                    Total weight
                  </Copy>
                </Box>

                {shippingType === ShippingType.Shipment ? (
                  <Box>
                    <Copy color="theme-b-n3" fontWeight="bold">
                      {Object.values(parcels)
                        .reduce((sum, i) => (sum += parseInt(i.totalPrice) * i.quantity), 0)
                        .toFixed(0)}
                    </Copy>
                    <Copy scale={10} color="theme-n6-n5">
                      Declared value
                    </Copy>
                  </Box>
                ) : null}
              </Flex>
              <Spacer size={16} />
              <Divider />
            </>
          ) : null}
        </>
      ) : (
        <>
          <Hidden above="md">
            <Stack space={16}>
              {Object.values(parcels).map((parcel) => {
                return (
                  <Box
                    key={parcel.packageId}
                    css={{
                      backgroundColor: "$theme-n2-n7",
                      padding: "$24 $12",
                      borderRadius: "$8",
                    }}
                  >
                    <Flex align="center" justify="between">
                      <Copy color="theme-b-n3" fontWeight="bold">
                        Parcel {parcel.packageId}
                      </Copy>
                      <RemovePackageButton packageId={parcel.packageId} />
                    </Flex>
                    <Divider />
                    <Spacer size={24} />
                    <Grid columns="1fr 1fr" columnGap={16}>
                      <GridItem>
                        <QuantityField packageId={parcel.packageId} description="Quantity" />
                      </GridItem>
                      <GridItem>
                        <WeightField
                          packageId={parcel.packageId}
                          description="Weight, lb"
                          hasError={!!errors?.parcels?.[parcel.packageId]?.weight?.message}
                        />
                      </GridItem>
                    </Grid>

                    {errors?.parcels?.[parcel.packageId]?.weight?.message ? (
                      <Box css={{ position: "absolute" }}>
                        <Flex>
                          <ErrorLabel>
                            {errors?.parcels?.[parcel.packageId]?.weight?.message}
                          </ErrorLabel>
                        </Flex>
                      </Box>
                    ) : null}

                    <Spacer size={24} />

                    <FormInputGroup
                      id={`dimensions-input-group-${parcel.packageId}`}
                      label="Dimensions, in"
                      labelProps={{
                        hidden: true,
                        required: shippingType === ShippingType.Shipment,
                      }}
                    >
                      <FormInputGroupItem>
                        <LengthField
                          packageId={parcel.packageId}
                          description="Length, in"
                          hasError={
                            !!errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message
                          }
                        />
                      </FormInputGroupItem>

                      <FormInputGroupItem>
                        <WidthField
                          packageId={parcel.packageId}
                          description="Width, in"
                          hasError={
                            !!errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message
                          }
                        />
                      </FormInputGroupItem>

                      <FormInputGroupItem>
                        <HeightField
                          packageId={parcel.packageId}
                          description="Height, in"
                          hasError={
                            !!errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message
                          }
                        />
                      </FormInputGroupItem>
                    </FormInputGroup>

                    {errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message ||
                    errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message ||
                    errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message ? (
                      <Box css={{ position: "absolute" }}>
                        <Flex>
                          <ErrorLabel>
                            {errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message ||
                              errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message ||
                              errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message}
                          </ErrorLabel>
                        </Flex>
                      </Box>
                    ) : null}

                    {shippingType === ShippingType.Shipment ? (
                      <>
                        <Spacer size={24} />
                        <TotalPriceField
                          packageId={parcel.packageId}
                          description="Declared value, USD"
                          error={errors?.parcels?.[parcel.packageId]?.totalPrice?.message}
                        />
                      </>
                    ) : null}
                  </Box>
                )
              })}
            </Stack>

            <Spacer size={24} />

            <Flex css={{ gap: "$24", paddingBottom: "$24", position: "relative" }}>
              <Box>
                <Copy color="theme-b-n3" fontWeight="bold">
                  {currentParcelsQuantity}
                </Copy>
                <Copy scale={10} color="theme-n6-n5">
                  Quantity
                </Copy>
              </Box>
              <Box>
                <Copy color="theme-b-n3" fontWeight="bold">
                  {Object.values(parcels)
                    .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                    .toFixed(1)}
                </Copy>
                <Copy scale={10} color="theme-n6-n5">
                  Total weight
                </Copy>
              </Box>
              {shippingType === ShippingType.Shipment ? (
                <Box>
                  <Copy color="theme-b-n3" fontWeight="bold">
                    {Object.values(parcels)
                      .reduce((sum, i) => (sum += parseInt(i.totalPrice) * i.quantity), 0)
                      .toFixed(0)}
                  </Copy>
                  <Copy scale={10} color="theme-n6-n5">
                    Declared value
                  </Copy>
                </Box>
              ) : null}

              {currentParcelsQuantity !== packaging.totalPackagesNumber ? (
                <Box css={{ position: "absolute", bottom: 0 }}>
                  <ErrorLabel id="error">
                    Total quantity not match the number of packages
                  </ErrorLabel>
                </Box>
              ) : null}
            </Flex>

            <Spacer size={8} />

            <AddPackageButton />
          </Hidden>

          <Hidden below="md">
            <Grid
              columns={12}
              columnGap={16}
              css={{
                padding: "$16",
                backgroundColor: "$theme-n2-n7",
              }}
            >
              <GridItem column={shippingType === ShippingType.Quote ? "1 / span 3" : "1 / span 2"}>
                <Copy color="theme-b-n3" fontWeight="semiBold">
                  Quantity
                  <Copy
                    as="span"
                    color="theme-b-n3"
                    fontWeight="semiBold"
                    css={{ paddingLeft: "$2" }}
                  >
                    *
                  </Copy>
                </Copy>
                <Copy scale={10} color="theme-n6-n5">
                  Max: {packaging.totalPackagesNumber}
                </Copy>
              </GridItem>

              <GridItem column={shippingType === ShippingType.Quote ? "4 / span 5" : "3 / span 4"}>
                <Copy color="theme-b-n3" fontWeight="semiBold">
                  Dimensions per package, in
                  {shippingType === ShippingType.Shipment ? (
                    <Copy
                      as="span"
                      color="theme-b-n3"
                      fontWeight="semiBold"
                      css={{ paddingLeft: "$2" }}
                    >
                      *
                    </Copy>
                  ) : null}
                </Copy>
                <Grid columns="1fr 1fr 1fr">
                  <GridItem>
                    <Copy scale={10} color="theme-n6-n5">
                      Length
                    </Copy>
                  </GridItem>
                  <GridItem>
                    <Copy scale={10} color="theme-n6-n5">
                      Height
                    </Copy>
                  </GridItem>
                  <GridItem>
                    <Copy scale={10} color="theme-n6-n5">
                      Width
                    </Copy>
                  </GridItem>
                </Grid>
              </GridItem>

              <GridItem column={shippingType === ShippingType.Quote ? "9 / span 4" : "7 / span 3"}>
                <Copy color="theme-b-n3" fontWeight="semiBold">
                  Weight per package, lb
                  <Copy
                    as="span"
                    color="theme-b-n3"
                    fontWeight="semiBold"
                    css={{ paddingLeft: "$2" }}
                  >
                    *
                  </Copy>
                </Copy>
                <Copy scale={10} color="theme-n6-n5">
                  Max: {PACKAGE_WEIGHT_MAX}
                </Copy>
              </GridItem>

              {shippingType === ShippingType.Shipment ? (
                <GridItem column="10 / span 3">
                  <Copy color="theme-b-n3" fontWeight="semiBold">
                    Declared value, USD
                  </Copy>
                  <Copy scale={10} color="theme-n6-n5">
                    Max: {PACKAGE_COST_MAX}
                  </Copy>
                </GridItem>
              ) : null}
            </Grid>

            {Object.values(parcels).map((parcel) => {
              return (
                <Grid
                  columns={12}
                  columnGap={16}
                  key={parcel.packageId}
                  css={{
                    paddingX: "$16",
                    borderBottom: "1px solid $theme-n4-n7",
                    position: "relative",
                    "& > div": { paddingY: "$12" },
                  }}
                >
                  <GridItem
                    column={shippingType === ShippingType.Quote ? "1 / span 3" : "1 / span 2"}
                  >
                    <QuantityField packageId={parcel.packageId} borderless />
                  </GridItem>

                  <GridItem
                    column={shippingType === ShippingType.Quote ? "4 / span 5" : "3 / span 4"}
                    css={{ position: "relative" }}
                  >
                    <Grid columns="1fr 1fr 1fr">
                      <GridItem>
                        <LengthField
                          packageId={parcel.packageId}
                          borderless
                          hasError={
                            !!errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message
                          }
                        />
                      </GridItem>
                      <GridItem>
                        <WidthField
                          packageId={parcel.packageId}
                          borderless
                          hasError={
                            !!errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message
                          }
                        />
                      </GridItem>
                      <GridItem>
                        <HeightField
                          packageId={parcel.packageId}
                          borderless
                          hasError={
                            !!errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message
                          }
                        />
                      </GridItem>
                    </Grid>

                    <ErrorLineWithMessage
                      errorId={`errors.parcels.${parcel.packageId}.dimensions`}
                      errorMessage={
                        errors?.parcels?.[parcel.packageId]?.dimensions?.length?.message ||
                        errors?.parcels?.[parcel.packageId]?.dimensions?.height?.message ||
                        errors?.parcels?.[parcel.packageId]?.dimensions?.width?.message
                      }
                    />
                  </GridItem>

                  <GridItem
                    column={shippingType === ShippingType.Quote ? "9 / span 4" : "7 / span 3"}
                    css={{ position: "relative" }}
                  >
                    <WeightField
                      packageId={parcel.packageId}
                      borderless
                      hasError={!!errors?.parcels?.[parcel.packageId]?.weight?.message}
                    />

                    <ErrorLineWithMessage
                      errorId={`errors.parcels.${parcel.packageId}.weight`}
                      errorMessage={errors?.parcels?.[parcel.packageId]?.weight?.message}
                    />
                  </GridItem>

                  {shippingType === ShippingType.Shipment ? (
                    <GridItem column="10 / span 3" css={{ position: "relative" }}>
                      <TotalPriceField
                        packageId={parcel.packageId}
                        borderless
                        hasError={!!errors?.parcels?.[parcel.packageId]?.totalPrice?.message}
                      />

                      <ErrorLineWithMessage
                        errorId={`errors.parcels.${parcel.packageId}.totalPrice`}
                        errorMessage={errors?.parcels?.[parcel.packageId]?.totalPrice?.message}
                      />
                    </GridItem>
                  ) : null}

                  <RemovePackageButton
                    packageId={parcel.packageId}
                    buttonCss={{
                      padding: 0,
                      position: "absolute",
                      right: "-$24",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </Grid>
              )
            })}

            <Box>
              <Grid
                columns={12}
                columnGap={16}
                css={{
                  padding: "$16",
                }}
              >
                <GridItem
                  column={shippingType === ShippingType.Quote ? "1 / span 3" : "1 / span 2"}
                >
                  <Copy color="theme-b-n3" fontWeight="bold">
                    {currentParcelsQuantity}
                  </Copy>
                </GridItem>

                <GridItem
                  column={shippingType === ShippingType.Quote ? "4 / span 5" : "3 / span 4"}
                />

                <GridItem
                  column={shippingType === ShippingType.Quote ? "9 / span 4" : "7 / span 3"}
                >
                  <Copy color="theme-b-n3" fontWeight="bold">
                    {Object.values(parcels)
                      .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                      .toFixed(1)}
                  </Copy>
                </GridItem>

                {shippingType === ShippingType.Shipment ? (
                  <GridItem column="10 / span 3">
                    <Copy color="theme-b-n3" fontWeight="bold">
                      {Object.values(parcels)
                        .reduce((sum, i) => (sum += parseInt(i.totalPrice) * i.quantity), 0)
                        .toFixed(0)}
                    </Copy>
                  </GridItem>
                ) : null}
              </Grid>

              {currentParcelsQuantity !== packaging.totalPackagesNumber ? (
                <Box css={{ position: "absolute" }}>
                  <ErrorLabel id="error">
                    Total quantity not match the number of packages
                  </ErrorLabel>
                </Box>
              ) : null}
            </Box>

            <Spacer size={24} />

            <AddPackageButton />
          </Hidden>
        </>
      )}

      <Spacer size={{ "@initial": 24, "@md": 32 }} />

      <StepActionsBar>
        <Button
          full
          disabled={
            !!errors.parcels ||
            currentParcelsQuantity !== packaging.totalPackagesNumber ||
            (shippingType === ShippingType.Shipment && !packaging.packageContent)
          }
          onClick={onContinueHandler}
        >
          Continue
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}

const PickupTypeField = () => {
  const { control, register } = useFormContext<ShipmentState>()

  return (
    <Controller
      name="packaging.pickupType"
      control={control}
      render={({ field }) => {
        return (
          <FormSelect
            {...register(field.name, {
              shouldUnregister: true,
            })}
            {...field}
            onValueChange={field.onChange}
            label="Pickup type"
            labelProps={{ hidden: true, required: true }}
            description="Pickup type"
            options={pickupTypeList}
          />
        )
      }}
    />
  )
}

const PackagingTypeField = () => {
  const { control, register, watch, trigger, setValue } = useFormContext<ShipmentState>()
  const { parcels } = watch()

  const handlePackagingTypeChange = (packagingType: string) => {
    const newParcels = Object.keys(parcels).reduce(
      (acc, packageId) => ({
        ...acc,
        [packageId]: {
          ...parcels[packageId],
          weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
          dimensions: {
            length: `${
              packagingType === PackagingType.Envelope ? ENVELOPE_LENGTH_DEFAULT : DIMENSION_DEFAULT
            }`,
            width: `${DIMENSION_DEFAULT}`,
            height: `${
              packagingType === PackagingType.Envelope ? ENVELOPE_HEIGHT_DEFAULT : DIMENSION_DEFAULT
            }`,
          },
        },
      }),
      {},
    )

    setValue("parcels", newParcels)
    trigger("parcels")
  }

  return (
    <Controller
      name="packaging.packagingType"
      control={control}
      render={({ field }) => {
        return (
          <FormSelect
            {...register(field.name, {
              shouldUnregister: true,
              onChange: (event) => handlePackagingTypeChange(event.target.value),
            })}
            {...field}
            onValueChange={field.onChange}
            label="Package type"
            labelProps={{ hidden: true, required: true }}
            description="Package type"
            options={packagingTypeList}
          />
        )
      }}
    />
  )
}

const PackageContentField = () => {
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<ShipmentState>()

  return (
    <Controller
      name="packaging.packageContent"
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            {...register(field.name, {
              shouldUnregister: true,
              required: {
                value: true,
                message: "Required field",
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabetic characters and spaces allowed",
              },
              maxLength: {
                value: 20,
                message: "Content max length exceeded",
              },
            })}
            {...field}
            onBlur={(event) => {
              field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
              trigger("packaging.packageContent")
            }}
            id="packaging.packageContent"
            label="Package contents"
            labelProps={{ hidden: true, required: true }}
            description="Package contents"
            type="text"
            autoComplete="new-password"
            error={errors?.packaging?.packageContent?.message}
          />
        )
      }}
    />
  )
}

const QuantityField = ({
  packageId,
  description,
  borderless,
}: {
  packageId: string
  description?: string
  borderless?: boolean
}) => {
  const { control, register, watch } = useFormContext<ShipmentState>()
  const { packaging } = watch()
  const packageQuantityList: number[] = useMemo(
    () => Array.from(new Array(packaging.totalPackagesNumber), (_, index) => index + 1),
    [packaging.totalPackagesNumber],
  )

  return (
    <Controller
      name={`parcels.${packageId}.quantity`}
      control={control}
      render={({ field }) => {
        return (
          <FormSelect
            {...register(field.name, {
              shouldUnregister: true,
            })}
            {...field}
            onValueChange={field.onChange}
            label="Quantity"
            labelProps={{ hidden: true, required: true }}
            description={description}
            borderless={borderless}
            options={packageQuantityList}
          />
        )
      }}
    />
  )
}

const LengthField = ({
  packageId,
  description,
  withTooltip,
  borderless,
  hasError,
}: {
  packageId: string
  description?: string
  withTooltip?: boolean
  borderless?: boolean
  hasError?: boolean
}) => {
  const { control, register, trigger } = useFormContext<ShipmentState>()
  const shippingType = useBoundStore((state) => state.shippingType)

  return (
    <Controller
      name={`parcels.${packageId}.dimensions.length`}
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            {...register(field.name, {
              shouldUnregister: true,
              required: {
                value: shippingType === ShippingType.Shipment,
                message: "Length field required",
              },
              min: {
                value: DIMENSION_MIN,
                message: "Length min value not met",
              },
              max: {
                value: DIMENSION_MAX,
                message: "Length max value exceeded",
              },
            })}
            {...field}
            onBlur={(event) => {
              field.onChange(
                event?.target?.value !== "" ? parseInt(event?.target?.value).toFixed(0) : "",
              )
              trigger(`parcels.${packageId}.dimensions.length`)
            }}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                event.key === "e" ||
                event.key === "-" ||
                event.key === "+" ||
                event.key === "." ||
                event.key === ","
              ) {
                event.preventDefault()
              }
            }}
            id={`parcels.${packageId}.dimensions.length`}
            label="Length, in"
            labelProps={{ hidden: true }}
            borderless={borderless}
            description={description}
            type="number"
            postLabel={withTooltip ? <PackageFieldTooltip /> : null}
            hasError={hasError}
          />
        )
      }}
    />
  )
}

const WidthField = ({
  packageId,
  description,
  withTooltip,
  borderless,
  hasError,
}: {
  packageId: string
  description?: string
  withTooltip?: boolean
  borderless?: boolean
  hasError?: boolean
}) => {
  const { control, register, trigger } = useFormContext<ShipmentState>()
  const shippingType = useBoundStore((state) => state.shippingType)

  return (
    <Controller
      name={`parcels.${packageId}.dimensions.width`}
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            {...register(field.name, {
              shouldUnregister: true,
              required: {
                value: shippingType === ShippingType.Shipment,
                message: "Width field required",
              },
              min: {
                value: DIMENSION_MIN,
                message: "Width min value not met",
              },
              max: {
                value: DIMENSION_MAX,
                message: "Width max value exceeded",
              },
            })}
            {...field}
            onBlur={(event) => {
              field.onChange(
                event?.target?.value !== "" ? parseInt(event?.target?.value).toFixed(0) : "",
              )
              trigger(`parcels.${packageId}.dimensions.width`)
            }}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                event.key === "e" ||
                event.key === "-" ||
                event.key === "+" ||
                event.key === "." ||
                event.key === ","
              ) {
                event.preventDefault()
              }
            }}
            id={`parcels.${packageId}.dimensions.width`}
            label="Width, in"
            labelProps={{ hidden: true }}
            borderless={borderless}
            description={description}
            type="number"
            postLabel={withTooltip ? <PackageFieldTooltip /> : null}
            hasError={hasError}
          />
        )
      }}
    />
  )
}

const HeightField = ({
  packageId,
  description,
  withTooltip,
  borderless,
  hasError,
}: {
  packageId: string
  description?: string
  withTooltip?: boolean
  borderless?: boolean
  hasError?: boolean
}) => {
  const { control, register, trigger } = useFormContext<ShipmentState>()
  const shippingType = useBoundStore((state) => state.shippingType)

  return (
    <Controller
      name={`parcels.${packageId}.dimensions.height`}
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            {...register(field.name, {
              shouldUnregister: true,
              required: {
                value: shippingType === ShippingType.Shipment,
                message: "Height field required",
              },
              min: {
                value: DIMENSION_MIN,
                message: "Height min value not met",
              },
              max: {
                value: DIMENSION_MAX,
                message: "Height max value exceeded",
              },
            })}
            {...field}
            onBlur={(event) => {
              field.onChange(
                event?.target?.value !== "" ? parseInt(event?.target?.value).toFixed(0) : "",
              )
              trigger(`parcels.${packageId}.dimensions.height`)
            }}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                event.key === "e" ||
                event.key === "-" ||
                event.key === "+" ||
                event.key === "." ||
                event.key === ","
              ) {
                event.preventDefault()
              }
            }}
            id={`parcels.${packageId}.dimensions.height`}
            label="Height, in"
            labelProps={{ hidden: true }}
            borderless={borderless}
            description={description}
            type="number"
            postLabel={withTooltip ? <PackageFieldTooltip /> : null}
            hasError={hasError}
          />
        )
      }}
    />
  )
}

const WeightField = ({
  packageId,
  description,
  borderless,
  hasError,
  error,
}: {
  packageId: string
  description?: string
  borderless?: boolean
  hasError?: boolean
  error?: string
}) => {
  const { control, register, trigger } = useFormContext<ShipmentState>()

  return (
    <Controller
      name={`parcels.${packageId}.weight`}
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            {...register(field.name, {
              shouldUnregister: true,
              required: {
                value: true,
                message: "Required field",
              },
              validate: {
                min: (v: string) =>
                  parseFloat(v) >= PACKAGE_WEIGHT_MIN || "Weight min value not met",
                max: (v: string) =>
                  parseFloat(v) <= PACKAGE_WEIGHT_MAX || "Weight max value exceeded",
              },
            })}
            {...field}
            onBlur={(event) => {
              field.onChange(
                event?.target?.value !== "" ? parseFloat(event?.target?.value).toFixed(1) : "",
              )
              trigger(`parcels.${packageId}.weight`)
            }}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                event.key === "e" ||
                event.key === "-" ||
                event.key === "+" ||
                event.key === ","
              ) {
                event.preventDefault()
              }
            }}
            id={`parcels.${packageId}.weight`}
            label="Weight per package, lb"
            description={description}
            labelProps={{ hidden: true, required: true }}
            borderless={borderless}
            type="number"
            hasError={hasError}
            error={error}
          />
        )
      }}
    />
  )
}

const TotalPriceField = ({
  packageId,
  description,
  withTooltip,
  borderless,
  hasError,
  error,
}: {
  packageId: string
  description?: string
  withTooltip?: boolean
  borderless?: boolean
  hasError?: boolean
  error?: string
}) => {
  const { control, register, trigger } = useFormContext<ShipmentState>()

  return (
    <Controller
      name={`parcels.${packageId}.totalPrice`}
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            {...register(field.name, {
              shouldUnregister: true,
              required: {
                value: true,
                message: "Required field",
              },
              validate: {
                min: (v: string) => parseInt(v) >= PACKAGE_COST_MIN || "Min value not met",
                max: (v: string) => parseInt(v) <= PACKAGE_COST_MAX || "Max value exceeded",
              },
            })}
            {...field}
            onBlur={(event) => {
              field.onChange(event?.target?.value !== "" ? parseInt(event?.target?.value) : "")
              trigger(`parcels.${packageId}.totalPrice`)
            }}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                event.key === "e" ||
                event.key === "-" ||
                event.key === "+" ||
                event.key === "." ||
                event.key === ","
              ) {
                event.preventDefault()
              }
            }}
            id={`parcels.${packageId}.totalPrice`}
            label="Declared value, USD"
            description={description}
            labelProps={{ hidden: true, required: true }}
            borderless={borderless}
            type="number"
            postLabel={withTooltip ? <PackageFieldTooltip /> : null}
            hasError={hasError}
            error={error}
          />
        )
      }}
    />
  )
}

const TotalPackagesNumberField = () => {
  const { setValue, watch, control, register, trigger } = useFormContext<ShipmentState>()
  const { packaging } = watch()

  const handleTotalPackagesNumberChange = (quantity: number) => {
    if (packaging.identicalPackages === IdenticalPackagesType.Identical) {
      const newParcels = {
        [PACKAGE_ID_DEFAULT]: {
          weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
          dimensions: {
            length: `${
              packaging.packagingType === PackagingType.Envelope
                ? ENVELOPE_LENGTH_DEFAULT
                : DIMENSION_DEFAULT
            }`,
            width: `${DIMENSION_DEFAULT}`,
            height: `${
              packaging.packagingType === PackagingType.Envelope
                ? ENVELOPE_HEIGHT_DEFAULT
                : DIMENSION_DEFAULT
            }`,
          },
          totalPrice: `${PACKAGE_COST_DEFAULT}`,
          totalCurrency: PACKAGE_CURRENCY_DEFAULT,
          packageId: PACKAGE_ID_DEFAULT,
          packageType: PackageType.Custom,
          quantity,
        },
      }

      setValue("parcels", newParcels)
    } else {
      const newParcels = Array.from(new Array(quantity), (_, index) => index + 1).reduce(
        (acc, packageId) => ({
          ...acc,
          [packageId]: {
            weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
            dimensions: {
              length: `${
                packaging.packagingType === PackagingType.Envelope
                  ? ENVELOPE_LENGTH_DEFAULT
                  : DIMENSION_DEFAULT
              }`,
              width: `${DIMENSION_DEFAULT}`,
              height: `${
                packaging.packagingType === PackagingType.Envelope
                  ? ENVELOPE_HEIGHT_DEFAULT
                  : DIMENSION_DEFAULT
              }`,
            },
            totalPrice: `${PACKAGE_COST_DEFAULT}`,
            totalCurrency: PACKAGE_CURRENCY_DEFAULT,
            packageId,
            packageType: PackageType.Custom,
            quantity: PACKAGE_QUANTITY_DEFAULT,
          },
        }),
        {},
      )

      setValue("parcels", newParcels)
    }

    if (quantity === TOTAL_PACKAGES_NUMBER_DEFAULT) {
      setValue("packaging.identicalPackages", IdenticalPackagesType.Identical)
    }

    trigger("parcels")
  }

  return (
    <Controller
      name="packaging.totalPackagesNumber"
      control={control}
      render={({ field }) => {
        return (
          <FormSelect
            {...register(field.name, {
              shouldUnregister: true,
              onChange: (event) => handleTotalPackagesNumberChange(event.target.value),
            })}
            {...field}
            onValueChange={field.onChange}
            label="Number of packages"
            labelProps={{ hidden: true, required: true }}
            description="Number of packages"
            options={packagesAmountList}
          />
        )
      }}
    />
  )
}

const IdenticalPackagesField = () => {
  const { setValue, watch, control, register, trigger } = useFormContext<ShipmentState>()
  const { packaging } = watch()

  const handleIdenticalChange = (value: string) => {
    if (value === IdenticalPackagesType.Identical) {
      const newParcels = {
        [PACKAGE_ID_DEFAULT]: {
          weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
          dimensions: {
            length: `${
              packaging.packagingType === PackagingType.Envelope
                ? ENVELOPE_LENGTH_DEFAULT
                : DIMENSION_DEFAULT
            }`,
            width: `${DIMENSION_DEFAULT}`,
            height: `${
              packaging.packagingType === PackagingType.Envelope
                ? ENVELOPE_HEIGHT_DEFAULT
                : DIMENSION_DEFAULT
            }`,
          },
          totalPrice: `${PACKAGE_COST_DEFAULT}`,
          totalCurrency: PACKAGE_CURRENCY_DEFAULT,
          packageId: PACKAGE_ID_DEFAULT,
          packageType: PackageType.Custom,
          quantity: packaging.totalPackagesNumber,
        },
      }

      setValue("parcels", newParcels)
    } else {
      const newParcels = Array.from(
        new Array(packaging.totalPackagesNumber),
        (_, index) => index + 1,
      ).reduce(
        (acc, packageId) => ({
          ...acc,
          [packageId]: {
            weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
            dimensions: {
              length: `${
                packaging.packagingType === PackagingType.Envelope
                  ? ENVELOPE_LENGTH_DEFAULT
                  : DIMENSION_DEFAULT
              }`,
              width: `${DIMENSION_DEFAULT}`,
              height: `${
                packaging.packagingType === PackagingType.Envelope
                  ? ENVELOPE_HEIGHT_DEFAULT
                  : DIMENSION_DEFAULT
              }`,
            },
            totalPrice: `${PACKAGE_COST_DEFAULT}`,
            totalCurrency: PACKAGE_CURRENCY_DEFAULT,
            packageId,
            packageType: PackageType.Custom,
            quantity: PACKAGE_QUANTITY_DEFAULT,
          },
        }),
        {},
      )

      setValue("parcels", newParcels)
    }

    trigger("parcels")
  }

  return (
    <Flex align="center" justify="start" css={{ gap: "$24", "@md": { gap: "$32" } }}>
      <Copy scale={5} color="theme-b-n3">
        Are packages identical?
      </Copy>
      <Controller
        name="packaging.identicalPackages"
        control={control}
        render={({ field }) => {
          return (
            <FormRadioGroup
              {...register(field.name, {
                shouldUnregister: true,
                onChange: (event) => handleIdenticalChange(event.target.value),
              })}
              {...field}
              id={field.name}
              horizontal
            >
              <FormRadioInput
                key={IdenticalPackagesType.Identical}
                label="Yes"
                value={IdenticalPackagesType.Identical}
              />
              <FormRadioInput
                key={IdenticalPackagesType.Different}
                label="No"
                value={IdenticalPackagesType.Different}
              />
            </FormRadioGroup>
          )
        }}
      />
    </Flex>
  )
}

const ErrorLineWithMessage = ({
  errorId,
  errorMessage,
}: {
  errorId: string
  errorMessage?: string
}) => {
  return (
    <Box
      css={{
        position: "absolute",
        bottom: 0,
        height: "$2",
        width: "100%",
        backgroundColor: errorMessage ? "$special-error" : "inherit",
      }}
    >
      {errorMessage ? <ErrorLabel id={errorId}>{errorMessage}</ErrorLabel> : null}
    </Box>
  )
}

const AddPackageButton = () => {
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { parcels, packaging } = watch()

  const onAddPackageClick = () => {
    const nextParcelId = `${Object.keys(parcels).length + 1}`
    const newParcels = {
      ...parcels,
      [nextParcelId]: {
        weight: PACKAGE_WEIGHT_DEFAULT.toFixed(1),
        dimensions: {
          length: `${
            packaging.packagingType === PackagingType.Envelope
              ? ENVELOPE_LENGTH_DEFAULT
              : DIMENSION_DEFAULT
          }`,
          width: `${DIMENSION_DEFAULT}`,
          height: `${
            packaging.packagingType === PackagingType.Envelope
              ? ENVELOPE_HEIGHT_DEFAULT
              : DIMENSION_DEFAULT
          }`,
        },
        totalPrice: `${PACKAGE_COST_DEFAULT}`,
        totalCurrency: PACKAGE_CURRENCY_DEFAULT,
        packageId: nextParcelId,
        packageType: PackageType.Custom,
        quantity: PACKAGE_QUANTITY_DEFAULT,
      },
    }

    setValue("parcels", newParcels)
  }

  return (
    <Button action="text" type="button" onClick={onAddPackageClick} icon={<IconPlus />}>
      Add a package
    </Button>
  )
}

const RemovePackageButton = ({ packageId, buttonCss }: { packageId: string; buttonCss?: CSS }) => {
  const { setValue, watch, trigger } = useFormContext<ShipmentState>()
  const { packaging, parcels } = watch()

  const onDeletePackageClick = (parcelId: string) => {
    const filteredParcels = { ...parcels }
    delete filteredParcels[parcelId]
    const filteredParcelsLength = Object.keys(filteredParcels).length

    const newParcels = Object.entries(filteredParcels).reduce((acc, [id, parcel], index) => {
      if (id === `${index + 1}`) {
        return {
          ...acc,
          [id]: {
            ...parcel,
            quantity: filteredParcelsLength === 1 ? packaging.totalPackagesNumber : parcel.quantity,
          },
        }
      }

      return {
        ...acc,
        [`${index + 1}`]: {
          ...parcel,
          packageId: `${index + 1}`,
          quantity: filteredParcelsLength === 1 ? packaging.totalPackagesNumber : parcel.quantity,
        },
      }
    }, {})

    setValue(
      "packaging.identicalPackages",
      filteredParcelsLength === 1
        ? IdenticalPackagesType.Identical
        : IdenticalPackagesType.Different,
    )
    setValue("parcels", newParcels)
    trigger("parcels")
  }

  return (
    <ButtonIcon
      type="button"
      ariaLabel={`Remove parcel ${packageId}`}
      icon={<IconBin />}
      onClick={() => onDeletePackageClick(packageId)}
      inputIcon
      css={{ ...buttonCss }}
    />
  )
}

const PackageFieldTooltip = () => {
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)

  return (
    <IconTooltip
      tooltip={<Copy scale={10}>Per package</Copy>}
      ariaLabel="Per package tooltip"
      withTitle={false}
      contentWidth="max-content"
      trigger={["hover", "focus"]}
      placement={isMediumAndAbove ? "top" : "left"}
      delayShow={150}
      delayHide={150}
      contentCss={{
        padding: "$12",
      }}
      triggerCss={{
        height: "$20",
      }}
      icon={<IconWarning fixedSize width={20} height={20} />}
    />
  )
}
