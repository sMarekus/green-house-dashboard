import React, { useState } from 'react';
import Logo from '../../assets/logo/logo.svg';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Placeholder for login logic, e.g., API calls
        console.log('Logging in with:', email, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white font-pt_sans">
            <div className="w-full max-w-sm p-8 bg-gray-50 shadow-md rounded-lg">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src={Logo} alt="Logo" className="mb-4" />
                        <h2 className="text-4xl font-bold mb-1 font-pt_sans_arrow">Login</h2>
                    </div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-primary rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
