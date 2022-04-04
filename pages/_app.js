import { useEffect } from "react";
import "../styles/globals.css";

import { FirebaseProvider } from "hooks/useFirebase";
import firebaseConfig from "config/firebase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.querySelector("body").classList.add("dark:bg-slate-900");
  });
  return (
    <FirebaseProvider config={firebaseConfig}>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
