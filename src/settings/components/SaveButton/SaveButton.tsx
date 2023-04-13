import { GridItem, Grid, Button } from "@/shared/components"

export const SaveButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Grid
      columns={{ "@initial": "1fr", "@md": "1fr 1fr" }}
      rows={{ "@initial": "auto auto", "@md": "1fr" }}
      columnGap={{ "@initial": 0, "@md": 16 }}
      rowGap={{ "@initial": 24, "@md": 0 }}
      css={{ maxWidth: 1000 }}
    >
      <GridItem>
        <Button type="submit" full loading={isLoading}>
          Save changes
        </Button>
      </GridItem>
    </Grid>
  )
}
