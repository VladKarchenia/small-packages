import { useEffect, useRef, useState } from "react"
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
import { IAddress } from "@/shared/state"
import { SStatusFilterButton } from "./DashboardTableOriginAddressFilter.styles"

const addressesMockList: IAddress[] = [
  {
    location: "USA, New York",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
  },
  {
    location: "USA, 101 AMSTERDAM AVE STATEN ISLAND ROCKET ANTA",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
  },
  {
    location: "USA, 75 PARK PLACE 8TH FLOOR NEW YORK CITY",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
  },
  {
    location: "USA, 620 12TH AVENUE, NEW YORK NY 100 STREET PARK",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
  },
  {
    location: "USA, 201 AVE STATEN AMSTERDAM ISLAND ROCKET ANTA",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
  },
  {
    location: "USA, 775 9TH SUPER PLACE 8TH FLOOR NEW YORK CITY",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
  },
]

export const DashboardTableOriginAddressFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { originalAddress } = useDashboardStateContext()
  const { setOriginalAddressFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = originalAddress.filter(
        (address) => address.location !== event.currentTarget.value,
      )
      return setOriginalAddressFilter(newArray)
    }

    const newAddress = addressesMockList.find(
      (address) => address.location === event.currentTarget.value,
    )
    if (newAddress) {
      const newArray = [...originalAddress, newAddress]

      return setOriginalAddressFilter(newArray)
    }
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("originalAddress")
    }

    return setOriginalAddressFilter(addressesMockList)
  }

  useEffect(() => {
    if (originalAddress.length === addressesMockList.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [originalAddress])

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
        <SStatusFilterButton
          ref={triggerRef}
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
          if (isTriggerClick(e)) {
            return
          }
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
            key={item.location}
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
              value={item.location}
              onChange={handleChange}
              name={item.location}
              id={item.location}
              label={item.location}
              checked={originalAddress.some((address) => address.location === item.location)}
            />
          </Box>
        ))}
        {/* TODO: Add logic to fix the Show more button */}
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
