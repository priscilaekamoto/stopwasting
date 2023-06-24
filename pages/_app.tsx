import "../styles/globals.css";
import "../components/pagination.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "components/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>;
}

export default MyApp;
