import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider, ThemeProvider } from "@coderdojobraga/ui";

import "~/styles/globals.css";

function Blog({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Head>
          <title>CoderDojo Braga</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Blog;
