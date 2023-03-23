import GlobalStyle from "../styles";
import Head from "next/head";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [userName, setUserName] = useLocalStorageState("fitnessAppUserName", {
    defalutValue: "",
  });

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
