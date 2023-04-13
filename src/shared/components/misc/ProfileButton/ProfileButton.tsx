import { useEffect, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useQuery } from "react-query"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { Role } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { escapeKeyDown, spaceAndEnterKeyDown } from "@/shared/utils"
import { getUserOrganizationsFn } from "@/api/userApi"
import { IUserOrganization } from "@/api/types"
import { useUserSettings } from "@/shared/data"

import {
  FlexItem,
  Flex,
  Spacer,
  Copy,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Box,
  Stack,
  Spinner,
} from "@/shared/components"
import { IconChevronDown, IconChevronTop } from "@/shared/icons"

import { SProfileBox, SSwitchOrganizationButton } from "./ProfileButton.styles"

export const ProfileButton = () => {
  const [user, organization, setOrganization, setSettings] = useAuthStore(
    (state) => [state.user, state.organization, state.setOrganization, state.setSettings],
    shallow,
  )
  const role = user.authorities?.[0]?.authority
  const [currentOrganization, setCurrentOrganization] = useState<IUserOrganization>(organization)
  const initials = user.firstName && user.lastName ? user.firstName[0] + user.lastName[0] : ""
  const organizationName = role === Role.Admin || role === Role.Ops ? currentOrganization.name : ""

  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  // const [inputValue, setInputValue] = useState<string>("")
  // const [keyword] = useDebounce(inputValue.trim(), 300)
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  const handleClick = (organization: IUserOrganization) => {
    const newOrg =
      organizations?.find((i) => i.label === organization.label) || ({} as IUserOrganization)

    setCurrentOrganization(newOrg)
    setOrganization(newOrg)
    setIsOpen(false)
  }

  const {
    isLoading,
    isIdle,
    error,
    data: organizations,
  } = useQuery("allOrganizations", getUserOrganizationsFn, {
    staleTime: Infinity,
  })

  const { data: settings } = useUserSettings(currentOrganization?.id)

  useEffect(() => {
    if (settings) {
      setSettings(settings)
    }
  }, [settings, setSettings])

  const Content = () => {
    if (isIdle) {
      return <Flex css={{ padding: "$16", height: "$56" }} />
    }

    if (isLoading) {
      return <Spinner />
    }

    if (isAxiosError(error)) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy color="theme-b-n3">{error.response?.data.errorMessage || error.message}</Copy>
        </Flex>
      )
    }

    if (!organizations || organizations.length === 0) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy color="theme-b-n3">Not found</Copy>
        </Flex>
      )
    }

    return (
      <>
        <Box css={{ padding: "$12 $16" }}>
          <Copy color="theme-b-n3" fontWeight="bold">
            Switch organization
          </Copy>
          {/* <Spacer size={12} />
          <FormInput
            value={inputValue}
            label="Search for organization"
            labelProps={{ hidden: true }}
            placeholder="Search for organization"
            onChange={(event) => setInputValue(event.target.value)}
            prefix={<IconSearch />}
          /> */}
        </Box>

        <Stack space={0} css={{ paddingX: "$16", "@md": { paddingX: 0 } }}>
          {organizations?.map((v) => (
            <Box
              key={v.id}
              onClick={() => handleClick(v)}
              tabIndex={0}
              onKeyDown={(e) => {
                spaceAndEnterKeyDown(e.key) && handleClick(v)
              }}
              css={{
                padding: "$12 $16",
                color: "$theme-b-n3",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                cursor: "pointer",

                hover: {
                  backgroundColor: "$theme-n2-n7",
                },

                keyboardFocus: {
                  backgroundColor: "$theme-n2-n7",
                },
              }}
            >
              {v.label}
            </Box>
          ))}
        </Stack>
      </>
    )
  }

  if (isSmallAndAbove) {
    return (
      <Popover open={isOpen}>
        <PopoverAnchor
          asChild
          onKeyDown={(e: { key: string }) => escapeKeyDown(e.key) && setIsOpen(false)}
        >
          <SSwitchOrganizationButton
            ref={triggerRef}
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true)
              }
            }}
            active={isOpen}
          >
            <Flex align="center" css={{ color: "$theme-b-n3" }}>
              {organizationName ? (
                <>
                  <FlexItem>
                    <Copy scale={10}>{organizationName}</Copy>
                  </FlexItem>
                  <Spacer size={12} horizontal />
                </>
              ) : null}
              <FlexItem>
                <SProfileBox>
                  <Copy scale={{ "@initial": 4, "@sm": 5 }} fontWeight="medium">
                    {initials}
                  </Copy>
                </SProfileBox>
              </FlexItem>
              <Spacer size={12} horizontal />
              {isOpen ? <IconChevronTop size="xs" /> : <IconChevronDown size="xs" />}
            </Flex>
          </SSwitchOrganizationButton>
        </PopoverAnchor>
        <PopoverContent
          close={() => setIsOpen(false)}
          align="start"
          css={{
            width: 600,
            maxHeight: 400,
            overflowY: "auto",

            keyboardFocus: {
              outline: "1px solid $theme-vl-n3",
            },
          }}
          alignOffset={-1}
          onInteractOutside={(event) => {
            if (isTriggerClick(event)) {
              return
            }
            return setIsOpen(false)
          }}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
          }}
        >
          <Content />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Flex align="center" css={{ color: "$theme-b-n3" }}>
      {organizationName ? (
        <>
          <FlexItem>
            <Copy scale={10}>{organizationName}</Copy>
          </FlexItem>
          <Spacer size={12} horizontal />
        </>
      ) : null}
      <FlexItem>
        <SProfileBox>
          <Copy scale={{ "@initial": 4, "@sm": 5 }} fontWeight="medium">
            {initials}
          </Copy>
        </SProfileBox>
      </FlexItem>
    </Flex>
  )
}
