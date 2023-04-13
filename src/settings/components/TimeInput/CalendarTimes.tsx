import format from "date-fns/format"
import { useFormContext } from "react-hook-form"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"

import { mediaQueries } from "@/stitches/theme"
import { useMedia } from "@/shared/hooks"

import { Box, Button, Copy, Grid, GridItem, Hidden, useDrawerActions } from "@/shared/components"
import { ChangePersonPreferencesInput } from "@/api/types"

export const CalendarTimes = () => {
  const today = new Date()
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const { setValue, watch } = useFormContext<ChangePersonPreferencesInput>()
  const { readyTime } = watch()
  const ampm = format(readyTime ? readyTime : today, "a")

  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
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
              "&:hover, &:focus": {
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
            ":hover": {
              backgroundColor:
                ampm === "AM" ? "var(--colors-theme-vlt-ydr)" : "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-vl-yl)",
              border: "1px solid var(--colors-theme-vl-n3)",
            },
            "&:focus, &:focus-within": {
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
            ":hover": {
              backgroundColor:
                ampm === "AM" ? "var(--colors-theme-vlt-ydr)" : "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-vl-yl)",
              border: "1px solid var(--colors-theme-vl-n3)",
            },
            "&:focus, &:focus-within": {
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
      MuiTimePickerToolbar: {
        styleOverrides: {
          hourMinuteLabel: {
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

      PrivatePickersToolbarText: {
        styleOverrides: {
          root: {
            height: "var(--space-88)",
            width: "var(--space-88)",
            color: "var(--colors-theme-b-n3)",
            border: "1px solid var(--colors-theme-n2-n7)",
            backgroundColor: "transparent",
            padding: "var(--space-16)",
            "&:hover, &:focus, &:focus-within": {
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
            "&:hover, &:focus, &:focus-within": {
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
          <Box css={{ padding: "$12 $24", backgroundColor: "$theme-vlt-n9" }}>
            <Copy color="theme-n5-n3">{`${format(readyTime || today, "hh:mm aa")} `}</Copy>
          </Box>
        </Hidden>
        <StaticTimePicker
          renderInput={() => <div />}
          value={readyTime}
          onChange={(value) => setValue("readyTime", value)}
          components={{ ActionBar: CustomActionBar }}
          componentsProps={{
            actionBar: {
              actions: ["accept", "cancel"],
            },
          }}
          ampmInClock={true}
          minutesStep={5}
          views={["hours", "minutes"]}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

const CustomActionBar = (props: PickersActionBarProps) => {
  const { close } = useDrawerActions()

  const handleAccept = () => {
    props.onAccept()
    close("timeInput")
  }

  const handleCancel = () => {
    props.onCancel()
    close("timeInput")
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
