import { useState } from "react"

import { IAddress } from "@/shared/types"

import { IFormLabelProps, SearchFilterDrawer, useDrawerActions } from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"

import { LocationInputForm } from "./LocationInputForm"

interface ILocationInputProps {
  initialValue: IAddress
  onChange: (locationDetails: IAddress) => void
  id: string
  label: string
  placeholder: string
  description?: string
  labelProps?: IFormLabelProps
  country: string
  person: "sender" | "recipient"
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
  person,
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
      closeIcon={<IconChevronLeft />}
      drawerForm={
        <LocationInputForm
          initialValue={locationDetails}
          onSelect={handleChange}
          id={id}
          label={label}
          placeholder={`${placeholder}: Country, state, city, zip code`}
          country={country}
          person={person}
        />
      }
      dataTestid="displayName-button-filter"
    />
  )
}
