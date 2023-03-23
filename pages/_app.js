import GlobalStyle from "../styles";
import Head from "next/head";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [userName, setUserName] = useState("");

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component userName={userName} setUserName={setUserName} {...pageProps} />
    </>
  );
}
