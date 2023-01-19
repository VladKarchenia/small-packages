import { useState } from "react"
import { IFormLabelProps, SearchFilterDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft } from "@/shared/icons"
import { IAddress } from "@/shared/types"
import { LocationInputForm } from "./LocationInputForm"
import { id } from "date-fns/locale"

interface ILocationInputProps {
  initialValue: IAddress
  onChange: (locationDetails: IAddress) => void
  id: string
  label: string
  placeholder: string
  description?: string
  labelProps?: IFormLabelProps
  country: string
}

export const LocationInput: React.FC<ILocationInputProps> = ({
  initialValue,
  onChange,
  id,
  label,
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
          id={id}
          label={label}
          placeholder={`${placeholder}: Country, state, city, zip code`}
          country={country}
        />
      }
      dataTestid="displayName-button-filter"
    />
  )
}
