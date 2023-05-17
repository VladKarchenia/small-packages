import { useState } from "react"

import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { Carriers } from "@/shared/types"

import {
  Copy,
  GridItem,
  Grid,
  GridContainer,
  Tabs,
  TabList,
  TabListItem,
  TabPanels,
  TabPanel,
} from "@/shared/components"

export const ChangePersonAccountsTable = ({
  fedExNameList,
  upsNameList,
}: {
  fedExNameList: string[]
  upsNameList: string[]
}) => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const [tab, setTab] = useState(Carriers.FedEx)

  return (
    <>
      {isSmallAndAbove ? (
        <GridContainer
          fullBleed
          css={{
            border: "1px solid var(--colors-theme-n4-n7)",
          }}
        >
          <Grid rows="$64 1fr">
            <GridItem css={{ borderBottom: "1px solid var(--colors-theme-n4-n7)" }}>
              <Grid columns="1fr 1fr" css={{ height: "100%" }}>
                <GridItem css={{ padding: "$20 $16" }}>
                  <Copy color="theme-b-n3" fontWeight="bold" uppercase>
                    Carrier
                  </Copy>
                </GridItem>
                <GridItem css={{ padding: "$20 $0" }}>
                  <Copy color="theme-b-n3" fontWeight="bold" uppercase>
                    Account
                  </Copy>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem css={{ color: "var(--colors-theme-b-n3)" }}>
              <Grid columns="1fr 1fr" css={{ padding: "$24 $16" }}>
                <GridItem> {Carriers.FedEx}</GridItem>
                <GridItem>
                  {fedExNameList.map((el) => (
                    <Copy color="theme-b-n3" key={el}>
                      {el}
                    </Copy>
                  ))}
                </GridItem>
              </Grid>
              <Grid columns="1fr 1fr" css={{ padding: "$24 $16" }}>
                <GridItem> {Carriers.UPS}</GridItem>
                <GridItem>
                  {upsNameList.map((el) => (
                    <Copy color="theme-b-n3" key={el}>
                      {el}
                    </Copy>
                  ))}
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </GridContainer>
      ) : (
        <Tabs selectedTab={tab} animate={false}>
          <TabList label="dashboard-tabs">
            <TabListItem
              id={Carriers.FedEx}
              onChange={() => {
                setTab(Carriers.FedEx)
              }}
            >
              {Carriers.FedEx}
            </TabListItem>
            <TabListItem
              id={Carriers.UPS}
              onChange={() => {
                setTab(Carriers.UPS)
              }}
            >
              {Carriers.UPS}
            </TabListItem>
          </TabList>
          <TabPanels>
            <TabPanel id={Carriers.FedEx}>
              {fedExNameList.map((el) => (
                <Copy color="theme-b-n3" css={{ padding: "$16 0" }} key={el}>
                  {el}
                </Copy>
              ))}
            </TabPanel>
            <TabPanel id={Carriers.UPS}>
              {upsNameList.map((el) => (
                <Copy color="theme-b-n3" css={{ padding: "$16 0" }} key={el}>
                  {el}
                </Copy>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  )
}
