describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("redirects to create a shipment page after button click", () => {
    cy.get('[data-testid="create-button"]').click()
    cy.get('[data-testid="create-shipment"]').click()

    cy.url().should("eq", "http://localhost:3000/create/shipment")
  })

  it("test 3", () => {
    cy.get('[data-testid="create-button"]').click()
    cy.get('[data-testid="create-shipment"]').click()

    cy.url().should("eq", "http://localhost:3000/create/shipment")
  })
})
