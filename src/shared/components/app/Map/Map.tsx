import { useState } from "react"
import { icon, latLng } from "leaflet"
import { Marker, TileLayer, Tooltip } from "react-leaflet"

import { IGeolocation, IPerson } from "@/shared/types"

import { Box, Copy } from "@/shared/components"
import { AdditionalRoute, MainRoute } from "@/shipment/components"

import { SEmptyMapContainer, SMapContainer } from "./Map.styles"

interface IMapProps {
  sender: IPerson
  recipient: IPerson
  currentLocation: IGeolocation
  theme?: string
}

export const Map = ({ sender, recipient, currentLocation, theme }: IMapProps) => {
  const [isReady, setIsReady] = useState(false)

  if (!sender.fullAddress.latitude || !recipient.fullAddress.latitude) {
    return (
      <SEmptyMapContainer align="center" justify="center">
        <Copy color="theme-b-n3">No map</Copy>
      </SEmptyMapContainer>
    )
  }

  return (
    <Box css={{ height: "100%" }}>
      <SMapContainer
        key="leafletMap"
        bounds={
          currentLocation.displayName
            ? [
                [parseFloat(sender.fullAddress.latitude), parseFloat(sender.fullAddress.longitude)],
                [parseFloat(currentLocation.latitude), parseFloat(currentLocation.longitude)],
                [
                  parseFloat(recipient.fullAddress.latitude),
                  parseFloat(recipient.fullAddress.longitude),
                ],
              ]
            : [
                [parseFloat(sender.fullAddress.latitude), parseFloat(sender.fullAddress.longitude)],
                [
                  parseFloat(recipient.fullAddress.latitude),
                  parseFloat(recipient.fullAddress.longitude),
                ],
              ]
        }
        scrollWheelZoom={true}
        whenReady={() => setIsReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isReady ? (
          <>
            <MainRoute sender={sender} recipient={recipient} currentLocation={currentLocation} />

            <Marker
              position={latLng(
                parseFloat(sender.fullAddress.latitude || "0"),
                parseFloat(sender.fullAddress.longitude || "0"),
              )}
              icon={icon({
                iconUrl: `https://smallpdevstorageacc.blob.core.windows.net/smallpdevcontainer/origin${
                  theme === "dark" ? "Dark" : "Light"
                }.png`,
                iconSize: [22, 40],
                iconAnchor: [11, 30],
              })}
              alt="originMarker"
            >
              <Tooltip direction="top" offset={[0, -45]} opacity={1}>
                {sender.fullAddress.displayName}
              </Tooltip>
            </Marker>

            <Marker
              position={latLng(
                parseFloat(recipient.fullAddress.latitude || "0"),
                parseFloat(recipient.fullAddress.longitude || "0"),
              )}
              icon={icon({
                iconUrl: `https://smallpdevstorageacc.blob.core.windows.net/smallpdevcontainer/destination${
                  theme === "dark" ? "Dark" : "Light"
                }.png`,
                iconSize: [22, 40],
                iconAnchor: [11, 30],
              })}
              alt="destinationMarker"
            >
              <Tooltip direction="top" offset={[0, -45]} opacity={1}>
                {recipient.fullAddress.displayName}
              </Tooltip>
            </Marker>

            {currentLocation.displayName ? (
              <>
                <AdditionalRoute recipient={recipient} currentLocation={currentLocation} />

                <Marker
                  position={latLng(
                    parseFloat(currentLocation.latitude),
                    parseFloat(currentLocation.longitude),
                  )}
                  icon={icon({
                    iconUrl: `https://smallpdevstorageacc.blob.core.windows.net/smallpdevcontainer/current${
                      theme === "dark" ? "Dark" : "Light"
                    }.png`,
                    iconSize: [32, 55],
                    iconAnchor: [16, 45],
                  })}
                  alt="currentMarker"
                >
                  <Tooltip direction="top" offset={[0, -60]} opacity={1}>
                    {currentLocation.displayName}
                  </Tooltip>
                </Marker>
              </>
            ) : null}
          </>
        ) : null}
      </SMapContainer>
    </Box>
  )
}
