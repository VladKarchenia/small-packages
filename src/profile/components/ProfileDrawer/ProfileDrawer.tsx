import { Drawer, IFormLabelProps, Title, useDrawer } from "@/shared/components"
import { ProfileDrawerPreview } from "@/profile"

interface IProfileDrawerProps {
  drawerName: string
  drawerTitle: string
  closeIcon: React.ReactNode
  value?: string | React.ReactElement | null
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  placeholder?: string
  hidePlaceholder?: boolean
  labelProps?: IFormLabelProps
  dataTestid?: string
  drawerForm: React.ReactNode
}

export const ProfileDrawer = ({
  drawerName,
  drawerTitle,
  closeIcon,
  value = "",
  prefix,
  suffix,
  placeholder,
  hidePlaceholder = false,
  labelProps,
  dataTestid,
  drawerForm,
}: IProfileDrawerProps) => {
  const [drawerProps] = useDrawer(drawerName)

  return (
    <Drawer
      {...drawerProps}
      closeIcon={closeIcon}
      fullWidth={{ "@max-sm": true }}
      header={
        <Title as="h3" scale={7}>
          {drawerTitle}
        </Title>
      }
      trigger={
        <ProfileDrawerPreview
          value={value}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder}
          hidePlaceholder={hidePlaceholder}
          labelProps={labelProps}
          dataTestid={dataTestid}
          css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
        />
      }
    >
      {drawerForm}
    </Drawer>
  )
}
