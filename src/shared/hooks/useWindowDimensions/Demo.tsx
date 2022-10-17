import { Copy, Global } from "@/shared/components"
import { useWindowDimensions } from "./useWindowDimensions"

interface IWrapComponentProps {
  debounce?: number
}

const DemoComponent = ({ debounce }: IWrapComponentProps) => {
  const { width, height } = useWindowDimensions(debounce)
  return (
    <Global>
      <Copy>{`window width: ${width}px`}</Copy>
      <Copy>{`window height: ${height}px`}</Copy>
    </Global>
  )
}

export const WrapComponent = ({ debounce }: IWrapComponentProps) => {
  return <DemoComponent debounce={debounce} />
}
