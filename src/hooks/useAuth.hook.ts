import { useContext } from 'react'
import { AuthContext, AuthContextType } from '../context/auth.context'

export const useAuth = (): AuthContextType => useContext(AuthContext)
