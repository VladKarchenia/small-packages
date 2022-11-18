import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
// import { toast } from "react-toastify"

import { Copy, Flex, Spacer } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"
import { SShipmentURLButton, SShipmentURLMessage } from "./ShipmentURL.styles"

type ShipmentURLProps = {
  url: string
}

export const ShipmentURL = ({ url }: ShipmentURLProps) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const handleButtonClick = () => {
    // toast.success("URL was copied")
    setCopiedToClipboard(true)

    setTimeout(() => {
      setCopiedToClipboard(false)
    }, 2000)
  }

  return (
    <>
      <CopyToClipboard text={url}>
        <SShipmentURLButton type="button" onClick={handleButtonClick}>
          <Flex align="center" css={{ width: "100%" }}>
            <Copy
              scale={9}
              color="system-black"
              bold
              css={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {url}
            </Copy>
            <Spacer size={8} horizontal />
            <Flex align="center" justify="center" css={{ color: "$system-black" }}>
              <IconCalendar size="xs" />
            </Flex>
          </Flex>
        </SShipmentURLButton>
      </CopyToClipboard>
      {/* TODO: maybe move it to toast? */}
      <SShipmentURLMessage>
        <Copy scale={10} color="neutrals-7">
          {copiedToClipboard ? "URL was copied" : ``}
        </Copy>
      </SShipmentURLMessage>
    </>
  )
}
