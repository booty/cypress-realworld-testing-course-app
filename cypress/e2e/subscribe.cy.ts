describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscribe to tha email list", () => {
    const addy = "booty@booty.com"
    cy.getByData("email-input").type(addy)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("exist").contains(addy)
  })

  it("does NOT allow a screwed-up email address", () => {
    const addy = "foo"
    cy.getByData("email-input").type(addy)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("doesn't allow duplicate users", () => {
    // this address is hard-coded into the react component for the purposes of this example shizz
    const addy = "john@example.com"
    cy.getByData("email-input").type(addy)
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists")
  })
})
