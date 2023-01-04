import { useState } from "react"
import { IFormLabelProps, SearchFilterDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft } from "@/shared/icons"
import { IAddress } from "@/shared/types"
import { LocationInputForm } from "./LocationInputForm"

interface ILocationInputProps {
  initialValue: IAddress
  onChange: (locationDetails: IAddress) => void
  placeholder: string
  description?: string
  labelProps?: IFormLabelProps
  country: string,
}

export const LocationInput: React.FC<ILocationInputProps> = ({
  initialValue,
  onChange,
  placeholder,
  description,
  labelProps,
  country,
}) => {
  const { close } = useDrawerActions()

  const [locationDetails, setLocationDetails] = useState<IAddress>(initialValue)

  const handleChange = (locationDetails: IAddress) => {
    onChange(locationDetails)
    setLocationDetails(locationDetails)

    close(`location${placeholder}Input`)
  }

  return (
    <SearchFilterDrawer
      drawerName={`location${placeholder}Input`}
      drawerTitle="Find destination"
      value={locationDetails.displayName}
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
          country={country}
        />
      }
      dataTestid="displayName-button-filter"
    />
  )
}
