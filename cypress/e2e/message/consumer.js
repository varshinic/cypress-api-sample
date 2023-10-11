const routes = {
  apiMessages: "api/messages",
};

export const MessageService = () => {
  return {
    GetMessageById: (messageId) =>
      cy.request({ method: "get", url: `${routes.apiMessages}/${messageId}` }),
    GetMessages: () => cy.request({ method: "get", url: routes.apiMessages }),
    PostMessage: (body) =>
      cy.request({ method: "post", url: routes.apiMessages, body }),
    GetMessagesBetweenUsers: (from, to) =>
      cy.request({
        method: "get",
        url: `${routes.apiMessages}?from=${from}&to=${to}`,
      }),
    DeleteMessage: (messageId) =>
      cy.request({
        method: "delete",
        url: `${routes.apiMessages}/${messageId}`,
      }),
  };
};
