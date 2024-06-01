import ContextProvider from "@/context/ContextProvider";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ContextProvider>
      <Component {...pageProps} key={router.asPath} />
    </ContextProvider>
  );
}
