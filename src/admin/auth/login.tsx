import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { LoginUser } from '../services/api-service';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { mutate, isLoading, isError, error } = useMutation(LoginUser, {
        onSuccess: (data) => {
            console.log('Login successful', data);
            toast.success('Login successful');
            navigate('/admin/verify');
        },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        mutate({ email, password });
        localStorage.setItem("email", email);
    };

    return (
        <div className='h-screen flex justify-center'>
            <div className="w-[60%] h-full flex flex-col items-center max-[650px]:w-full">
                <div className='w-full'>
                    <img src="/sitelogo.svg" alt="" />
                </div>
                <h2 className="w-[75%] text-2xl font-bold mb-6 max-[650px]:text-[16px] max-[650px]:text-center">Welcome back to PhysioHelp</h2>
                {isError && (
                    <div className="text-red-500 mb-4 text-center">
                        {error instanceof AxiosError ? error?.response?.data?.message : 'An error occurred during login'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-[80%] gap-[20px] p-[20px] flex flex-col justify-center max-[650px]:w-full">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 border rounded-lg outline-none"
                            required
                            placeholder='johndoe@gmail.com'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-3 border rounded-lg outline-none"
                                required
                                placeholder='********'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-2"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[40%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center">
                    Don't have an account?{' '}
                    <b onClick={() => navigate('/admin/signup')} className="text-blue-500">Signup</b>
                </p>
            </div>
            <div className="w-[40%] max-[650px]:hidden">
                <div
                    className="h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/helping2.png")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>
        </div>
    );
};

export default Login;