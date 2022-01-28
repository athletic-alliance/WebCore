import {Credentials} from '../dtos/credential.dto';
import instance from './api.service';

export const authenticate = (credentials: Credentials) => {
    return instance.post('/Auth', { username: credentials.username, password: credentials.password });
}
