import { Drawer, SearchFilterDrawerPreview, Title, useDrawer } from "@/shared/components"

interface ISearchFilterDrawerProps {
  drawerName: string
  drawerTitle: string
  closeIcon: React.ReactNode
  trigger?: React.ReactNode
  value?: string | React.ReactElement | null
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  description?: string
  placeholder?: string
  hidePlaceholder?: boolean
  dataTestid?: string
  drawerForm: React.ReactNode
}

export const SearchFilterDrawer = ({
  drawerName,
  drawerTitle,
  closeIcon,
  trigger,
  value = "",
  prefix,
  suffix,
  description,
  placeholder,
  hidePlaceholder = false,
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
        trigger ? (
          trigger
        ) : (
          <SearchFilterDrawerPreview
            value={value}
            prefix={prefix}
            suffix={suffix}
            description={description}
            placeholder={placeholder}
            hidePlaceholder={hidePlaceholder}
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
