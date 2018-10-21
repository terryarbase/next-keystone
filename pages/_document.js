import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8" />
          <title>Next KeystoneJS</title>
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