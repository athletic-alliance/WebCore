import instance from '../services/api.service';
import {AUTHTOKENKEY} from '../constants';
import jwtDecode from 'jwt-decode';

export const fetchUserPlan = async (): Promise<any> => {
    const jwt = localStorage.getItem(AUTHTOKENKEY) as string;
    const decodedToken = jwtDecode(jwt) as any;
    const response = await instance.get<any>(`/plan/user/${decodedToken.userid}`);
    return response.data;
};
