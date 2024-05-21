import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* API */
import { login } from '../../api/auth';

/* Logo */ 
import Logo from '../../assets/logo/logo.svg';

/* PrimeReact Components */ 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import './Login.sass'

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const token = await login(username, password);
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white font-pt_sans px-5 lg:px-10">
            <div className="w-full max-w-sm p-8 bg-gray-50 rounded-lg">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src={Logo} alt="Logo" className="mb-4" />
                        <h2 className="text-4xl font-bold mb-1 font-pt_sans_arrow text-secondary header">Login</h2>
                    </div>
                    <InputText 
                        className="w-full focus:shadow-none font-pt_sans"
                        id="username"
                        name="username"
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Password 
                        className="w-full"
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        toggleMask
                        pt={{
                            input: { className: 'w-full pr-3 focus:shadow-none font-pt_sans' },
                            hideIcon: { className: 'right-3' },
                            showIcon: { className: 'right-3' },
                            panel: { className: 'hidden' }
                        }}
                    />
                    <Button 
                        className="w-full bg-primary hover:border-primary focus:shadow-none font-pt_sans"
                        type="submit" 
                        label="Log in" 
                    />
                    {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
