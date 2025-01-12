import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import Head from "next/head";
import React from "react";

import Layout from "components/common/Layout";
import ContextProvider from "lib/context";
import "styles.css";

import Zipy from "zipyai";

if (typeof window !== "undefined") {
  require("lazysizes/plugins/attrchange/ls.attrchange.js");
  require("lazysizes/plugins/respimg/ls.respimg.js");
  require("lazysizes");
  Zipy.init("53b5694b", {releaseVer: "Conduit v13.1"});
}

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    </Head>
    <CacheProvider value={cache}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </CacheProvider>
  </>
);

export default MyApp;
