import { Drawer, Title } from "@/shared/components"
import { SettingsDrawerPreview } from "@/settings/components"

interface ISettingsDrawerProps {
  drawerTitle: string
  closeIcon: React.ReactNode
  value?: string
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  placeholder?: string
  hidePlaceholder?: boolean
  dataTestid?: string
  drawerForm: React.ReactNode
}

export const SettingsDrawer = ({
  closeIcon,
  drawerTitle,
  value,
  prefix,
  suffix,
  placeholder,
  hidePlaceholder = false,
  dataTestid,
  drawerForm,
}: ISettingsDrawerProps) => {
  return (
    <Drawer
      closeIcon={closeIcon}
      fullWidth={{ "@max-sm": true }}
      contentCss={{ padding: "$24 $16" }}
      direction="left"
      header={
        <Title as="h3" scale={3} color="theme-b-n3">
          {drawerTitle}
        </Title>
      }
      trigger={
        <SettingsDrawerPreview
          value={value ? value : ""}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder}
          hidePlaceholder={hidePlaceholder}
          dataTestid={dataTestid}
        />
      }
    >
      {drawerForm}
    </Drawer>
  )
}
