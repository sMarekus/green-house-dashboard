import React, { useState } from 'react';
import Logo from '../../assets/logo/logo.svg';

/* PrimeReact Components */ 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

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
        <div className="flex items-center justify-center min-h-screen bg-white font-pt_sans px-5 lg:px-10">
            <div className="w-full max-w-sm p-8 bg-gray-50 rounded-lg">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col items-center justify-center">
                        <img src={Logo} alt="Logo" className="mb-4" />
                        <h2 className="text-4xl font-bold mb-1 font-pt_sans_arrow text-secondary">Login</h2>
                    </div>
                    <InputText 
                        className="w-full focus:shadow-none font-pt_sans"
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                </form>
            </div>
        </div>
    );
};

export default Login;
