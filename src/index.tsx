import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter } from "react-router-dom"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import commonTranslations from "@/locales/en/common.json"

import { AxiosInterceptor } from "@/axios"
import App from "./App"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      // possible settings
      // refetchOnWindowFocus: false,
      // refetchOnmount: false,
      // refetchOnReconnect: false,
      // retry: 1,
    },
  },
})

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
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
