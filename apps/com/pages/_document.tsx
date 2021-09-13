import React, { ReactElement } from 'react';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

export default class CustomDocument extends Document<{
  styleTags: ReactElement[];
}> {
  static async getInitialProps(ctx) {
    const muiSheets = new ServerStyleSheets();
    const scSheets = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            muiSheets.collect(scSheets.collectStyles(<App {...props} />)),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          muiSheets.getStyleElement(),
          ...scSheets.getStyleElement(),
        ],
      };
    } finally {
      scSheets.seal();
    }
  }
}
