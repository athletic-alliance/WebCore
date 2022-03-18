import { Credentials } from '../dtos/credential.dto'
import { authenticate } from '../services/auth.service'

const authProvider = {
    isAuthenticated: false,

    signIn(credentials: Credentials) {
        authProvider.isAuthenticated = true
        return authenticate(credentials)
    },

    signOut(callback: VoidFunction) {
        authProvider.isAuthenticated = false
        setTimeout(callback, 100)
    },
}

export { authProvider }
