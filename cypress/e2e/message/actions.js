import { MessageService } from "./consumer";

export const CreateMessage = (from, to, message) => {
  var body = {
    from: {
      id: from,
    },
    to: {
      id: to,
    },
    message: message,
  };
  return MessageService().PostMessage(body);
};
