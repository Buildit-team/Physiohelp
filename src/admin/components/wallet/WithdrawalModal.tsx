import React from 'react';

interface WithdrawalModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableBalance: number;
    amount: string;
    setWithdrawAmount: (value: string) => void;
    withdrawalMethod: string;
    setWithdrawalMethod: (value: string) => void;
    onWithdraw: () => void;
    isLoading: boolean;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
    isOpen,
    onClose,
    availableBalance,
    amount,
    setWithdrawAmount,
    onWithdraw,
    isLoading
}) => {
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Available Balance
                    </label>
                    <div className="text-2xl font-bold text-gray-900">
                        ₦{availableBalance}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Withdrawal Amount
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            ₦
                        </span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="0.00"
                            className="pl-8 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                            max={availableBalance}
                        />
                    </div>
                    {parseFloat(amount) > availableBalance && (
                        <p className="text-red-500 text-sm mt-1">
                            Amount exceeds available balance
                        </p>
                    )}
                </div>


                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onWithdraw}
                        disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance || isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Withdraw"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalModal;