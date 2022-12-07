import { useEffect, useState } from "react"
import {
  Box,
  Copy,
  Divider,
  Flex,
  FormCheckbox,
  FormInput,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spacer,
} from "@/shared/components"
import { IconChevronDown, IconSearch } from "@/shared/icons"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { SStatusFilterButton } from "./DashboardTableOriginAddressFilter.styles"

const addressesMockList = [
  "101 AMSTERDAM AVE STATEN ISLAND ROCKET ANTA",
  "75 PARK PLACE 8TH FLOOR NEW YORK CITY",
  "620 12TH AVENUE, NEW YORK NY 100 STREET PARK",
  "201 AVE STATEN AMSTERDAM ISLAND ROCKET ANTA",
  "775 9TH SUPER PLACE 8TH FLOOR NEW YORK CITY",
]

export const DashboardTableOriginAddressFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { originalAddress } = useDashboardStateContext()
  const { setOriginalAddressFilter } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    // if (!event.currentTarget.checked && Array.isArray(status)) {
    //   const newArray = status.filter((status) => status !== event.currentTarget.value)
    //   return setStatusFilter(newArray)
    // }
    // if (Array.isArray(status)) {
    //   const newArray = [...status, event.currentTarget.value as ShipmentStatus]
    //   return setStatusFilter(newArray)
    // }
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    // if (!event.currentTarget.checked && Array.isArray(status)) {
    //   return setStatusFilter([])
    // }
    // if (Array.isArray(status)) {
    //   return setStatusFilter(shipmentStatusesList)
    // }
  }

  useEffect(() => {
    // if (status && status?.length === 8) {
    //   setIsCheckAll(true)
    // } else {
    //   setIsCheckAll(false)
    // }
  }, [originalAddress])

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
        <SStatusFilterButton
          // ref={inputRef}
          onClick={() => {
            if (!isOpen) {
              return setIsOpen(true)
            }
          }}
          onFocus={() => {
            if (!isOpen) {
              return setIsOpen(true)
            }
          }}
        >
          <Copy as="span" scale={8} color="neutrals-8" bold>
            Origin address
          </Copy>
          <Spacer size={16} horizontal />
          <IconChevronDown fixedSize width={20} height={20} />
        </SStatusFilterButton>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{ width: "360px", padding: "$0", border: "none", borderRadius: "$8" }}
        alignOffset={-1}
        onInteractOutside={(e) => {
          // if (isClearButtonClick(e)) {
          //   if (e.detail.originalEvent.isTrusted) {
          //     handleClearButton()
          //   }
          //   return
          // }
          // if (isInputClick(e)) {
          //   return
          // }
          return setIsOpen(false)
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <Box css={{ padding: "$12 $16" }}>
          <FormInput
            value={searchValue}
            label="Search for address"
            labelProps={{ hidden: true }}
            placeholder="Search for address"
            onChange={(e: any) => {
              setSearchValue(e.target.value)
            }}
            suffix={<IconSearch height={20} width={20} fixedSize />}
          />
        </Box>
        <Box
          css={{
            "> label": {
              padding: "$12 $16",
              cursor: "pointer",
              hover: {
                backgroundColor: "$neutrals-3",
              },
            },
          }}
        >
          <FormCheckbox
            value={"All"}
            onChange={handleCheckAllClick}
            name={"Select all"}
            id={"Select all"}
            label={"Select all"}
            checked={isCheckAll}
          />
        </Box>
        <Divider />
        {addressesMockList.map((item) => (
          <Box
            key={item}
            css={{
              "> label": {
                padding: "$12 $16",
                cursor: "pointer",
                hover: {
                  backgroundColor: "$neutrals-3",
                },

                "> p": {
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                },
              },
            }}
          >
            <FormCheckbox
              value={item}
              onChange={handleChange}
              name={item}
              id={item}
              label={item}
              checked={status?.includes(item)}
            />
          </Box>
        ))}
        <Box css={{ padding: "$12 $16" }}>
          <Copy
            scale={8}
            color="system-black"
            bold
            css={{ cursor: "pointer" }}
            onClick={() => console.log("show more")}
          >
            Show more
          </Copy>
        </Box>
        <Divider />
        <Flex align="center" justify="end" css={{ padding: "$12 $16" }}>
          <Copy scale={9}>10 of 55</Copy>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}
