import { useState } from 'react';
import { X } from 'lucide-react';

interface FollowUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { numberOfTimes: number }) => void;
    currentVisits?: number;
    isLoading?: boolean;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false
}) => {
    const [followUpData, setFollowUpData] = useState({
        numberOfTimes: 0,
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFollowUpData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onSubmit({ numberOfTimes: followUpData.numberOfTimes });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Add Follow-up Appointment</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="numberOfTimes" className="block text-sm font-medium text-gray-700">
                                Additional Number of Visits
                            </label>
                            <input
                                type="number"
                                id="numberOfTimes"
                                name="numberOfTimes"
                                min="1"
                                value={followUpData.numberOfTimes}
                                onChange={handleInputChange}
                                className="mt-1 flex w-full px-2  py-3 border-gray-500 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            {isLoading ? 'Saving...' : 'Save Follow-up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FollowUpModal;