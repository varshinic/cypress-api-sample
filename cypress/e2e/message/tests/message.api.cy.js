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
      cy
        .wrap(response)
        .its("status")
        .should("be.equal", 200)
        .wrap(response)
        .its("body.from.id")
        .should("be.equal", this.userData.source)
        .wrap(response)
        .its("body.to.id")
        .should("be.equal", this.userData.destination)
        .wrap(response)
        .its("body.message")
        .should("be.equal", this.userData.message)
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
          cy
            .wrap(response)
            .its("status")
            .should("be.equal", 200)
            .wrap(response)
            .its("body.from.id")
            .should("be.equal", this.userData.source)
            .wrap(response)
            .its("body.to.id")
            .should("be.equal", this.userData.destination)
            .wrap(response)
            .its("body.message")
            .should("be.equal", this.userData.message)
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
          cy
            .wrap(response)
            .its("status")
            .should("be.equal", 200)
            .wrap(response)
            .its("body[0].from.id")
            .should("be.equal", this.userData.source)
            .wrap(response)
            .its("body[0].to.id")
            .should("be.equal", this.userData.destination)
            .wrap(response)
            .its("body[0].message")
            .should("be.equal", this.userData.message)
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
