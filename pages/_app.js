import React from 'react'
import Head from 'next/head';
import App, { Container } from 'next/app'
import { Provider } from "react-redux";
import withRedux from 'next-redux-wrapper';
import initStore from 'Client/store';

class RootApp extends App {
  static async getInitialProps({ Component, ctx }) {

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      return {
        pageProps,
      };

  }

  render () {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
          <Head>
            <title>Next KeystoneJS</title>
          </Head>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(RootApp);
