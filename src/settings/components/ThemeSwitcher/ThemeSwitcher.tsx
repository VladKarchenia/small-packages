import { useTheme } from "next-themes"

import { Copy, Flex, Switch, SwitchOption, useSwitch } from "@/shared/components"

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const switchProps = useSwitch("darkMode", theme ? theme : "light")

  return (
    <Flex align="center" justify="start" css={{ gap: "$24" }}>
      <Copy scale={5} color="theme-b-n3" fontWeight="bold">
        Dark Mode
      </Copy>
      <Switch
        {...switchProps}
        onValueChange={(value) => {
          setTheme(value)
          switchProps.onValueChange(value)
        }}
        checked={switchProps.value === "dark"}
      >
        <SwitchOption value={theme === "light" ? "dark" : "light"} />
      </Switch>
    </Flex>
  )
}
