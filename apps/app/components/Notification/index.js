import { notification } from "antd";

export function notifyInfo(message, description) {
  notification.info({
    message: message,
    description: description,
    duration: 5,
  });
}

export function notifyError(message, description) {
  notification.error({
    message: message,
    description: description,
    duration: 5,
  });
}
