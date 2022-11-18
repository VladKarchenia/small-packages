import { ButtonIcon, Drawer, useDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft, IconBin } from "@/shared/icons"
import { IAddress } from "@/shared/state"
import { useState } from "react"
import { SearchInputPreview } from "../SearchInputPreview"
import { SearchInputForm } from "./SearchInputForm"

export interface LocationInputProps {
  initialValue: string
  // onChange: (locationDetails: IAddress) => void
  placeholder: string
}

export const SearchInput: React.FC<LocationInputProps> = ({
  initialValue,
  // onChange,
  placeholder,
}) => {
  const [drawerProps] = useDrawer("searchInput")
  const { close } = useDrawerActions()

  const [locationDetails, setLocationDetails] = useState<string>(initialValue)

  const handleChange = (location: string) => {
    // TODO: FIX this
    // onChange({
    //   location,
    //   address: "",
    //   city: "",
    //   country: "",
    //   isResidential: false,
    //   postCode: "",
    //   state: "",
    // })
    // setLocationDetails({
    //   location,
    //   address: "",
    //   city: "",
    //   country: "",
    //   isResidential: false,
    //   postCode: "",
    //   state: "",
    // })

    close("searchInput")
  }

  return (
    <Drawer
      {...drawerProps}
      closeIcon={<IconArrowLeft />}
      fullWidth={{ "@max-sm": true }}
      noPadding
      trigger={
        <SearchInputPreview
          value={locationDetails}
          placeholder={placeholder}
          dataTestid="search-button-filter"
          figure={
            <ButtonIcon
              as="span"
              ariaLabel="search-filter"
              icon={<IconBin />}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                console.log("Search")
              }}
            />
          }
          // TODO: remove when using popovers on desktop, this is a temp fix until we remove this from the Desktop experience
          css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
        />
      }
    >
      <SearchInputForm initialValue={locationDetails} onSelect={handleChange} />
    </Drawer>
  )
}
