import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProvideAuth } from "../lib/hooks/useAuth";
import { theme } from "../theme";

import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "../components/elements/DatePicker/date-picker.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </ProvideAuth>
  );
}

export default MyApp;
