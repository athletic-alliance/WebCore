import React, { useEffect, useState } from "react";
import { authProvider } from "../providers/auth.provider";
import { AUTHTOKENKEY, REFRESHTOKENKEY } from "../constants";

import jwtDecode, { JwtPayload } from "jwt-decode";

import { AxiosResponse } from "axios";
import { AuthResponse } from "../dtos/auth-response.dto";
import { Credentials } from "../dtos/credential.dto";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (credentials: Credentials) => Promise<any>;
  signOut: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [token, setToken] = useState<any>(null!);
  const [authenticationPending, setAuthenticationPending] =
    useState<boolean>(true);

  let signIn = (credentials: Credentials) => {
    return authProvider
      .signIn(credentials)
      .then((result: AxiosResponse<AuthResponse>) => {
        setIsAuthenticated(true);
        localStorage.setItem(AUTHTOKENKEY, result.data.accessToken);
        localStorage.setItem(REFRESHTOKENKEY, result.data.refreshToken);
        return Promise.resolve(result.data.accessToken);
      })
      .catch((_) => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTHTOKENKEY);
        localStorage.removeItem(REFRESHTOKENKEY);
        return Promise.reject(null);
      });
  };

  let signOut = (callback: VoidFunction) => {
    return authProvider.signOut(() => {
      setIsAuthenticated(false);
      localStorage.removeItem(AUTHTOKENKEY);
      localStorage.removeItem(REFRESHTOKENKEY);
      callback();
    });
  };

  useEffect(() => {
    // eslint-disable-next-line require-jsdoc
    async function checkToken() {
      await asyncLocalStorage
        .getItem(AUTHTOKENKEY)
        .then((token: string | null) => {
          try {
            const decoded = jwtDecode<JwtPayload>(token!!);
            setToken(decoded);
            const currentTime = Date.now();
            const expiryDate = decoded.exp;

            if (expiryDate!! >= currentTime) {
              setToken(null);
              setIsAuthenticated(false);
            } else {
              setIsAuthenticated(true);
            }
          } catch {
            setToken(null);
            setIsAuthenticated(false);
          }
          setAuthenticationPending(false);
        })
        .catch((err) => {
          setAuthenticationPending(false);
        });
    }

    checkToken();
  }, []);

  const value = {
    token,
    signIn,
    signOut,
    authenticationPending,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const asyncLocalStorage = {
  setItem: function (key: string, value: string) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key: string) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
};
