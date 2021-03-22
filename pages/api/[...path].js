import Cookies from "cookies";
import httpProxy from "http-proxy";
import jwt_decode from "jwt-decode";
import url from "url";

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxyServer({ secure: false });

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  // Return a Promise to let Next.js know when we're done
  // processing the request:
  return new Promise((resolve, reject) => {
    // In case the current API request is for logging in,
    // we'll need to intercept the API response.
    // More on that in a bit.
    const pathname = url.parse(req.url).pathname;
    const isLogin =
      pathname === "/api/auth/sign_in" || pathname === "/api/auth/sign_up";

    const cookies = new Cookies(req, res);

    if (pathname === "/api/auth/logout") {
      // Delete the cookie by not setting a value
      cookies.set("jwt");
      res.redirect("/");
      resolve();
    }

    // Get the `token` cookie:
    const token = cookies.get("jwt");

    // Don't forward cookies to the API:
    req.headers.cookie = "";

    // Set token header from cookie:
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }

    proxy
      .once("proxyRes", (proxyRes, req, res) => {
        // In case the request is for login, we need to
        // intercept the API's response. It contains the
        // auth token that we want to strip out and set
        // as an HTTP-only cookie.
        if (isLogin) {
          let response = "";
          proxyRes.on("data", (chunk) => {
            response += chunk;
          });

          proxyRes.on("end", () => {
            if (proxyRes.statusCode >= 300) {
              res.status(proxyRes.statusCode).json(response);
              resolve();
            }

            try {
              const { jwt } = JSON.parse(response);
              const { exp, sub, role, active } = jwt_decode(jwt);

              const cookies = new Cookies(req, res);

              cookies.set("jwt", jwt, {
                httpOnly: true,
                expires: new Date(exp * 1000),
                sameSite: "lax", // CSRF protection
              });

              res.status(200).json({
                isAuthenticated: true,
                id: sub,
                role: role,
                active: active,
              });
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        } else {
          resolve();
        }
      })
      .once("error", reject)
      .web(req, res, {
        target: API_URL,
        selfHandleResponse: isLogin,
      });
  });
};
