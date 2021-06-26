import Head from "next/head";
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Quiz app</title>
        <link rel="shortcut icon" href="../ic-icon.svg" type="image/x-icon" />
        <meta name="author" content="Enggar Dwi Prihastomo" />
        <meta name="description" content="Quiz app" />
        <meta name="keywords" content="Quiz app, React, Node.js" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
