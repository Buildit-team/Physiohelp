import { useState } from 'react';
import {
    ArrowDownCircle,
    Clock,
    CheckCircle,
    XCircle,
    Wallet as WalletIcon,
    // Bank
} from 'lucide-react';
import Table from '../../../utils/Table';
import { ColumnT } from '../../../interface/addProduct';
import { useMutation, useQuery } from 'react-query';
import { getAdminBalance, withdrawFunds } from '../../services/api-service';
import WithdrawalModal from './WithdrawalModal';
import BankDetailsModal, { BankDetails } from './BankDetailsModal';
import toast from 'react-hot-toast';
import { IErrorResponse } from '../../type/types';
import { useAdminContext } from '../../../context/adminContext';

const Wallet = () => {
    const { adminData } = useAdminContext();
    const isSuperAdmin = adminData?.roles === "super_admin";
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isBankDetailsModalOpen, setIsBankDetailsModalOpen] = useState(false);
    const [amount, setWithdrawAmount] = useState('');
    const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
    const [walletBalance, setWalletBalance] = useState(2547.63);
    const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);

    useQuery(['GETWALLETBALANCE'], getAdminBalance, {
        onSuccess: (balance) => {
            console.log(balance.available_balance)
            setWalletBalance(balance.available_balance)
        }
    })
    const availableBalance = walletBalance


    const { mutate: submitWithdrawal, isLoading: isWithdrawing } = useMutation(
        ['withdrawFunds'],
        withdrawFunds,
        {
            onSuccess: (response) => {
                console.log("Withdrawal successful:", response);
                toast.success("Withdrawal request submitted successfully.");
                setIsWithdrawModalOpen(false);
                setWithdrawAmount('');
            },
            onError: (error: IErrorResponse) => {
                console.error("Error processing withdrawal:", error);
                toast.error(error?.response?.data?.message);
            },
        }
    );
    const withdrawalHistory = [
        {
            id: 'WD-12345',
            amount: 250.00,
            date: '2025-04-20T14:32:00Z',
            status: 'completed',
            method: 'Bank Transfer',
            reference: 'REF123456'
        },
        {
            id: 'WD-12344',
            amount: 150.00,
            date: '2025-04-15T09:15:00Z',
            status: 'pending',
            method: 'PayPal',
            reference: 'REF123455'
        },
        {
            id: 'WD-12343',
            amount: 500.00,
            date: '2025-04-01T16:45:00Z',
            status: 'completed',
            method: 'Bank Transfer',
            reference: 'REF123454'
        },
        {
            id: 'WD-12342',
            amount: 180.00,
            date: '2025-03-28T11:20:00Z',
            status: 'failed',
            method: 'PayPal',
            reference: 'REF123453'
        },
        {
            id: 'WD-12341',
            amount: 320.00,
            date: '2025-03-15T15:10:00Z',
            status: 'completed',
            method: 'Bank Transfer',
            reference: 'REF123452'
        }
    ];

    const tableColumns: ColumnT<{ id: string; amount: number; date: string; status: string; method: string; reference: string; }>[] = [
        {
            key: 'id',
            header: 'Reference ID',
            sortable: true,
            searchable: true,
            render: (value: string) => (
                <span className="font-medium text-gray-900">{value}</span>
            )
        },
        {
            key: 'amount',
            header: 'Amount',
            sortable: true,
            searchable: true,
            render: (value: number) => (
                <span className="font-medium text-gray-900">${value.toFixed(2)}</span>
            )
        },
        {
            key: 'method',
            header: 'Method',
            sortable: true,
            searchable: true
        },
        {
            key: 'date',
            header: 'Date',
            sortable: true,
            searchable: false
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            searchable: true,
            render: (value: string) => {
                if (value === 'completed') {
                    return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" /> Completed
                        </span>
                    );
                } else if (value === 'pending') {
                    return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3 mr-1" /> Pending
                        </span>
                    );
                } else {
                    return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="w-3 h-3 mr-1" /> Failed
                        </span>
                    );
                }
            }
        }
    ];

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' }
    ];

    const handleWithdrawSubmit = () => {
        if (amount) {
            const amountAsNumber = Number(amount);
            if (isNaN(amountAsNumber)) {
                toast.error("Please enter a valid number for the withdrawal amount.");
                return;
            }
            submitWithdrawal({
                amount: amountAsNumber,
            });
        } else {
            toast.error("Please enter an amount to withdraw.");
        }
    };

    const handleSaveBankDetails = (details: BankDetails) => {
        setTimeout(() => {
            setBankDetails(details);
            setIsBankDetailsModalOpen(false);
        }, 1500);
    };
    if (!isSuperAdmin) {
        return (
            <div className="w-full flex justify-center items-center h-[80vh]">
                <p className="text-xl font-medium text-gray-900">You do not have access to this page</p>
            </div>
        );

    }
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="mb-8">
                <h1 className="text-xl font-medium text-gray-900 flex items-center mb-1">
                    <WalletIcon className="mr-2 h-6 w-6" /> My Wallet
                </h1>
                <p className="text-gray-500">Manage your funds and track your withdrawals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                    <div className="text-gray-500 mb-1 flex items-center">
                        <ArrowDownCircle className="h-4 w-4 mr-1" /> Available for Withdrawal
                    </div>
                    <div className="text-2xl font-medium text-gray-900">
                        ₦{availableBalance}
                    </div>
                    <button
                        onClick={() => setIsWithdrawModalOpen(true)}
                        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        <ArrowDownCircle className="h-4 w-4" />
                        Withdraw Funds
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                    <div className="text-gray-500 mb-1 flex items-center">
                        Bank Account Details
                    </div>

                    {bankDetails ? (
                        <div className="mt-2">
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Bank Name:</span>
                                <p className="font-medium">{bankDetails.bank_name}</p>
                            </div>
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Account Number:</span>
                                <p className="font-medium">{bankDetails.account_number}</p>
                            </div>
                            <div className="mb-2">
                                <span className="text-sm text-gray-500">Account Name:</span>
                                <p className="font-medium">{bankDetails.account_name}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm my-2">No bank details added yet</p>
                    )}

                    <button
                        onClick={() => setIsBankDetailsModalOpen(true)}
                        className="mt-4 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        {bankDetails ? 'Update Bank Details' : 'Add Bank Details'}
                    </button>
                </div>
            </div>

            <div className="rounded-lg">
                <h2 className="text-sm font-semibold mb-6 flex items-center">
                    <Clock className="mr-2 h-5 w-5" /> Withdrawal History
                </h2>

                <Table
                    data={withdrawalHistory}
                    columns={tableColumns}
                    searchPlaceholder="Search withdrawals..."
                    filterOptions={filterOptions}
                    filterKey="status"
                    dateFilterKey="date"
                    itemsPerPage={5}
                    emptyStateMessage="No withdrawal history found"
                />
            </div>

            <WithdrawalModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                availableBalance={availableBalance}
                amount={amount}
                setWithdrawAmount={setWithdrawAmount}
                withdrawalMethod={withdrawalMethod}
                setWithdrawalMethod={setWithdrawalMethod}
                onWithdraw={handleWithdrawSubmit}
                isLoading={isWithdrawing}
            />

            <BankDetailsModal
                isOpen={isBankDetailsModalOpen}
                onClose={() => setIsBankDetailsModalOpen(false)}
                onSave={handleSaveBankDetails}
                currentBankDetails={bankDetails}
            />
        </div>
    );
};

export default Wallet;