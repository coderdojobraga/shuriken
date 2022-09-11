import { notification } from "antd";

export function notifyInfo(message, description) {
  notification.info({
    message: message,
    description: description,
    duration: 5,
  });
}
