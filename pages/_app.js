import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from "react-redux";
import withRedux from 'next-redux-wrapper';
import initStore from '../client/store';

class RootApp extends App {
  static async getInitialProps({Component, ctx}) {

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      return {
        pageProps,
      };

  }

  render () {
    const {Component, pageProps, store} = this.props;
      return (
        <Container>
            <Provider store={store}>
                <Component {...pageProps} />
          </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(RootApp);
