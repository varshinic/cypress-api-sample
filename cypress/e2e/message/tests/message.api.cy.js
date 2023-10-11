import { MessageService } from "../consumer";
import { CreateMessage } from "../actions";

describe("Message Service", function () {
  beforeEach(function () {
    cy.fixture("message.json").as("userData");
  });

  it("Get All Messages", function () {
    MessageService()
      .GetMessages()
      .then((response) => {
        cy.wrap(response).its("status").should("be.equal", 200);
      });
  });

  it("Create a message", function () {
    CreateMessage(
      this.userData.source,
      this.userData.destination,
      this.userData.message
    ).then((response) =>
      cy.wrap(response).its("status").should("be.equal", 200)
    );
  });

  it("Get a message by id", function () {
    CreateMessage(
      this.userData.source,
      this.userData.destination,
      this.userData.message
    ).then((response) => {
      cy.wrap(response).its("status").should("be.equal", 200);
      MessageService()
        .GetMessageById(response.body.id)
        .then((response) =>
          cy.wrap(response).its("status").should("be.equal", 200)
        );
    });
  });

  it("Get all the messages sent between two users", function () {
    CreateMessage(
      this.userData.source,
      this.userData.destination,
      this.userData.message
    ).then((response) => {
      cy.wrap(response).its("status").should("be.equal", 200);
      MessageService()
        .GetMessagesBetweenUsers(response.body.from.id, response.body.to.id)
        .then((response) =>
          cy.wrap(response).its("status").should("be.equal", 200)
        );
    });
  });

  it("Delete a message", function () {
    CreateMessage(
      this.userData.source,
      this.userData.destination,
      this.userData.message
    ).then((response) => {
      cy.wrap(response).its("status").should("be.equal", 200);
      MessageService()
        .DeleteMessage(response.body.id)
        .then((response) =>
          cy.wrap(response).its("status").should("be.equal", 204)
        );
    });
  });
});
