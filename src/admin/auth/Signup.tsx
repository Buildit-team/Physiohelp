import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { CreateAccount } from '../services/api-service';
import toast from 'react-hot-toast';


const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptUpdates, setAcceptUpdates] = useState(false);

    // Use React Query mutation for signup
    const { mutate, isLoading, isError, error } = useMutation(CreateAccount, {
        onSuccess: () => {
            navigate('/admin/login');
            toast.success('Account created successfully');
        },
        onError: (error: any) => {
            console.error('Signup failed', error);
        }
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        mutate({ email, name, password });
    };

    return (
        <div className='h-screen flex justify-center '>
            <div className="w-[60%] h-full flex flex-col items-center max-[650px]:w-full">
                <div className='w-full'>
                    <img src="/sitelogo.svg" alt="" />
                </div>
                <h2 className="w-[75%] text-2xl font-bold  mb-6">Create an account</h2>
                {isError && (
                    <div className="text-red-500 mb-4">
                        {error instanceof Error ? error.message : 'An error occurred during signup'}
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
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-3 border rounded-lg outline-none"
                            required
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
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-2"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <ul className="text-sm text-gray-600 mt-2 flex flex-wrap gap-4">
                            <li>Use 8 or more characters</li>
                            <li>One uppercase character</li>
                            <li>One lowercase character</li>
                            <li>One special character</li>
                            <li>One number</li>
                        </ul>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={acceptUpdates}
                                onChange={(e) => setAcceptUpdates(e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm">I want to receive emails about feature updates, events, and promotions.</span>
                        </label>
                    </div>
                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[40%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 max-[650px]:w-[90%]"
                        >
                            {isLoading ? 'Creating Account...' : 'Create an account'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center mt-4">
                    By creating an account, you agree to the{' '}
                    <b className="text-blue-500">Terms of use</b> and{' '}
                    <b className="text-blue-500">Privacy Policy</b>.
                </p>
                <p className="text-sm text-center pb-[20px]" onClick={() => navigate('/admin/login')}>
                    Already have an account?{' '}
                    <b className="text-blue-500">Log in</b>
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

export default SignUp;