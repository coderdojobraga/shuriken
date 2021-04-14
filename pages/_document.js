import Document, { Html, Head, Main, NextScript } from "next/document";

class ShurikenDocument extends Document {
  render() {
    return (
      <Html lang="pt-pt">
        <Head>
          <title>CoderDojo Braga</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ShurikenDocument;
