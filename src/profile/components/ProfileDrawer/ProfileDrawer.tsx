import { Drawer, IFormLabelProps, Title } from "@/shared/components"
import { ProfileDrawerPreview } from "@/profile"

interface IProfileDrawerProps {
  drawerTitle: string
  closeIcon: React.ReactNode
  value?: string
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  placeholder?: string
  hidePlaceholder?: boolean
  labelProps?: IFormLabelProps
  dataTestid?: string
  drawerForm: React.ReactNode
}

export const ProfileDrawer = ({
  closeIcon,
  drawerTitle,
  value,
  prefix,
  suffix,
  placeholder,
  hidePlaceholder = false,
  labelProps,
  dataTestid,
  drawerForm,
}: IProfileDrawerProps) => {
  return (
    <Drawer
      closeIcon={closeIcon}
      fullWidth={{ "@max-sm": true }}
      contentCss={{ padding: "$24 $16" }}
      header={
        <Title as="h3" scale={7}>
          {drawerTitle}
        </Title>
      }
      trigger={
        <ProfileDrawerPreview
          value={value ? value : ""}
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
