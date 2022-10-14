import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { AuthProvider, StateContextProvider } from "@/shared/state"

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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StateContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StateContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
