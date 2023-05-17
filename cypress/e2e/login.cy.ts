describe("Login Page", () => {
  let username: string, password: string

  before(() => {
    username = "vlad@mail.com"
    password = "12345678"
    cy.visit("/login", { timeout: 10000 })

    cy.intercept("POST", "http://localhost:3000/api/auth/login", {
      body: {
        token: "bla bla bla token",
      },
    }).as("loginRequest")
  })

  it("fills data, shows password text and fetches data", () => {
    cy.get("#email-form-field").find("input").type(username)
    cy.get("#password-form-field").find("input").as("passwordInput").type(password)

    // check if show password button works correctly
    cy.get("@passwordInput").should("have.attr", "type", "password")
    cy.getByTestid("show-password").should("be.visible").and("be.enabled").click()

    cy.get("@passwordInput").should("have.attr", "type", "text")

    // check data fetching and authToken setting
    cy.getLocalStorage("authToken").should("equal", null)

    cy.xpath('//*[@data-testid="login-button"]')
      .should("be.visible")
      .and("be.enabled")
      .and("contain.text", "Login")
      .click()

    cy.wait("@loginRequest").then(({ response }) => {
      cy.setLocalStorage("authToken", response?.body.token)
    })

    cy.getLocalStorage("authToken").should("equal", "bla bla bla token")
  })

  it("checks local storage token", () => {
    cy.getLocalStorage("token").should("equal", null)
    cy.setLocalStorage("token", "123")
    cy.getLocalStorage("token").should("equal", "123")
  })

  it("can be accessed within test.", () => {
    // check on text
    cy.log(Cypress.env("sharedSecret"))
  })

  it("can check and reset cookie value", () => {
    cy.getCookies().should("be.empty")
    cy.setCookie("token", "123ABC")
    cy.getCookie("token").should("have.property", "value", "123ABC")
    cy.clearCookie("token").should("be.null")
  })

  it("TDD asserts - given user is an object with string fields", () => {
    const user = {
      username: "vlad@mail.com",
      password: "12345678",
    }

    assert.isObject(user, "value is object")
    assert.typeOf(user.username, "string", "username is string")
    assert.isString(user.password, "password is string")
    assert.equal(user.username, "vlad@mail.com", "username is equal to vlad@mail.com")
    assert.equal(user.password, "12345678", "password is equal to 12345678")
  })
})
