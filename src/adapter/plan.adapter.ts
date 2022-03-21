import jwtDecode from 'jwt-decode'
import instance from '../services/api.service'
import { AUTHTOKENKEY } from '../constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUserPlan = async (): Promise<any> => {
    const jwt = localStorage.getItem(AUTHTOKENKEY) as string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken = jwtDecode(jwt) as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await instance.get<any>(
        `/plan/user/${decodedToken.userid}`
    )
    return response.data
}
