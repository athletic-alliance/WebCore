import React, { useEffect, useMemo, useState } from 'react'

import jwtDecode, { JwtPayload } from 'jwt-decode'

import { AxiosResponse } from 'axios'
import { AuthResponse } from '../dtos/auth-response.dto'
import { Credentials } from '../dtos/credential.dto'
import { authProvider } from '../providers/auth.provider'
import { AUTHTOKENKEY, REFRESHTOKENKEY } from '../constants'
import { asyncLocalStorage } from '../services/async-local-storage'

export interface AuthContextType {
    isAuthenticated: boolean
    signIn: (credentials: Credentials) => Promise<string>
    signOut: (callback: VoidFunction) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!)

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode
}): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
    const [token, setToken] = useState<JwtPayload>(null!)
    const [authenticationPending, setAuthenticationPending] =
        useState<boolean>(true)

    const signIn = (credentials: Credentials): Promise<string> => {
        return authProvider
            .signIn(credentials)
            .then((result: AxiosResponse<AuthResponse>) => {
                setIsAuthenticated(true)
                localStorage.setItem(AUTHTOKENKEY, result.data.accessToken)
                localStorage.setItem(REFRESHTOKENKEY, result.data.refreshToken)
                return Promise.resolve(result.data.accessToken)
            })
            .catch(() => {
                setIsAuthenticated(false)
                localStorage.removeItem(AUTHTOKENKEY)
                localStorage.removeItem(REFRESHTOKENKEY)
                return Promise.reject(new Error('Authentication failed'))
            })
    }

    const signOut = (callback: VoidFunction): void => {
        return authProvider.signOut(() => {
            setIsAuthenticated(false)
            localStorage.removeItem(AUTHTOKENKEY)
            localStorage.removeItem(REFRESHTOKENKEY)
            callback()
        })
    }

    useEffect(() => {
        // eslint-disable-next-line require-jsdoc
        async function checkToken(): Promise<void> {
            await asyncLocalStorage
                .getItem(AUTHTOKENKEY)
                .then((jwtToken: string | null) => {
                    try {
                        const decoded = jwtDecode<JwtPayload>(jwtToken!)
                        setToken(decoded)
                        const currentTime = Date.now()
                        const expiryDate = decoded.exp

                        if (expiryDate! >= currentTime) {
                            setIsAuthenticated(false)
                        } else {
                            setIsAuthenticated(true)
                        }
                    } catch {
                        setIsAuthenticated(false)
                    }
                    setAuthenticationPending(false)
                })
                .catch(() => {
                    setAuthenticationPending(false)
                })
        }

        checkToken()
    }, [])

    const value = useMemo(
        () => ({
            token,
            signIn,
            signOut,
            authenticationPending,
            isAuthenticated,
        }),
        [authenticationPending, isAuthenticated, token]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
