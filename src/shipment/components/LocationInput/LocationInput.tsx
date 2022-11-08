import { Drawer, useDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft } from "@/shared/icons"
import { IAddress } from "@/shared/state"
import { useState } from "react"
import { InputPreview } from "../InputPreview"
import { LocationInputForm } from "./LocationInputForm"

export interface LocationInputProps {
  initialValue: IAddress
  onChange: (locationDetails: IAddress) => void
  placeholder: string
}

export const LocationInput: React.FC<LocationInputProps> = ({
  initialValue,
  onChange,
  placeholder,
}) => {
  const [drawerProps] = useDrawer("locationInput")
  const { close } = useDrawerActions()

  const [locationDetails, setLocationDetails] = useState<IAddress>(initialValue)

  const handleChange = (location: string) => {
    // TODO: FIX this
    onChange({
      location,
      address: "",
      city: "",
      country: "",
      isResidential: false,
      postCode: "",
      state: "",
    })
    setLocationDetails({
      location,
      address: "",
      city: "",
      country: "",
      isResidential: false,
      postCode: "",
      state: "",
    })

    close("locationInput")
  }

  return (
    <Drawer
      {...drawerProps}
      closeIcon={<IconArrowLeft />}
      fullWidth={{ "@max-sm": true }}
      noPadding
      trigger={
        <InputPreview
          value={locationDetails.location}
          placeholder={placeholder}
          dataTestid="location-button-filter"
          // TODO: remove when using popovers on desktop, this is a temp fix until we remove this from the Desktop experience
          css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
        />
      }
    >
      <LocationInputForm initialValue={locationDetails} onSelect={handleChange} />
    </Drawer>
  )
}
