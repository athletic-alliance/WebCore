import React, {useState} from 'react';
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
                navigate('/dashboard');
            })
            .catch(() => setHasError(true));
    };

    return (
        <div className="mx-auto mt-48 max-w-3xl ">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg px-12 py-12">
                <div className={'w-full text-center'}>
                    <h1 className={'text-3xl font-light mb-8'}>
                        <div>ATHLETIC</div>
                        <div>ALLIANCE</div>
                    </h1>
                </div>
                <LoginForm formSubmitted={(e: any) => handleLogin(e)}/>
            </div>
            {hasError && (
                <div
                    className="mt-5 w-full rounded-sm border border-red-400 bg-red-200 px-4 py-2 text-center text-gray-700 text-sm">
                    Benutzername oder Password falsch
                </div>
            )}
        </div>
    );
};
