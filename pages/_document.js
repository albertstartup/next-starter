// This custom Document component enables server side rendering of styled-components.
// styled-components step numbers are prefixed with `a`

import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // a1. Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // a2. Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // a3. Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // a4. Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>  
          {/* a5. Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}