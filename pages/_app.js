import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.querySelector("body").classList.add("dark:bg-slate-900");
  });
  return <Component {...pageProps} />;
}

export default MyApp;
