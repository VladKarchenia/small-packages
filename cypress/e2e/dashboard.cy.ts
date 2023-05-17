import { getByTestId } from "cypress/utils"

describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("opens the default shipments tab and tab switching works", () => {
    cy.get("#tab-shipments").as("shipmentsTab")
    cy.get("#tab-quotes").as("quotesTab")

    cy.get("@shipmentsTab")
      .should("be.visible")
      .and("be.enabled")
      .and("contain.text", "Shipments")
      .and("have.attr", "aria-selected", "true")
    cy.get("@quotesTab")
      .should("be.visible")
      .and("be.enabled")
      .and("contain.text", "Quotes")
      .and("have.attr", "aria-selected", "false")

    // click to the Quotes tab
    cy.get("@quotesTab").click()
    cy.get("@shipmentsTab").should("have.attr", "aria-selected", "false")
    cy.get("@quotesTab").should("have.attr", "aria-selected", "true")

    // click back to the Shipments tab
    cy.get("@shipmentsTab").click()
    cy.get("@shipmentsTab").should("have.attr", "aria-selected", "true")
    cy.get("@quotesTab").should("have.attr", "aria-selected", "false")
  })

  it("shows the modal with options  after clicking the create button and hides if clicked outside", () => {
    getByTestId("create-button").as("createButton").should("be.visible").and("be.enabled").click()

    // create button click which shows the overlay and options
    cy.get("@createButton").should("not.be.visible")
    getByTestId("modal-overlay").as("modalOverlay").should("be.visible")
    getByTestId("create-quote").as("createQuote").should("be.visible").and("be.enabled")
    getByTestId("create-shipment").as("createShipment").should("be.visible").and("be.enabled")

    cy.get("@createQuote").siblings("p").should("be.visible").and("contain.text", "Create a quote")
    cy.get("@createShipment")
      .siblings("p")
      .should("be.visible")
      .and("contain.text", "Create a shipment")

    // outside modal click which closes the overlay
    cy.get("@modalOverlay").click()
    cy.get("@createButton").should("be.visible")
  })

  it("redirects to create a quote page after button click", () => {
    getByTestId("create-button").click()
    getByTestId("create-quote").click()

    cy.url().should("include", "/create/quote")
  })

  it("redirects to create a shipment page after button click", () => {
    getByTestId("create-button").click()
    getByTestId("create-shipment").click()

    cy.url().should("eq", "http://localhost:3000/create/shipment")
  })
})
