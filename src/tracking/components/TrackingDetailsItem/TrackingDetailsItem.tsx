import { Copy, Spacer } from "@/shared/components"

interface ITrackingDetailsItemProps {
  title: string
  main?: boolean
}

export const TrackingDetailsItem: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  title,
  main,
}) => {
  return (
    <>
      <Copy
        scale={main ? 5 : 9}
        color={main ? "theme-b-n3" : "theme-n6-n3"}
        fontWeight="bold"
        uppercase={main ? true : false}
      >
        {title}
      </Copy>
      <Spacer size={main ? 24 : 16} />
      {children}
    </>
  )
}
