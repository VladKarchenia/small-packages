import { CSS } from "@/stitches/config"
import {
  Drawer,
  IFormLabelProps,
  SearchFilterDrawerPreview,
  SortFilterBarPreview,
  Title,
  useDrawer,
} from "@/shared/components"

interface ISearchFilterDrawerProps {
  drawerName: string
  drawerTitle?: string
  closeIcon: React.ReactNode
  triggerIcon?: boolean
  isFilterApplied?: boolean
  value?: string | React.ReactElement | null
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  description?: string
  placeholder?: string
  hidePlaceholder?: boolean
  labelProps?: IFormLabelProps
  dataTestid?: string
  drawerForm: React.ReactNode
  contentCss?: CSS
  error?: React.ReactNode
  hasError?: boolean
  disabled?: boolean
}

export const SearchFilterDrawer = ({
  drawerName,
  drawerTitle,
  closeIcon,
  triggerIcon = false,
  isFilterApplied = false,
  value = "",
  prefix,
  suffix,
  description,
  placeholder,
  hidePlaceholder = false,
  labelProps,
  dataTestid,
  drawerForm,
  contentCss,
  error,
  hasError,
  disabled,
}: ISearchFilterDrawerProps) => {
  const [drawerProps] = useDrawer(drawerName)

  return (
    <Drawer
      {...drawerProps}
      closeIcon={closeIcon}
      fullWidth={{ "@max-sm": true }}
      noPadding
      contentCss={contentCss}
      header={
        drawerName !== "dateInput" && drawerName !== "timeInput" ? (
          <Title as="h3" scale={3} color="theme-b-n3">
            {triggerIcon ? drawerTitle : "Search"}
          </Title>
        ) : null
      }
      trigger={
        triggerIcon ? (
          <SortFilterBarPreview isFilterApplied={isFilterApplied} />
        ) : (
          <SearchFilterDrawerPreview
            value={value}
            prefix={prefix}
            suffix={suffix}
            description={description}
            placeholder={placeholder}
            hidePlaceholder={hidePlaceholder}
            labelProps={labelProps}
            dataTestid={dataTestid}
            disabled={disabled}
            error={error}
            hasError={hasError}
          />
        )
      }
    >
      {drawerForm}
    </Drawer>
  )
}
