import "../styles/globals.css";

import { AuthProvider } from "../components/Auth";

function Shuriken({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default Shuriken;
