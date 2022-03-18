import { AxiosResponse } from 'axios'
import { Credentials } from '../dtos/credential.dto'
import instance from './api.service'

export const authenticate = (
    credentials: Credentials
): Promise<AxiosResponse> => {
    return instance.post('/Auth', {
        email: credentials.email,
        password: credentials.password,
    })
}
