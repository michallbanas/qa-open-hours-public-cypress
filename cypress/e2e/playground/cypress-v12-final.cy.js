Cypress.Commands.overwriteQuery("as", function (originalFn, ...originalArgs) {
   // Add the "static" type option to the query options
  const queryOptions = [...originalArgs, { type: "static" }];

  // Call the original .as() function with the modified query options
  const innerFn = originalFn.call(this, ...queryOptions);

  // Return a new function that calls the modified inner function with the subject
  return (subject) => {
    return innerFn(subject);
  };
}); 

describe("Playground - Cypress 12.7.0", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit("/?destination=venice-italy&override_geo_preset=PRAGUE");
  });

  it("should demonstrate the changes in behaviour of within(), aliases() and overwriting queries", () => {
    cy.get("[data-test='PlacePickerInputPlace']:first").should("have.text", "Prague")

    cy.get("[data-test*='SearchPlaceField']:first").within(() => {
      cy.get("[data-test='PlacePickerInputPlace']").invoke("text").as("origin");
    });

    cy.get("[data-test*='SearchPlaceField']:last").within(() => {
      cy.get("[data-test='PlacePickerInputPlace']")
        .invoke("text")
        .as("destination");
    });

    cy.get("[data-test='LandingSearchButton']").click();

    cy.get("[data-test='ResultCardWrapper']:first").should("be.visible");

    cy.get("@origin").then((origin) => {
      cy.get("[data-test='PlacePickerInputPlace']:first").should(
        "have.text",
        origin
      );
    });
  });
});
