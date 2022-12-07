import {
  Grid,
  Flex,
  Spacer,
  Stack,
  Select,
  SelectItem,
  SearchFilterDrawer,
  SearchFilterDrawerForm,
  FormCheckbox,
  GridItem,
  Button,
  Copy,
  useDrawerActions,
} from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"
import {
  ShipmentsPagedOrderBy,
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { ShipmentStatus } from "@/shared/types"
import { IAddress } from "@/shared/state"
import { ShippingType } from "@/shipment"

export interface ISortFiltertFormProps {
  shippingType: ShippingType
}

const shipmentStatusesList: ShipmentStatus[] = Object.values(ShipmentStatus)
const sortingShipmentList: ShipmentsPagedOrderBy[] = Object.values(ShipmentsPagedOrderBy)

export const SortFiltertForm: React.FC<ISortFiltertFormProps> = ({ shippingType }) => {
  const { sortOrder, status, recipientName, originalAddress, destinationAddress } =
    useDashboardStateContext()
  const {
    setSortOrder,
    setSortDirection,
    setStatusFilter,
    setRecipientNameFilter,
    setOriginalAddressFilter,
    setDestinationAddressFilter,
  } = useDashboardActionContext()
  const { close } = useDrawerActions()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked && Array.isArray(status)) {
      const newArray = status.filter((status) => status !== event.currentTarget.value)
      setStatusFilter(newArray)

      return
    }
    if (Array.isArray(status)) {
      const newArray = [...status, event.currentTarget.value as ShipmentStatus]
      setStatusFilter(newArray)
    }
  }

  const handleResetClick = () => {
    setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
    setSortDirection(SortDirection.ASC)
    setStatusFilter([])
    setRecipientNameFilter("")
    setOriginalAddressFilter({
      location: "USA, New York",
      country: "",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
    })
    setDestinationAddressFilter({
      location: "USA, New York",
      country: "",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      isResidential: false,
    })

    close("sortFilterBar")
  }

  return (
    // 60px here is Drawer's header height
    <Grid rows={`calc((var(--vh) * 100) - $80 - 60px) $80`} css={{ height: "100%" }}>
      <Flex direction="column" css={{ padding: "$16", overflow: "auto" }}>
        <Select
          name="sortBy"
          label="Sort by"
          labelProps={{ hidden: true }}
          description="Sort by"
          value={sortOrder}
          onValueChange={(val: ShipmentsPagedOrderBy) => {
            if (
              val === ShipmentsPagedOrderBy.CreationDateAsc ||
              val === ShipmentsPagedOrderBy.IdAsc ||
              val === ShipmentsPagedOrderBy.RecipientNameAsc
            ) {
              setSortDirection(SortDirection.ASC)
            } else {
              setSortDirection(SortDirection.DESC)
            }

            setSortOrder(val)
          }}
        >
          {sortingShipmentList
            .filter((sortType) =>
              shippingType === ShippingType.Quote
                ? sortType !== ShipmentsPagedOrderBy.RecipientNameAsc &&
                  sortType !== ShipmentsPagedOrderBy.RecipientNameDesc
                : true,
            )
            .map((sortType) => (
              <SelectItem key={sortType} value={sortType}>
                {sortType}
              </SelectItem>
            ))}
        </Select>
        <Spacer size={20} />
        <Stack space={16}>
          {shippingType === ShippingType.Shipment ? (
            <SearchFilterDrawer
              drawerName="statusDrawer"
              drawerTitle="Status"
              value={status?.join(", ")}
              description="Status"
              placeholder="Status"
              hidePlaceholder
              closeIcon={<IconChevronLeft />}
              drawerForm={
                <Grid rows="1fr $80" css={{ height: "100%" }}>
                  <Flex direction="column" css={{ padding: "$16" }}>
                    <Stack space={12}>
                      {shipmentStatusesList.map((item) => (
                        <FormCheckbox
                          key={item}
                          value={item}
                          onChange={handleChange}
                          name={item}
                          id={item}
                          label={item}
                          checked={status?.includes(item)}
                        />
                      ))}
                    </Stack>
                  </Flex>
                  <Grid
                    gap={{ "@initial": 8, "@sm": 16 }}
                    columns={"1fr 1fr"}
                    css={{ paddingX: "$16", paddingTop: "$16", backgroundColor: "$system-white" }}
                  >
                    <GridItem>
                      <Button full onClick={() => setStatusFilter([])}>
                        <Copy as="span" scale={8} color="system-white" bold>
                          Reset
                        </Copy>
                      </Button>
                    </GridItem>
                    <GridItem>
                      <Button action="secondary" full onClick={() => close("statusDrawer")}>
                        <Copy as="span" scale={8} color="system-black" bold>
                          Apply
                        </Copy>
                      </Button>
                    </GridItem>
                  </Grid>
                </Grid>
              }
            />
          ) : null}

          {shippingType === ShippingType.Shipment ? (
            <SearchFilterDrawer
              drawerName="nameDrawer"
              drawerTitle="Recipient's name"
              value={""}
              description="Recipient's name"
              placeholder="Recipient's name"
              closeIcon={<IconChevronLeft />}
              drawerForm={
                <SearchFilterDrawerForm
                  initialValue={recipientName || ""}
                  onSelect={(name: string) => setRecipientNameFilter(name)}
                  comboboxType="string"
                  placeholder="Recipient's name"
                />
              }
            />
          ) : null}

          {shippingType === ShippingType.Quote ? (
            <SearchFilterDrawer
              drawerName="originalAddressDrawer"
              drawerTitle="Original address"
              value={""}
              description="Original address"
              placeholder="Original address"
              closeIcon={<IconChevronLeft />}
              drawerForm={
                <SearchFilterDrawerForm
                  initialValue={originalAddress?.location || ""}
                  onSelect={(address: IAddress) => setOriginalAddressFilter(address)}
                  comboboxType="address"
                  placeholder="Original address"
                />
              }
            />
          ) : null}

          <SearchFilterDrawer
            drawerName="destinationAddressDrawer"
            drawerTitle="Destination address"
            value={""}
            description="Destination address"
            placeholder="Destination address"
            closeIcon={<IconChevronLeft />}
            drawerForm={
              <SearchFilterDrawerForm
                initialValue={destinationAddress?.location || ""}
                onSelect={(address: IAddress) => setDestinationAddressFilter(address)}
                comboboxType="address"
                placeholder="Destination address"
              />
            }
          />
        </Stack>
      </Flex>
      <Grid
        gap={{ "@initial": 8, "@sm": 16 }}
        columns={"1fr 1fr"}
        css={{ paddingX: "$16", paddingTop: "$16", backgroundColor: "$system-white" }}
      >
        <GridItem>
          <Button full onClick={handleResetClick}>
            <Copy as="span" scale={8} color="system-white" bold>
              Reset
            </Copy>
          </Button>
        </GridItem>
        <GridItem>
          <Button action="secondary" full onClick={() => close("sortFilterBar")}>
            <Copy as="span" scale={8} color="system-black" bold>
              Apply
            </Copy>
          </Button>
        </GridItem>
      </Grid>
    </Grid>
  )
}
