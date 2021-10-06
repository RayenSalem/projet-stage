import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Renae.pk" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          ></link>
          <link rel="stylesheet" href="path/to/materialize.css"></link>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>
          <script
            src="https://kit.fontawesome.com/yourcode.js"
            crossorigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
    MyDocument.getInitialProps = async (ctx) => {
      // Resolution order
      //
      // On the server:
      // 1. app.getInitialProps
      // 2. page.getInitialProps
      // 3. document.getInitialProps
      // 4. app.render
      // 5. page.render
      // 6. document.render
      //
      // On the server with error:
      // 1. document.getInitialProps
      // 2. app.render
      // 3. page.render
      // 4. document.render
      //
      // On the client
      // 1. app.getInitialProps
      // 2. page.getInitialProps
      // 3. app.render
      // 4. page.render

      // Render app and page and get the context of the page with collected side effects.
      const sheets = new ServerStyleSheets();
      const originalRenderPage = ctx.renderPage;

      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheets.getStyleElement(),
        ],
      };
    };
  }
}

export default MyDocument;
