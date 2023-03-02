import { Grid, GridItem } from "@/shared/components"

interface IStepActionsBarProps {
  start: React.ReactNode
  end: React.ReactNode
}

export const StepInputGroup: React.FC<IStepActionsBarProps> = ({ start, end }) => {
  return (
    <Grid
      columns={{ "@initial": "1fr", "@md": "1fr 1fr" }}
      rows={{ "@initial": "auto auto", "@md": "1fr" }}
      columnGap={{ "@initial": 0, "@md": 16 }}
      rowGap={{ "@initial": 24, "@md": 0 }}
    >
      <GridItem>{start}</GridItem>
      <GridItem>{end}</GridItem>
    </Grid>
  )
}
