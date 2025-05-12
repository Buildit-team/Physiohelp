import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { confirmWithdrawFunds } from '../../services/api-service';
import { useNavigate } from 'react-router-dom';

const CompleteWithdrawal = () => {
    const navigate = useNavigate()
    const getParamsFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        let token = params.get('token');

        if (!token) {
            const search = window.location.search;
            const match = search.match(/token(\d+)/);
            if (match) {
                token = match[1];
            }
        }
        return { email, token };
    };


    const { email, token } = getParamsFromUrl();

    const mutation = useMutation({
        mutationFn: confirmWithdrawFunds,
        onSuccess: () => {
            alert('Withdrawal confirmed successfully!');
        },
        onError: (error) => {
            console.error('Error confirming withdrawal:', error);
        }
    });

    useEffect(() => {
        if (email && token) {
            mutation.mutate({ email: email!, token: token! });
        }
    }, [email, token]);


    const handleReturnToDashboard = () => {
        navigate('/admin/wallet')
    };

    const handleRetry = () => {
        mutation.mutate({ email: email!, token: token! });
    };

    return (
        <div className=" w-full  flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 p-6 text-white">
                    <h1 className="text-2xl font-bold text-center">Withdrawal Confirmation</h1>
                </div>

                <div className="p-6">
                    {mutation.isError && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <AlertCircle className="text-red-600 h-12 w-12 mb-4" />
                            <h2 className="text-xl font-semibold text-red-600 mb-2">Withdrawal Failed</h2>
                            <p className="text-gray-600 text-center mb-4">
                                We encountered an error while processing your withdrawal request.
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
                            </p>
                            <button
                                onClick={handleRetry}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {
                        mutation.isLoading && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <p className="text-lg font-semibold text-gray-600 mb-2">Processing your withdrawal...</p>
                                <p className="text-sm text-gray-500">Please wait a moment.</p>
                            </div>
                        )
                    }

                    {mutation.isSuccess && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <CheckCircle className="text-green-600 h-12 w-12 mb-4" />
                            <h2 className="text-xl font-semibold text-green-600 mb-2">Withdrawal Confirmed!</h2>
                            <p className="text-gray-600 text-center mb-6">
                                Funds will be transferred to your registered account shortly.
                            </p>
                            <button
                                onClick={handleReturnToDashboard}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t">
                    <p className="text-xs text-gray-500 text-center">
                        Transaction ID: {token}
                        <br />
                        Email: {email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompleteWithdrawal;