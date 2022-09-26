import { API } from "../api";

export async function sign_up({ email, password, role }: any) {
  const response = await API.post("/api/auth/sign_up", {
    email,
    password,
    role,
  });

  return response.data;
}

export async function requestToken({ email }: any) {
  const response = await API.post("/api/auth/reset_password", {
    user: {
      email: email,
    },
  });

  return response.data;
}

export async function resetPassword({ token, password }: any) {
  const response = await API.put(`/api/auth/reset_password/${token}`, {
    user: {
      password: password,
    },
  });

  return response.data;
}

export async function login({ email, password }: any) {
  const response = await API.post("/api/auth/sign_in", { email, password });

  return response.data;
}

export async function logout() {
  const response = await API.delete("/api/auth/sign_out");

  return response.data;
}

export async function getCurrentUser() {
  const response = await API.get("/api/auth/me");

  return response.data;
}

export async function editUser(values: any) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    switch (key) {
      case "user[photo]":
        data.append(key, values[key].file);
        break;

      case "user[birthday]":
        data.append(key, values[key].format("YYYY-MM-DD"));
        break;

      default:
        data.append(key, values[key]);
        break;
    }
  }

  const response = await API.put("/api/auth/me", data, {
    headers: undefined,
  });

  return response.data;
}

export async function verify_email(token: any) {
  const response = await API.post("/api/auth/verify", { token: token });

  return response.data;
}

export async function resend_confirmation_email() {
  const response = await API.post("/api/auth/resend");

  return response.status;
}

export async function registerUser(values: any) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    switch (key) {
      case "user[photo]":
        data.append(key, values[key].file);
        break;

      case "user[birthday]":
        data.append(key, values[key].format("YYYY-MM-DD"));
        break;

      case "user[socials]":
        for (const social of values[key]) {
          data.append(`${key}[${social.name}][name]`, social.name);
          data.append(`${key}[${social.name}][username]`, social.username);
        }
        break;

      default:
        data.append(key, values[key]);
        break;
    }
  }

  const response = await API.post("/api/auth/me", data, { headers: undefined });

  return response.data;
}
