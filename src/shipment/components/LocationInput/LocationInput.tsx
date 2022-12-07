import { IFormLabelProps, SearchFilterDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft } from "@/shared/icons"
import { IAddress } from "@/shared/state"
import { useState } from "react"
import { LocationInputForm } from "./LocationInputForm"

interface ILocationInputProps {
  initialValue: IAddress
  onChange: (locationDetails: IAddress) => void
  placeholder: string
  description?: string
  labelProps?: IFormLabelProps
}

export const LocationInput: React.FC<ILocationInputProps> = ({
  initialValue,
  onChange,
  placeholder,
  description,
  labelProps,
}) => {
  const { close } = useDrawerActions()

  const [locationDetails, setLocationDetails] = useState<IAddress>(initialValue)

  const handleChange = (location: string) => {
    // TODO: FIX this
    onChange({
      location,
      address1: "",
      address2: "",
      city: "",
      country: "",
      isResidential: false,
      zipCode: "",
      state: "",
    })
    setLocationDetails({
      location,
      address1: "",
      address2: "",
      city: "",
      country: "",
      isResidential: false,
      zipCode: "",
      state: "",
    })

    close("locationInput")
  }

  return (
    <SearchFilterDrawer
      drawerName="locationInput"
      drawerTitle="Find destination"
      value={locationDetails.location}
      placeholder={placeholder}
      hidePlaceholder
      description={description}
      labelProps={labelProps}
      closeIcon={<IconArrowLeft />}
      drawerForm={
        <LocationInputForm
          initialValue={locationDetails}
          onSelect={handleChange}
          placeholder={placeholder}
        />
      }
      dataTestid="location-button-filter"
    />
  )
}
