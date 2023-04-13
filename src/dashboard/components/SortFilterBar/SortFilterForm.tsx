import { useBoundStore } from "@/store"
import {
  ShipmentsPagedOrderBy,
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { ShippingType } from "@/shared/types"

import {
  Grid,
  Flex,
  Spacer,
  Stack,
  SearchFilterDrawer,
  GridItem,
  Button,
  useDrawerActions,
  FormSelect,
} from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"
import { SearchFilterDrawerForm } from "@/dashboard/components"

const sortingShipmentList: ShipmentsPagedOrderBy[] = Object.values(ShipmentsPagedOrderBy)

export const SortFiltertForm = () => {
  const tab = useBoundStore((state) => state.tab)
  const { sortOrder, status } = useDashboardStateContext()
  const { setSortOrder, setSortDirection, resetFilterField } = useDashboardActionContext()
  const { close } = useDrawerActions()

  const handleResetClick = () => {
    setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
    setSortDirection(SortDirection.ASC)
    resetFilterField("status")
    resetFilterField("recipientName")
    resetFilterField("originalAddress")
    resetFilterField("destinationAddress")
    close("sortFilterBar")
  }

  return (
    // ($48 + $12) - Drawer's header height
    <Grid rows={`calc((var(--vh) * 100) - $80 - ($48 + $12)) $80`} css={{ height: "100%" }}>
      <Flex direction="column" css={{ padding: "$16", overflow: "auto" }}>
        <FormSelect
          name="sortBy"
          label="Sort by"
          labelProps={{ hidden: true }}
          description="Sort by"
          value={sortOrder}
          onValueChange={(value) => {
            if (
              value === ShipmentsPagedOrderBy.CreationDateAsc ||
              value === ShipmentsPagedOrderBy.IdAsc ||
              value === ShipmentsPagedOrderBy.SenderNameAsc ||
              value === ShipmentsPagedOrderBy.RecipientNameAsc ||
              value === ShipmentsPagedOrderBy.StatusAsc
            ) {
              setSortDirection(SortDirection.ASC)
            } else {
              setSortDirection(SortDirection.DESC)
            }

            setSortOrder(value as ShipmentsPagedOrderBy)
          }}
          options={sortingShipmentList.filter((sortType) =>
            tab === ShippingType.Quote
              ? sortType !== ShipmentsPagedOrderBy.SenderNameAsc &&
                sortType !== ShipmentsPagedOrderBy.SenderNameDesc &&
                sortType !== ShipmentsPagedOrderBy.RecipientNameAsc &&
                sortType !== ShipmentsPagedOrderBy.RecipientNameDesc
              : true,
          )}
        />
        <Spacer size={20} />
        <Stack space={16}>
          {tab === ShippingType.Shipment ? (
            <SearchFilterDrawer
              drawerName="statusDrawer"
              drawerTitle="Status"
              value={status.join(", ")}
              description="Status"
              placeholder="Status"
              hidePlaceholder
              closeIcon={<IconChevronLeft />}
              drawerForm={<SearchFilterDrawerForm comboboxType="status" />}
            />
          ) : null}

          {tab === ShippingType.Shipment ? (
            <SearchFilterDrawer
              drawerName="nameDrawer"
              drawerTitle="Recipient's name"
              value=""
              description="Recipient's name"
              placeholder="Recipient's name"
              closeIcon={<IconChevronLeft />}
              drawerForm={<SearchFilterDrawerForm comboboxType="recipientName" />}
            />
          ) : null}

          {tab === ShippingType.Quote ? (
            <SearchFilterDrawer
              drawerName="originalAddressDrawer"
              drawerTitle="Origin address"
              value=""
              description="Origin address"
              placeholder="Origin address"
              closeIcon={<IconChevronLeft />}
              drawerForm={<SearchFilterDrawerForm comboboxType="originalAddress" />}
            />
          ) : null}

          <SearchFilterDrawer
            drawerName="destinationAddressDrawer"
            drawerTitle="Destination address"
            value=""
            description="Destination address"
            placeholder="Destination address"
            closeIcon={<IconChevronLeft />}
            drawerForm={<SearchFilterDrawerForm comboboxType="destinationAddress" />}
          />
        </Stack>
      </Flex>
      <Grid
        gap={{ "@initial": 8, "@sm": 16 }}
        columns="1fr 1fr"
        css={{ paddingX: "$16", paddingTop: "$16", backgroundColor: "$theme-w-n11" }}
      >
        <GridItem>
          <Button full onClick={handleResetClick}>
            Reset
          </Button>
        </GridItem>
        <GridItem>
          <Button action="secondary" full onClick={() => close("sortFilterBar")}>
            Apply
          </Button>
        </GridItem>
      </Grid>
    </Grid>
  )
}
