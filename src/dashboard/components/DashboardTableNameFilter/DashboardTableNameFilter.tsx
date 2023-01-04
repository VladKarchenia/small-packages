import { useCallback, useEffect, useRef, useState } from "react"
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
import { SStatusFilterButton } from "./DashboardTableNameFilter.styles"
import debounce from "just-debounce-it"
import { getShipmentsFieldValuesFn } from "@/api/shipmentApi"
import { useQuery } from "react-query"

export const DashboardTableNameFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { recipientName } = useDashboardStateContext()
  const { setRecipientNameFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)

  const [results, setResults] = useState<string[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["searchRecipientNames"],
    () =>
      getShipmentsFieldValuesFn({
        // field: `data.CONSIGNEE_CONTACT${inputValue ? `:${inputValue}` : ""}`,
        field: `data.CONSIGNEE_CONTACT`,
        status: "SHIPMENT",
        organizationId: user?.activeOrganizationId,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        setResults(data.content)
      },
    },
  )

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch()
    }, 800),
    [],
  )

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = recipientName.filter((name) => name !== event.currentTarget.value)
      return setRecipientNameFilter(newArray)
    }

    const newArray = [...recipientName, event.currentTarget.value as string]
    return setRecipientNameFilter(newArray)
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("recipientName")
    }

    return setRecipientNameFilter(results)
  }

  const Content = () => {
    if (isLoading || isFetching) {
      return <Box css={{ padding: "$12 $16" }}>LOADING</Box>
    }

    if (!isLoading && !isFetching && results.length === 0) {
      return <Box css={{ padding: "$12 $16" }}>EMPTY BOX</Box>
    }

    return (
      <>
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
        {results.map((item) => (
          <Box
            key={item}
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
              value={item}
              onChange={handleChange}
              name={item}
              id={item}
              label={item}
              checked={recipientName.includes(item)}
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
      </>
    )
  }

  useEffect(() => {
    if (recipientName.length === results.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [recipientName, results])

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
        <SStatusFilterButton
          ref={triggerRef}
          onClick={() => {
            if (!isOpen) {
              setResults([])
              setIsOpen(true)

              if (inputValue === "" || inputValue.length > 3) {
                refetch()
              }
            }
          }}
          onFocus={() => {
            if (!isOpen) {
              setResults([])
              setIsOpen(true)

              if (inputValue === "" || inputValue.length > 3) {
                refetch()
              }
            }
          }}
        >
          <Copy as="span" scale={8} color="neutrals-8" bold>
            Recipient name
          </Copy>
          <Spacer size={16} horizontal />
          <IconChevronDown fixedSize width={20} height={20} />
        </SStatusFilterButton>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{ width: "360px", padding: "$0", border: "none", borderRadius: "$8" }}
        alignOffset={-1}
        onInteractOutside={(e: any) => {
          // if (isClearButtonClick: any) {
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
        onOpenAutoFocus={(e: any) => {
          e.preventDefault()
        }}
      >
        <Box css={{ padding: "$12 $16" }}>
          <FormInput
            value={inputValue}
            label="Search for recipient's name"
            labelProps={{ hidden: true }}
            placeholder="Search for recipient's name"
            onChange={(e: any) => {
              setInputValue(e.target.value)
              setResults([])

              if (e.target.value === "" || e.target.value.length > 3) {
                debouncedRefetch()
              }
            }}
            suffix={<IconSearch height={20} width={20} fixedSize />}
          />
        </Box>

        <Content />
      </PopoverContent>
    </Popover>
  )
}
