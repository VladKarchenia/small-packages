import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Flex,
  FlexItem,
  FormInput,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"
import { useClearButton } from "@/shared/hooks"
import { DestinationCombobox } from "@/shipment"
import { SComboboxClearButton } from "./GlobalSearch.styles"

export const GlobalSearch = () => {
  const { t } = useTranslation()
  const { clearRef, isClearButtonClick } = useClearButton()
  const { clearRef: triggerRef, isClearButtonClick: isTriggerClick } = useClearButton()
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")

  const closePopover = () => {
    setIsOpen(false)
  }

  // useEffect(() => {
  //   // Close on route change
  //   events.on("routeChangeStart", closePopover)

  //   return () => {
  //     events.off("routeChangeStart", closePopover)
  //   }
  // }, [events])

  // useEffect(() => {
  //   if (!destination) setLocalDestination("")
  //   if (destination) {
  //     setLocalDestination(destination)
  //   }
  // }, [destination])

  const handleClearButton = () => {
    setSearchValue("")
    // onChange({ location: "", placeId: "" })
    if (triggerRef.current) {
      ;(triggerRef.current as HTMLInputElement).focus()
    }
  }

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild={true}>
        <Flex align="center" css={{ position: "relative" }}>
          <FormInput
            ref={triggerRef}
            value={searchValue}
            label="Search"
            labelProps={{ hidden: true }}
            placeholder="Search for quotes and shipments by ID, address..."
            onClick={() => {
              if (!isOpen && searchValue.length > 3) {
                return setIsOpen(true)
              }
            }}
            onFocus={() => {
              if (!isOpen && searchValue.length > 3) {
                return setIsOpen(true)
              }
            }}
            onChange={(e: any) => {
              setSearchValue(e.target.value)

              if (!isOpen && e.target.value.length > 3) {
                setIsOpen(true)
              }
            }}
            prefix={<IconSearch height={20} width={20} fixedSize />}
            css={{ width: "410px", height: "$40", minHeight: "$40", paddingRight: "$56" }}
          />
          {searchValue?.length > 0 && (
            <SComboboxClearButton
              ref={clearRef}
              type="button"
              aria-label={t("filters.clearDestination")}
              css={{ position: "absolute", right: "$12", zIndex: "$1" }}
              onClick={handleClearButton}
            >
              <IconCross size="xs" />
            </SComboboxClearButton>
          )}
        </Flex>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{ width: "438px", padding: "$20", border: "none", borderRadius: "$8" }}
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
        <Flex>
          <DestinationCombobox
            isDesktop
            initialValue={searchValue}
            onSelect={(label, placeId) => {
              setSearchValue(label)
              // onChange({ location: label, placeId })
              setIsOpen(false)
            }}
          />
        </Flex>
      </PopoverContent>
    </Popover>
  )
}
