import { useState } from "react"
import format from "date-fns/format"
import addDays from "date-fns/addDays"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"
import { CalendarOrClockPickerView } from "@mui/x-date-pickers/internals/models/views"
import { Box, Button, Copy, Grid, GridItem, useDrawerActions } from "@/shared/components"
import { useFormContext } from "react-hook-form"
import { ShipmentState } from "@/shared/state"

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          order: 1,
        },
        flexContainer: {
          button: {
            "&.Mui-selected": {
              color: "black",
            },
          },
        },
        indicator: {
          backgroundColor: "black",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "black",
            "&:hover, &:focus": {
              backgroundColor: "black",
            },
          },
        },
      },
    },
    MuiClockPicker: {
      styleOverrides: {
        root: {
          position: "relative",
          overflow: "visible",
        },
      },
    },
    MuiClock: {
      styleOverrides: {
        root: {
          height: 286,
        },
        pin: {
          backgroundColor: "black",
        },
        clock: {
          scale: "1.3",
          marginTop: 20,
        },
        amButton: {
          width: 38,
          height: 27,
          padding: 0,
          top: "-72px",
          right: "71px",
          left: "auto",
          bottom: "auto",
          color: "black",
          backgroundColor: "white",
          border: "1px solid lightgrey",
          borderRadius: "8px 8px 0 0",
          boxSizing: "content-box",
          ":hover": {
            backgroundColor: "black",
            color: "white",
          },
        },
        pmButton: {
          width: 38,
          height: 27,
          padding: 0,
          top: "-44px",
          right: "71px",
          left: "auto",
          bottom: "auto",
          color: "black",
          backgroundColor: "white",
          border: "1px solid lightgrey",
          borderRadius: "0 0 8px 8px",
          boxSizing: "content-box",
          ":hover": {
            backgroundColor: "black",
            color: "white",
          },
        },
      },
    },
    MuiClockPointer: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
        },
        thumb: {
          backgroundColor: "black",
          borderColor: "black",
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "black",
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          ">:first-of-type": {
            backgroundColor: "blue",
          },
          ">:not(:first-of-type)": {
            backgroundColor: "red",
          },
        },
      },
    },
    MuiCalendarOrClockPicker: {
      styleOverrides: {
        root: {
          ">:last-of-type": {
            order: 3,
            overflow: "visible",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          order: 2,
          "> span": {
            display: "none",
          },
        },
        penIconButton: {
          display: "none",
        },
        content: {
          justifyContent: "center",
        },
      },
    },
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        dateContainer: {
          display: "none",
        },
        timeContainer: {
          position: "relative",
          "&:after": {
            content: "''",
            display: "block",
            width: 40,
            height: 56,
            marginLeft: 12,
            borderRadius: 8,
          },
        },
      },
    },
    MuiPickerStaticWrapper: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          height: "calc(100% - 76px)",
        },
        content: {
          overflow: "visible",
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          scale: "1.2",
          marginTop: 32,
          overflow: "visible",
        },
      },
    },
  },
})

export const CalendarDates = ({ isDesktop }: { isDesktop?: boolean }) => {
  const [pickerView, setPickerView] = useState<CalendarOrClockPickerView>("day")
  const today = new Date()
  const end = addDays(today, 13)

  const { setValue, watch } = useFormContext<ShipmentState>()
  const { date } = watch()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        {date ? (
          <Box css={{ padding: "$12 $24" }}>
            <Copy scale={6} color="system-black" bold>
              {format(date, "EEE, MMM d")}
            </Copy>
            <Copy scale={8} color="system-black">
              {format(date, "hh:mm aa")}
            </Copy>
          </Box>
        ) : null}
        <StaticDateTimePicker
          renderInput={() => <div />}
          value={date}
          onChange={(value) => (value ? setValue("date", value) : "")}
          components={{ ActionBar: CustomActionBar }}
          componentsProps={{
            actionBar: {
              actions: ["accept", "cancel"],
            },
          }}
          minDate={today}
          maxDate={end}
          // minTime={}
          // maxTime={}
          ampmInClock={true}
          minutesStep={5}
          showDaysOutsideCurrentMonth
          showToolbar={pickerView === "day" ? false : true}
          views={["day", "hours", "minutes"]}
          onViewChange={(view: CalendarOrClockPickerView) => setPickerView(view)}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

const CustomActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onCancel } = props
  const { close } = useDrawerActions()

  const handleAccept = () => {
    onAccept()
    close("dateInput")
  }

  return (
    <Grid
      gap={{ "@initial": 8, "@sm": 16 }}
      columns={"1fr 1fr"}
      css={{ paddingX: "$16", paddingBottom: "$20" }}
    >
      <GridItem>
        <Button type="button" full onClick={handleAccept}>
          <Copy as="span" scale={8} color="system-white" bold>
            Done
          </Copy>
        </Button>
      </GridItem>
      <GridItem>
        <Button type="button" action="secondary" full onClick={onCancel}>
          <Copy as="span" scale={8} color="system-black" bold>
            Cancel
          </Copy>
        </Button>
      </GridItem>
    </Grid>
  )
}
