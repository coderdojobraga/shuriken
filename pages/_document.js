import Document, { Html, Main, NextScript } from "next/document";

class ShurikenDocument extends Document {
  render() {
    return (
      <Html lang="pt-pt">
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ShurikenDocument;
