import {
  Box,
  CircularProgress,
  Flex,
  OrderedList,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "components/SignIn";

import { createContext, useContext } from "react";
import { getAuth, User } from "firebase/auth";
import Firebase from "./firebase";

interface AuthContext {
  authUser: User | null;
  loading: boolean;
}

type SetAuthContext = Dispatch<SetStateAction<AuthContext>>;

const defaultVal = {
  authUser: null,
  loading: true,
  setCtx: (_: {}) => {},
} as AuthContext & { setCtx: SetAuthContext };
const authUserContext = createContext(defaultVal);

export function AuthUserProvider({ children }) {
  const [ctxVal, setCtx] = useState(defaultVal);
  const [user, loading, error] = useAuthState(getAuth(Firebase.getApp()));
  useEffect(() => {
    setCtx((old) => ({ ...old, setCtx }));
  }, []);
  useEffect(() => {
    if (!loading) {
      setCtx((old) => ({ ...old, authUser: user, loading: loading }));
    }
  }, [loading, user]);
  return (
    <authUserContext.Provider value={ctxVal}>
      {children}
    </authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);

export default function withAuth(
  Component: React.ComponentType<{}>,
  needsAuth: boolean = false
): React.ComponentType<{}> {
  const WithAuth = () => {
    const { authUser, loading } = useAuth();
    return (
      <Flex flexDirection="column" overflow="none" height="100%">
        {loading ? (
          <CircularProgress isIndeterminate color="blue.300" />
        ) : (
          <Box position="relative" width="100%" height="100%">
            {authUser === null && (
              <Box position="absolute" width="100%" height="100%" zIndex={10}>
                <SignIn />
              </Box>
            )}
            {(authUser !== null || !needsAuth) && <Component />}
          </Box>
        )}
      </Flex>
    );
  };
  return WithAuth;
}
