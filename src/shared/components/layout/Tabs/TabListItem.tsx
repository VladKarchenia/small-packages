import { useCallback, useEffect, useRef } from "react"
import { ComponentProps } from "@/utils"
import { Copy } from "@/shared/components"
import { useTabsContext } from "./state"
import { STabListItem } from "./TabListItem.styles"

export interface ITabListItemProps extends ComponentProps<typeof STabListItem> {
  /**
   * ID of the Tab List Item
   */
  id: string
}

export const TabListItem = ({ children, id, ...props }: ITabListItemProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { selected, setSelected } = useTabsContext()

  const handleOnClick = useCallback(() => {
    setSelected(id)
  }, [id, setSelected])

  const isSelected = selected === id

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.focus()
    }
  }, [isSelected])

  return (
    <STabListItem
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      onClick={handleOnClick}
      ref={ref}
      {...props}
    >
      <Copy
        scale={{ "@initial": 9, "@md": 8 }}
        color={isSelected ? "neutrals-9" : "neutrals-7"}
        css={{ textShadow: isSelected ? "0 0 0.75px black" : "" }}
      >
        {children}
      </Copy>
    </STabListItem>
  )
}
