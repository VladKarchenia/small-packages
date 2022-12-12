import { useState } from "react"
import format from "date-fns/format"
import addDays from "date-fns/addDays"
import { useFormContext } from "react-hook-form"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"
import { CalendarOrClockPickerView } from "@mui/x-date-pickers/internals/models/views"
import { Box, Button, Copy, Grid, GridItem, Hidden, useDrawerActions } from "@/shared/components"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { ShipmentState } from "@/shared/state"

export const CalendarDates = () => {
  const [pickerView, setPickerView] = useState<CalendarOrClockPickerView>("day")
  const today = new Date()
  const end = addDays(today, 13)

  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { date } = watch()

  const ampm = format(date, "a")

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
            lineHeight: "initial",
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
            height: isSmallAndAbove ? "238px" : "286px",
            margin: isSmallAndAbove ? "0 16px 32px 16px" : "16px",
          },
          pin: {
            backgroundColor: "black",
          },
          clock: {
            scale: isSmallAndAbove ? "1" : "1.3",
            marginTop: isSmallAndAbove ? "0px" : "20px",
          },
          amButton: {
            width: "38px",
            height: "27px",
            padding: "0px",
            top: "-72px",
            right: "71px",
            left: "auto",
            bottom: "auto",
            color: ampm === "AM" ? "white" : "black",
            backgroundColor: ampm === "AM" ? "black" : "white",
            border: "1px solid lightgrey",
            borderRadius: "8px 8px 0 0",
            boxSizing: "content-box",
            ":hover": {
              backgroundColor: "black",
              color: "white",
            },
          },
          pmButton: {
            width: "38px",
            height: "27px",
            padding: "0px",
            top: "-44px",
            right: "71px",
            left: "auto",
            bottom: "auto",
            color: ampm === "PM" ? "white" : "black",
            backgroundColor: ampm === "PM" ? "black" : "white",
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
              width: "40px",
              height: "56px",
              marginLeft: "12px",
              borderRadius: "8px",
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
            scale: isSmallAndAbove ? "1" : "1.2",
            marginTop: isSmallAndAbove ? "24px" : "32px",
            overflow: "visible",
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            paddingLeft: "32px",
            paddingRight: "24px",
          },
        },
      },
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Hidden above="sm">
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
        </Hidden>
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
  const { close } = useDrawerActions()

  const handleAccept = () => {
    props.onAccept()
    close("dateInput")
  }

  return (
    <Grid
      gap={{ "@initial": 8, "@sm": 16 }}
      columns={"1fr 1fr"}
      css={{ paddingX: "$16", paddingBottom: "$20", "@sm": { display: "none" } }}
    >
      <GridItem>
        <Button type="button" full onClick={handleAccept}>
          <Copy as="span" scale={8} color="system-white" bold>
            Done
          </Copy>
        </Button>
      </GridItem>
      <GridItem>
        <Button type="button" action="secondary" full onClick={props.onCancel}>
          <Copy as="span" scale={8} color="system-black" bold>
            Cancel
          </Copy>
        </Button>
      </GridItem>
    </Grid>
  )
}
