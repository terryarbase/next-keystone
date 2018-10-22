import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="keywords" content="nextjs,keystonejs,fourdirection" />
          <meta name="description" content="The NextJS framework and The KeystoneJS framwork Integration." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}