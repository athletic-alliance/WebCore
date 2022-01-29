import React, {useState} from 'react'
import {LoginForm} from './components/LoginFormComponent';
import {Credentials} from '../../dtos/credential.dto';
import {useAuth} from '../../hooks/useAuth.hook';
import {useNavigate} from 'react-router';

export const LoginView = () => {
    const navigate = useNavigate();

    const {signIn} = useAuth();

    const [hasError, setHasError] = useState<boolean>(false);

    const handleLogin = (credentials: Credentials) => {
        setHasError(false);
        signIn(credentials)
            .then((res) => {
                navigate('/dashboard')
            })
            .catch(() => setHasError(true))
    };

    return (<div className="mt-48 max-w-3xl mx-auto ">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-400 uppercase">Anmelden</h3>
            </div>
            <div className="border-t border-gray-200 p-6">
                <LoginForm formSubmitted={(e: any) => handleLogin(e)}/>
            </div>
            <div>

            </div>
        </div>
        {hasError &&
          <div
            className="border border-red-400 bg-red-200 mt-5 rounded-sm px-4 py-2 text-sm w-full text-center text-gray-700">
            Benutzername oder Password falsch
          </div>
        }
    </div>)
}
