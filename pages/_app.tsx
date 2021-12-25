import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "lib/theme";
import { AuthUserProvider } from "lib/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
