import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { fetchBanks, addBankDetails } from '../../services/api-service';
import { useQuery, useMutation } from 'react-query';

export type BankDetails = {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_code?: string;
};

type BankDetailsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (bankDetails: BankDetails) => void;
    currentBankDetails?: BankDetails | null;
};

export interface IAccountDetails {
    merchant_id: string;
    _id: string;
    status: boolean;
    message: string;
    withdrawal_status: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    details: {
        account_number: string;
        bank_code: string;
        account_name: string;
    }
}

const BankDetailsModal = ({
    isOpen,
    onClose,
    onSave,
    currentBankDetails
}: BankDetailsModalProps) => {
    const [bankDetails, setBankDetails] = useState({
        bank_name: '',
        account_number: '',
        account_name: '',
        bank_code: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    useEffect(() => {
        if (currentBankDetails) {
            setBankDetails({
                bank_name: currentBankDetails.bank_name || '',
                account_number: currentBankDetails.account_number || '',
                account_name: currentBankDetails.account_name || '',
                bank_code: currentBankDetails.bank_code || ''
            });
        }
    }, [currentBankDetails, isOpen]);

    const { data: banksData, isLoading: isBanksLoading } = useQuery('fetchBanks', fetchBanks);

    const mutation = useMutation(
        () => addBankDetails({
            bank_name: bankDetails.bank_name,
            account_number: bankDetails.account_number,
            account_name: bankDetails.account_name,
            bank_code: bankDetails.bank_code || ''
        }),
        {
            onSuccess: () => {
                onSave({
                    bank_name: bankDetails.bank_name,
                    account_number: bankDetails.account_number,
                    account_name: bankDetails.account_name,
                    bank_code: bankDetails.bank_code
                });

                setSuccess('Bank details saved successfully!');

                setTimeout(() => {
                    setSuccess('');
                    onClose();
                }, 2000);
            },
            onError: (err) => {
                console.error('Error saving bank details:', err);
                setError('Failed to save bank details. Please try again.');
            }
        }
    );

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');

        if (!bankDetails.bank_name.trim() || !bankDetails.account_name.trim() || !bankDetails.account_name.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        if (!/^\d{10,12}$/.test(bankDetails.account_number.trim())) {
            setError('Account number must be 10-12 digits');
            return;
        }

        mutation.mutate();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-medium">Bank Account Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {success}
                        </div>
                    )}

                    {isBanksLoading ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                            <span className="text-sm text-gray-500">Loading banks...</span>
                        </div>
                    ) : (
                        <select
                            value={bankDetails.bank_name}
                            onChange={(e) => {
                                const selectedBank = banksData?.data?.data?.find((bank: { name: string; }) => bank.name === e.target.value);
                                setBankDetails({
                                    ...bankDetails,
                                    bank_name: e.target.value,
                                    bank_code: selectedBank?.code || ''
                                });
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a bank</option>
                            {banksData?.data.data?.map((bank: { name: string, code: number }) => (
                                <option key={bank.code} value={bank.name}>
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Number *
                        </label>
                        <input
                            type="text"
                            value={bankDetails.account_number}
                            onChange={(e) => setBankDetails({ ...bankDetails, account_number: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter account number"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Name *
                        </label>
                        <input
                            type="text"
                            value={bankDetails.account_name ?? ''}
                            onChange={(e) => setBankDetails({ ...bankDetails, account_name: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter account name"
                            required
                        />
                    </div>


                    <div className="flex justify-end space-x-3 border-t pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                        >
                            {mutation.isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                'Save Bank Details'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BankDetailsModal;