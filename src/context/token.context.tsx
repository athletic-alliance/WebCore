import { createContext } from 'react'

interface TokenContextType {
    roles: string[]
}

export const TokenContext = createContext<TokenContextType>({ roles: [] })
