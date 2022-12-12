import { Grid, GridItem } from "@/shared/components"

interface IStepActionsBarProps {
  start: React.ReactNode
  end: React.ReactNode
}

export const StepInputGroup: React.FC<IStepActionsBarProps> = ({ start, end }) => {
  return (
    <Grid
      columns={{ "@initial": "1fr", "@sm": "1fr 1fr" }}
      rows={{ "@initial": "1fr 1fr", "@sm": "1fr" }}
      columnGap={{ "@initial": 0, "@sm": 16 }}
      rowGap={{ "@initial": 24, "@sm": 0 }}
    >
      <GridItem>{start}</GridItem>
      <GridItem>{end}</GridItem>
    </Grid>
  )
}
