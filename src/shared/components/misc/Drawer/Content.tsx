import { ComponentProps } from "@/utils"
import { SDrawerContent } from "./Content.styles"

export type DrawerContentProps = ComponentProps<typeof SDrawerContent>

export const DrawerContent = (props: DrawerContentProps) => <SDrawerContent {...props} />

DrawerContent.displayName = "DrawerContent"
