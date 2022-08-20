import { notification } from "antd";

export function notifyError(error) {
  //This print is intentional and not a debug print
  console.log(error);

  notification.error({
    message: "Ocorreu um erro",
    description:
      "Tente novamente mais tarde. Se o problema persistir, contacte development@coderdojobraga.org",
    duration: 7,
  });
}
