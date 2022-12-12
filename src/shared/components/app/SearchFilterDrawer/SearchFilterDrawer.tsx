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
  drawerTitle: string
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
}: ISearchFilterDrawerProps) => {
  const [drawerProps] = useDrawer(drawerName)

  return (
    <Drawer
      {...drawerProps}
      closeIcon={closeIcon}
      fullWidth={{ "@max-sm": true }}
      noPadding
      header={
        <Title as="h3" scale={7}>
          {drawerTitle}
        </Title>
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
            css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
          />
        )
      }
    >
      {drawerForm}
    </Drawer>
  )
}
