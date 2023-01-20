import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import debounce from "just-debounce-it"

import { getShipmentsFieldValuesFn } from "@/api/shipmentApi"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"

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
import { IllustrationSpinner } from "@/shared/illustrations"

import { SStatusFilterButton } from "./DashboardTableNameFilter.styles"

export const DashboardTableNameFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { recipientName } = useDashboardStateContext()
  const { setRecipientNameFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)

  const [results, setResults] = useState<string[]>([])
  const [notFound, setNotFound] = useState(false)
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["searchRecipientNames"],
    () =>
      getShipmentsFieldValuesFn({
        field: `data.CONSIGNEE_CONTACT`,
        keyword: inputValue,
        status: "SHIPMENT",
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        setResults(data.content)
        setNotFound(data.content.length === 0)
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
      return (
        <Flex align="center" css={{ padding: "$16", height: "$56" }}>
          <IllustrationSpinner css={{ display: "block", height: "$20", width: "$20" }} />
        </Flex>
      )
    }

    if (notFound) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy scale={8} color="system-black">
            Not found
          </Copy>
        </Flex>
      )
    }

    return (
      <>
        {results.length > 0 ? (
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
            <Box css={{ height: "max-content", maxHeight: "240px", overflow: "auto" }}>
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
                    checked={recipientName.includes(item)}
                  />
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Flex css={{ padding: "$16", height: "$56" }} />
        )}
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
        css={{ width: "360px", padding: "$0", border: "none", borderRadius: "$0" }}
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
              setNotFound(false)

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
