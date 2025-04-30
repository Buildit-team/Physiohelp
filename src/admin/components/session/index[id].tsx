import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, MapPin, Phone, Mail, Activity, AlertCircle, CheckCircle, XCircle, ClipboardList, Award, PlusCircle, FileText } from 'lucide-react';
import { getSessionDetails, updateSessionVisit } from '../../services/api-service';
import { useState } from 'react';
import { formatDate } from 'date-fns';
import { formatTime, formatCurrency } from '../../../utils/formatNumbers';
import FollowUpModal from './FollowUpSessionModal';
import toast from 'react-hot-toast';



const SessionDetails = () => {
    const queryclient = useQueryClient()
    const { id } = useParams();
    const navigate = useNavigate();
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const { data, isLoading, error } = useQuery(
        [`SESSION_${id}`],
        () => getSessionDetails(id ?? ''),
        {
            enabled: !!id,
            retry: false,
        }
    );

    const updateSessionMutation = useMutation(
        (data: number) => updateSessionVisit(id ?? '', data),
        {
            onSuccess: () => {
                queryclient.invalidateQueries([`SESSION_${id}`]);
                setShowFollowUpModal(false);
                toast.success('Follow-up appointment added successfully');
            },
            onError: (error) => {
                console.error('Error updating session:', error);
            }
        }
    );
    const handleFollowUpSubmit = ({ numberOfTimes }: { numberOfTimes: number }) => {

        updateSessionMutation.mutate(numberOfTimes);
    };

    const StatusBadge = ({ status }: { status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'abandoned' }) => {
        const statusConfig = {
            pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="mr-1 h-4 w-4" /> },
            confirmed: { color: "bg-blue-100 text-blue-800", icon: <CheckCircle className="mr-1 h-4 w-4" /> },
            completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="mr-1 h-4 w-4" /> },
            cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle className="mr-1 h-4 w-4" /> },
            processing: { color: "bg-orange-100 text-orange-800", icon: <Clock className="mr-1 h-4 w-4" /> },
            abandoned: { color: "bg-gray-100 text-gray-800", icon: <AlertCircle className="mr-1 h-4 w-4" /> },
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.icon}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-red-500 mb-4">
                    <AlertCircle className="h-12 w-12" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Error Loading Session</h1>
                <p className="text-gray-600 mb-4">We couldn't load the session details. Please try again.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </button>
            </div>
        );
    }

    const session = data;

    const appointmentDate = session?.appointment_date
        ? formatDate(session.appointment_date, 'yyyy-MM-dd')
        : 'Not scheduled';

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back to Sessions
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Session Details</h1>
                        <p className="text-gray-500">Created on {formatDate(session?.created_at, 'yyyy-MM-dd')}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <StatusBadge status={session?.session_status} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <User className="mr-2 h-5 w-5" /> Customer Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                    <p className="text-sm text-gray-900">{session?.full_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    <p className="text-sm text-gray-900">{session?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                                    <p className="text-sm text-gray-900">{session?.phone_number}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                                    <p className="text-sm text-gray-900">{session?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <Calendar className="mr-2 h-5 w-5" /> Appointment Details
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                    <p className="text-sm text-gray-900">{appointmentDate}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Time</h3>
                                    <p className="text-sm text-gray-900">{formatTime(session?.appointment_time)}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <PlusCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Number of Times</h3>
                                    <p className="text-sm text-gray-900">{session?.number_of_times}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Award className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Assignee</h3>
                                    <p className="text-sm text-gray-900">{session?.assignee || 'Not assigned'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            Payment Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                                    <p className="text-sm text-gray-900">{formatCurrency(session?.amount)}</p>
                                </div>
                            </div>

                            {session?.discount && Number(session?.discount) > 0 && (
                                <div className="flex items-start">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Discount</h3>
                                        <p className="text-sm text-gray-900">{formatCurrency(session?.discount)}</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center font-bold">
                                    <span>Total Amount:</span>
                                    <span>{formatCurrency(session?.amount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <Activity className="mr-2 h-5 w-5" /> Service Details
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Service Needed</h3>
                                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md inline-block">
                                        {session?.service_needed}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Where It Hurts</h3>
                                    <p className="text-sm text-gray-900 p-4 bg-gray-50 rounded-md">
                                        {session?.where_it_hurts}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Limitations</h3>
                                    <p className="text-sm text-gray-900 p-4 bg-gray-50 rounded-md">
                                        {session?.limitaions}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Pain Duration</h3>
                                    <div className="inline-block bg-red-50 text-red-700 px-4 py-2 rounded-md">
                                        {session?.pain_durations}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <ClipboardList className="mr-2 h-5 w-5" /> Session Timeline
                            </h2>

                            <div className="space-y-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-900">Session Created</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {formatDate(session?.created_at, 'yyyy-MM-dd')} at {new Date(session?.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-900">Appointment Scheduled</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {appointmentDate} at {formatTime(session?.appointment_time)}
                                        </p>
                                    </div>
                                </div>

                                {session?.updated_at && (
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                                                <FileText className="h-5 w-5 text-yellow-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-sm font-medium text-gray-900">Last Updated</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {formatDate(session?.updated_at, 'yyyy-MM-dd')} at {new Date(session?.updated_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row gap-4">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Calendar className="mr-2 h-4 w-4" /> Reschedule Appointment
                            </button>
                            <button
                                onClick={() => setShowFollowUpModal(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <CheckCircle className="mr-2 h-4 w-4" /> Add Follow up Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FollowUpModal
                isOpen={showFollowUpModal}
                onClose={() => setShowFollowUpModal(false)}
                onSubmit={handleFollowUpSubmit}
                currentVisits={session?.number_of_times || 0}
                isLoading={updateSessionMutation.isLoading}
            />
        </div>
    );
};

export default SessionDetails;