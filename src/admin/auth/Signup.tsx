import React, { useState, useCallback, useMemo } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { CreateAccount } from '../services/api-service';
import toast from 'react-hot-toast';

const validatePassword = (password: string) => ({
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumber: /\d/.test(password),
});

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptUpdates, setAcceptUpdates] = useState(false);

    const passwordValidation = useMemo(() => validatePassword(password), [password]);

    const { mutate, isLoading, isError, error } = useMutation(CreateAccount, {
        onSuccess: () => {
            navigate('/admin/login');
            toast.success('Account created successfully');
        },
        onError: (error: any) => {
            toast.error('Signup failed. Please try again.');
            console.error('Signup failed', error);
        },
    });

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            mutate({ email, name, password });
        },
        [email, name, password, mutate]
    );

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    return (
        <div className="h-screen flex justify-center">
            <div className="w-[60%] h-full flex flex-col items-center max-[650px]:w-full">
                <div className="w-full">
                    <img src="/sitelogo.svg" alt="Site Logo" loading="lazy" />
                </div>
                <h2 className="w-[75%] text-2xl font-bold mb-6">Create an account</h2>
                {isError && (
                    <div className="text-red-500 mb-4">
                        {error instanceof Error ? error.message : 'An error occurred during signup'}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="w-[80%] gap-[20px] p-[20px] flex flex-col justify-center max-[650px]:w-full"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 border rounded-lg outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-3 border rounded-lg outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-3 border rounded-lg outline-none"
                                required
                                aria-describedby="password-requirements"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 py-2"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <ul id="password-requirements" className="text-sm text-gray-600 mt-2 flex flex-wrap gap-4">
                            <li className={passwordValidation.hasMinLength ? 'text-green-500' : ''}>
                                Use 8 or more characters
                            </li>
                            <li className={passwordValidation.hasUppercase ? 'text-green-500' : ''}>
                                One uppercase character
                            </li>
                            <li className={passwordValidation.hasLowercase ? 'text-green-500' : ''}>
                                One lowercase character
                            </li>
                            <li className={passwordValidation.hasSpecialChar ? 'text-green-500' : ''}>
                                One special character
                            </li>
                            <li className={passwordValidation.hasNumber ? 'text-green-500' : ''}>
                                One number
                            </li>
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
                            <span className="text-sm">
                                I want to receive emails about feature updates, events, and promotions.
                            </span>
                        </label>
                    </div>
                    <div className="w-full flex justify-center">
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
                <p
                    className="text-sm text-center pb-[20px] cursor-pointer"
                    onClick={() => navigate('/admin/login')}
                >
                    Already have an account? <b className="text-blue-500">Log in</b>
                </p>
            </div>
            <div className="w-[40%] max-[650px]:hidden">
                <div
                    className="h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/helping2.png")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </div>
        </div>
    );
};

export default SignUp;