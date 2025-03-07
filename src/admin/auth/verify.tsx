import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/api-service';
import { AxiosError } from 'axios';

const VerifyEmail: React.FC = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const { mutate, isLoading, isError, error } = useMutation(verifyEmail, {
        onSuccess: (data) => {
            console.log('Verification successful', data);
            localStorage.setItem('token', data.data);
            localStorage.removeItem('email');
            navigate('/admin');
        },
        onError: (error: any) => {
            if (error?.response?.data?.message === "Code expired please request to login again") {
                setTimeout(()=> {
                    navigate('/admin/login');
                }, 3000)
            }
        }
    });

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        
        const numericCode = pastedText.replace(/\D/g, '');
        
        const newCode = numericCode.slice(0, 6).split('').map(digit => digit || '');
        
        while (newCode.length < 6) {
            newCode.push('');
        }

        setVerificationCode(newCode);
        const lastFilledIndex = newCode.length - 1 - newCode.slice().reverse().findIndex(digit => digit !== '');
        if (lastFilledIndex !== -1 && lastFilledIndex < 3) {
            inputRefs[lastFilledIndex + 1].current?.focus();
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const code = verificationCode.join('');
        mutate({
            secret: code,
            email: localStorage.getItem('email') || ''
        });
    };

    return (
        <div className="h-screen w-full flex items-center  flex-col bg-gray-50">
            <div className='w-full p-6 max-[650px]:p-2'>
                <img
                    src="/sitelogo.svg"
                    alt="Logo"
                    className="h-12 mb-6"
                />
            </div>
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Verify Your Email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We have sent a 6-digit code to the email address you provided.
                        Please enter it below to verify your account.
                    </p>
                </div>
                {isError && (
                    <div className="text-red-500 text-center mb-4">
                        {error instanceof AxiosError ? error?.response?.data?.message : 'An error occurred during verification'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="flex justify-center space-x-4">
                        {verificationCode.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                pattern="\d*"
                                ref={inputRefs[index]}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-16 h-16 max-[650px]:w-10 max-[650px]:h-10 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    <div className='w-full flex items-center justify-center'>
                        <button
                            type="submit"
                            disabled={isLoading || verificationCode.some(digit => !digit)}
                            className="w-[90%] flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verifying...' : 'Log in to the dashboard'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Didn't receive the code?{' '}
                        <button
                            onClick={() => {/* Implement resend logic */ }}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Resend code
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;