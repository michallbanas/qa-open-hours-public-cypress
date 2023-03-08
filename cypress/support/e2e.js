import "./commands";

beforeEach(() => {
  cy.log("support/index beforeEach");
  cy.setCookieConsent();
  window.localStorage.setItem("subscriptionFormSeen", "1");
  window.localStorage.setItem("dealsSubscriptionFormSeen", "1");
  window.localStorage.setItem("bookingcom_extension_default", "false");
});

Cypress.Commands.add("setCookieConsent", () => {
  cy.setCookie("__kwc_agreed", "true");
  cy.setCookie(
    "__kwc_settings",
    "{%22analytics%22:true%2C%22marketing%22:true}"
  );
});

// eslint-disable-next-line no-unused-vars
Cypress.on("uncaught:exception", (err, runnable) => false);

if (Cypress.env("hideXHRInCommandLog")) {
  const app = window.top;

  if (
    app &&
    !app.document.head.querySelector("[data-hide-command-log-request]")
  ) {
    const style = app.document.createElement("style");
    style.innerHTML =
      ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");

    app.document.head.appendChild(style);
  }
}
