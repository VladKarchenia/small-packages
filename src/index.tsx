import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter } from "react-router-dom"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { AuthProvider, ShipmentContextProvider, StateContextProvider } from "@/shared/state"
import commonTranslations from "@/locales/en/common.json"

import App from "./App"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
})

// possible settings
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: 1,
//       staleTime: 5 * 1000,
//     },
//   },
// })

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: commonTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common"],
  debug: false,
  load: "currentOnly",
  interpolation: {
    escapeValue: false,
  },
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StateContextProvider>
          <ShipmentContextProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ShipmentContextProvider>
        </StateContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
