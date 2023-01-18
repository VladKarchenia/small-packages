import { Redacted, Spacer, Stack, Box } from "@/shared/components"
import { Spaces } from "@/config/theme/spacing"
import { ResponsiveProp } from "@/utils"
type RowsProps = {
  count: number
  width: string
  height: string
  stackSpace?: Spaces | ResponsiveProp<Spaces>
}

export const Rows = ({ count, width, height, stackSpace = 12 }: RowsProps) => {
  return (
    <Stack space={stackSpace}>
      {Array.from(new Array(count), (_, index) => index).map((v) => (
        <Redacted height={height} width={width} text animated key={`placeholder-row-${v}`} />
      ))}
    </Stack>
  )
}

export const LabelRows = ({ count }: { count: number }) => {
  return (
    <Stack space={16}>
      {Array.from(new Array(count), (_, index) => index).map((v) => (
        <Box key={`placeholder-row-${v}`}>
          <Redacted height="$16" width="79px" text animated />
          <Spacer size={4} />
          <Redacted height="$20" width="200px" text animated />
        </Box>
      ))}
    </Stack>
  )
}
