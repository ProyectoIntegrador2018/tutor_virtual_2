import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ProvideAuth } from "../lib/hooks/useAuth";
import { theme } from "../theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
  );
}

export default MyApp;
