import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      config.env.sharedSecret =
        process.env.NODE_ENV === "qa" ? "hoop brick tort" : "sushi cup lemon"
      return config
    },
  },
})
