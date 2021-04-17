import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import "tailwindcss/tailwind.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
