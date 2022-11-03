import { Drawer, useDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft, IconSearch } from "@/shared/icons"
import { useState } from "react"
import { InputPreview } from "../InputPreview"
import { DestinationState } from "../StepperContainer"
import { LocationInputForm } from "./LocationInputForm"

export interface LocationDetailsValues {
  location: string
  placeId: string
}

export interface LocationInputProps {
  initialValue: DestinationState
  onChange: (locationDetails: LocationDetailsValues) => void
  placeholder: string
}

export const LocationInput: React.FC<LocationInputProps> = ({ initialValue, onChange, placeholder }) => {
  const [drawerProps] = useDrawer("locationInput")
  const { close } = useDrawerActions()

  const [locationDetails, setLocationDetails] = useState<DestinationState>(initialValue)

  const handleChange = (location: string, placeId: string) => {
    onChange({ location, placeId })
    setLocationDetails({ location, placeId })

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
          figure={<IconSearch />}
          value={locationDetails.location}
          placeholder={placeholder}
          dataTestid="location-button-filter"
          // TODO: remove when using popovers on desktop, this is a temp fix until we remove this from the Desktop experience
          css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
        />
      }
    >
      <LocationInputForm initialValue={locationDetails.location} onSelect={handleChange} />
    </Drawer>
  )
}
