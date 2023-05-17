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
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            order: 1,
            backgroundColor: "var(--colors-theme-vlt-n9)",
          },
          flexContainer: {
            button: {
              color: "var(--colors-neutrals-5)",
              border: "1px solid var(--colors-theme-vlt-n9)",
              padding: 0,
              "&:hover": {
                backgroundColor: "var(--colors-theme-vlr-n7)",
                border: "1px solid var(--colors-theme-vlr-n7)",
                color: "var(--colors-theme-vl-yl)",
              },
              ".has-focus &:focus": {
                backgroundColor: "var(--colors-theme-w-n9)",
                border: "1px solid var(--colors-theme-vl-n3)",
              },

              "&.Mui-selected": {
                border: "1px solid var(--colors-theme-vlt-n9)",
                color: "var(--colors-theme-vl-yl)",
                "&:hover": {
                  backgroundColor: "var(--colors-theme-vlr-ydr)",
                  border: "1px solid var(--colors-theme-vlr-ydr)",
                },
                ".has-focus &:focus": {
                  backgroundColor: "var(--colors-theme-w-n9)",
                  border: "1px solid var(--colors-theme-vl-n3)",
                },
              },
            },
          },
          indicator: {
            backgroundColor: "var(--colors-theme-vl-yl)",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            lineHeight: "initial",
            "&:not(.Mui-selected)": {
              backgroundColor: "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-n4-n7)",
              ".has-focus &:focus": {
                backgroundColor: "var(--colors-theme-vlr-ydr)",
                border: "1px solid var(--colors-theme-vl-n3)",
                color: "var(--colors-theme-vl-yl)",
              },
              "&:hover": {
                backgroundColor: "var(--colors-theme-vlr-ydr)",
                border: "none",
                color: "var(--colors-theme-vl-yl)",
              },
            },
            "&:not(.Mui-disabled)": {
              backgroundColor: "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-b-n3)",
            },
            "&.Mui-selected": {
              backgroundColor: "var(--colors-theme-vl-yl)",
              color: "var(--colors-theme-w-b)",
              "&:hover": {
                backgroundColor: "var(--colors-theme-vl-yl)",
                color: "var(--colors-theme-w-b)",
              },
              "&:focus": {
                backgroundColor: "var(--colors-theme-vl-yl)",
                color: "var(--colors-theme-w-b)",
              },
              ".has-focus &:focus": {
                backgroundColor: "var(--colors-theme-vlr-ydr)",
                border: "1px solid var(--colors-theme-vl-n3)",
                color: "var(--colors-theme-vl-yl)",
              },
            },
          },
          today: {
            "&:not(.Mui-selected)": {
              border: "1px solid var(--colors-theme-b-n3)",
            },
          },
        },
      },
      MuiDayPicker: {
        styleOverrides: {
          weekDayLabel: { color: "var(--colors-theme-n6-n5)" },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "var(--colors-theme-b-n3)",
            borderRadius: "0",
            "&:hover": {
              backgroundColor: "var(--colors-theme-n2-n7)",
            },
            ".has-focus &:focus": {
              outline: "1px solid var(--colors-theme-vl-n3)",
            },
          },
        },
      },
      MuiClockPicker: {
        styleOverrides: {
          root: {
            position: "relative",
            overflow: "visible",
            backgroundColor: "var(--colors-theme-w-n8)",
          },
        },
      },
      MuiClock: {
        styleOverrides: {
          root: {
            height: isSmallAndAbove ? 238 : 286,
            margin: isSmallAndAbove ? "0 var(--space-16) var(--space-32)" : "var(--space-16)",
            "&.Mui-selected": {
              backgroundColor: "var(--colors-theme-vl-yl)",
              color: "var(--colors-theme-w-b)",
              "&:hover, .has-focus &:focus": {
                backgroundColor: "var(--colors-theme-vl-yl)",
                color: "var(--colors-theme-w-b)",
              },
            },
          },
          pin: {
            backgroundColor: "var(--colors-theme-vl-yl)",
          },
          clock: {
            scale: isSmallAndAbove ? "1" : "1.3",
            marginTop: isSmallAndAbove ? 0 : "var(--space-20)",
            backgroundColor: "var(--colors-theme-n2-n7)",
            border: "1px solid transparent",
            "&:focus, &:focus-within": {
              backgroundColor: "var(--colors-theme-vlr-ydr)",
              borderColor: "var(--colors-theme-vl-n3)",
              color: "var(--colors-theme-vl-yl)",
            },
          },
          amButton: {
            "> span": {
              fontFamily: "var(--fonts-sans)",
              fontWeight: "700",
            },
            width: `calc((var(--space-40) + var(--space-2)))`,
            height: `calc((var(--space-40) + var(--space-2)))`,
            padding: 0,
            top: -104,
            right: "var(--space-24)",
            left: "auto",
            bottom: "auto",
            color: ampm === "AM" ? "var(--colors-theme-w-b)" : "var(--colors-theme-b-w)",
            backgroundColor:
              ampm === "AM" ? "var(--colors-theme-vl-yl)" : "var(--colors-theme-w-n8)",
            border: "1px solid var(--colors-theme-n3-n7)",
            borderRadius: "0",
            boxSizing: "content-box",
            "&:hover": {
              backgroundColor:
                ampm === "AM" ? "var(--colors-theme-vlt-ydr)" : "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-vl-yl)",
              border: "1px solid var(--colors-theme-vl-n3)",
            },
            ".has-focus &:focus": {
              backgroundColor: "var(--colors-theme-vlr-ydr)",
              border: "1px solid var(--colors-theme-vl-n3)",
              color: "var(--colors-theme-vl-yl)",
            },
          },

          pmButton: {
            "> span": {
              fontFamily: "var(--fonts-sans)",
              fontWeight: "700",
            },
            disableRipple: {
              backgroundColor: "transparent",
            },
            width: `calc((var(--space-40) + var(--space-2)))`,
            height: `calc((var(--space-40) + var(--space-2)))`,
            padding: 0,
            top: -59,
            right: "var(--space-24)",
            left: "auto",
            bottom: "auto",
            color: ampm === "PM" ? "var(--colors-theme-w-b)" : "var(--colors-theme-b-w)",
            backgroundColor:
              ampm === "PM" ? "var(--colors-theme-vl-yl)" : "var(--colors-theme-w-n8)",
            border: "1px solid var(--colors-theme-n3-n7)",
            borderRadius: "0",
            boxSizing: "content-box",
            "&:hover": {
              backgroundColor:
                ampm === "AM" ? "var(--colors-theme-vlt-ydr)" : "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-vl-yl)",
              border: "1px solid var(--colors-theme-vl-n3)",
            },
            ".has-focus &:focus": {
              backgroundColor: "var(--colors-theme-vlr-ydr)",
              border: "1px solid var(--colors-theme-vl-n3)",
              color: "var(--colors-theme-vl-yl)",
              disableRipple: {
                backgroundColor: "transparent",
              },
            },
          },
        },
      },
      MuiClockPointer: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--colors-theme-vl-yl)",
          },
          thumb: {
            backgroundColor: "var(--colors-theme-vl-yl)",
            borderColor: "var(--colors-theme-vl-yl)",
          },
        },
      },
      MuiClockNumber: {
        styleOverrides: {
          root: {
            color: "var(--colors-theme-b-w)",
            "&.Mui-selected": {
              backgroundColor: "var(--colors-theme-vl-yl)",
              color: "var(--colors-theme-w-b)",
            },
          },
        },
      },
      MuiCalendarOrClockPicker: {
        styleOverrides: {
          root: {
            height: "100%",
            backgroundColor: "var(--colors-theme-w-n8)",
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
            backgroundColor: "var(--colors-theme-w-n8)",
            order: 2,
            "> span": {
              color: "var(--colors-theme-b-n3)",
              textTransform: "initial",
              fontSize: "16px",
              lineHeight: 2.5,
              letterSpacing: "0.5px",
              fontFamily: "var(--fonts-sans)",
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
              width: "var(--space-40)",
              height: "var(--space-56)",
              marginLeft: "var(--space-12)",
              borderRadius: "var(--radii-8)",
            },
          },
          separator: {
            border: "none",
            backgroundColor: "transparent",
            width: "var(--space-20)",
            padding: "var(--space-4)",
            paddingTop: "var(--space-12)",
            color: "var(--colors-theme-b-n3)",
          },
        },
      },

      MuiPickerStaticWrapper: {
        styleOverrides: {
          root: {
            fontFamily: "var(--fonts-sans)",
            justifyContent: "space-between",
            // (var(--space-72) + var(--space-4)) - header height with full date
            height: `calc(100% - var(--space-72))`,
          },
          content: {
            height: "100%",
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
            color: "var(--colors-theme-b-n3)",
            paddingLeft: "var(--space-32)",
            paddingRight: "var(--space-24)",
          },
        },
      },
      PrivatePickersToolbarText: {
        styleOverrides: {
          root: {
            height: "var(--space-88)",
            width: "var(--space-88)",
            color: "var(--colors-theme-b-n3)",
            border: "1px solid var(--colors-theme-n2-n7)",
            backgroundColor: "transparent",
            padding: "var(--space-16)",
            "&:hover, .has-focus &:focus": {
              backgroundColor: "var(--colors-theme-n2-n7)",
            },
            "&.Mui-selected": {
              color: "var(--colors-theme-b-yl)",
              border: "1px solid var(--colors-theme-vl-n3)",
              backgroundColor: "var(--colors-theme-vlt-ydt)",
            },
          },
        },
      },
      MuiPickersToolbarButton: {
        styleOverrides: {
          root: {
            "&:hover, .has-focus &:focus": {
              backgroundColor: "var(--colors-theme-n2-n7)",
            },
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
            <Box css={{ padding: "$12 $24", backgroundColor: "$theme-vlt-n9" }}>
              <Copy scale={3} color="theme-b-n3" fontWeight="bold">
                {format(date, "EEE, MMM d")}
              </Copy>
              <Copy color="theme-n5-n3">
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

  const handleCancel = () => {
    props.onCancel()
    close("dateInput")
  }

  return (
    <Grid
      gap={{ "@initial": 8, "@sm": 16 }}
      columns="1fr 1fr"
      css={{
        paddingX: "$16",
        paddingBottom: "$20",
        backgroundColor: "$theme-w-n8",
        "@sm": { display: "none" },
      }}
    >
      <GridItem>
        <Button type="button" full onClick={handleAccept}>
          Done
        </Button>
      </GridItem>
      <GridItem>
        <Button type="button" action="secondary" full onClick={handleCancel}>
          Cancel
        </Button>
      </GridItem>
    </Grid>
  )
}
