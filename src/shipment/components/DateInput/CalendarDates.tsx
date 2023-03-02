import { useState } from "react"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import addDays from "date-fns/addDays"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"
import { useFormContext } from "react-hook-form"

import type {} from "@mui/x-date-pickers/themeAugmentation"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"
import { CalendarOrClockPickerView } from "@mui/x-date-pickers/internals/models/views"

import { mediaQueries } from "@/stitches/theme"
import { useMedia } from "@/shared/hooks"
import { ShipmentState } from "@/shared/types"

import { Box, Button, Copy, Grid, GridItem, Hidden, useDrawerActions } from "@/shared/components"

export const CalendarDates = () => {
  const [pickerView, setPickerView] = useState<CalendarOrClockPickerView>("day")
  const today = new Date()
  const end = addDays(today, 13)

  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { date, sender } = watch()

  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )

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
                color: "var(--colors-system-black)",
              },
            },
          },
          indicator: {
            backgroundColor: "var(--colors-system-black)",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            lineHeight: "initial",
            "&.Mui-selected": {
              backgroundColor: "var(--colors-system-black)",
              color: "var(--colors-system-white)",
              "&:hover, &:focus": {
                backgroundColor: "var(--colors-system-black)",
                color: "var(--colors-system-white)",
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
            height: isSmallAndAbove ? 238 : 286,
            margin: isSmallAndAbove ? "0 var(--space-16) var(--space-32)" : "var(--space-16)",
          },
          pin: {
            backgroundColor: "var(--colors-system-black)",
          },
          clock: {
            scale: isSmallAndAbove ? "1" : "1.3",
            marginTop: isSmallAndAbove ? 0 : "var(--space-20)",
          },
          amButton: {
            width: "var(--sizes-40)",
            height: 27,
            padding: 0,
            top: -72,
            right: 71,
            left: "auto",
            bottom: "auto",
            color: ampm === "AM" ? "var(--colors-system-white)" : "var(--colors-system-black)",
            backgroundColor:
              ampm === "AM" ? "var(--colors-system-black)" : "var(--colors-system-white)",
            border: "1px solid var(--colors-neutrals-5)",
            borderRadius: "var(--radii-8) var(--radii-8) 0 0",
            boxSizing: "content-box",
            ":hover": {
              backgroundColor: "var(--colors-system-black)",
              color: "var(--colors-system-white)",
            },
          },
          pmButton: {
            width: "var(--sizes-40)",
            height: 27,
            padding: 0,
            top: -44,
            right: 71,
            left: "auto",
            bottom: "auto",
            color: ampm === "PM" ? "var(--colors-system-white)" : "var(--colors-system-black)",
            backgroundColor:
              ampm === "PM" ? "var(--colors-system-black)" : "var(--colors-system-white)",
            border: "1px solid var(--colors-neutrals-5)",
            borderRadius: "0 0 var(--radii-8) var(--radii-8)",
            boxSizing: "content-box",
            ":hover": {
              backgroundColor: "var(--colors-system-black)",
              color: "var(--colors-system-white)",
            },
          },
        },
      },
      MuiClockPointer: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--colors-system-black)",
          },
          thumb: {
            backgroundColor: "var(--colors-system-black)",
            borderColor: "var(--colors-system-black)",
          },
        },
      },
      MuiClockNumber: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "var(--colors-system-black)",
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
              width: "var(--sizes-40)",
              height: "var(--sizes-56)",
              marginLeft: "var(--space-12)",
              borderRadius: "var(--radii-8)",
            },
          },
        },
      },
      MuiPickerStaticWrapper: {
        styleOverrides: {
          root: {
            justifyContent: "space-between",
            // (var(--sizes-72) + var(--sizes-4)) - header height with full date
            height: `calc(100% - (var(--sizes-72) + var(--sizes-4)))`,
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
            marginTop: isSmallAndAbove ? "var(--space-24)" : "var(--space-32)",
            overflow: "visible",
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            paddingLeft: "var(--space-32)",
            paddingRight: "var(--space-24)",
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
                {`${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                  date,
                  timeZone,
                  "(zzz)",
                )}`}
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
      columns="1fr 1fr"
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
