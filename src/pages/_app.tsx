import "@/styles/globals.css";
import "@fontsource-variable/dm-sans";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
