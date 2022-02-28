import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Shipyard Tuition</title>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
