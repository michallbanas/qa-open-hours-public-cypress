describe("Playground - Cypress 12.7.0", () => {
  beforeEach(() => {
    cy.intercept("POST", /featureName=SearchReturnItinerariesQuery/).as(
      "searchResults"
    );
    cy.viewport(1600, 900);
    cy.visit("/?destination=berlin-germany&origin=prague-czechia");
  });

  it("should demonstrate the changes in behaviour of within(), aliases() and overwriting queries", () => {
    cy.get("[data-test*='SearchPlaceField']").within(() => {
            cy.get("[data-test='PlacePickerInputPlace']").first().invoke("text").as("origin")
            cy.get("[data-test='PlacePickerInputPlace']").last().invoke("text").as("destination")
    })

    cy.get("[data-test='LandingSearchButton']").click()

    cy.wait("@searchResults")
    cy.get("[data-test='ResultCardWrapper']:first").should("be.visible")

    cy.get("@origin").then(origin => {
            cy.log(origin)
            cy.get("[data-test='PlacePickerInputPlace']:first").invoke("text").should("eql", origin)
    })
    
})
})
