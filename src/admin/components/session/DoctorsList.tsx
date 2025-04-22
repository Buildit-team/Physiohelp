import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { assignDoctor, getAllDoctors } from "../../services/api-service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface SelectDoctorProps {
    isOpen: boolean;
    onClose: (refresh: boolean) => void;
    sessionId: string;
}

const SelectDoctor: React.FC<SelectDoctorProps> = ({ isOpen, onClose, sessionId }) => {
    const queryclient = useQueryClient()
    const [doctors, setDoctors] = useState<{ adminId: string; name: string; specialty?: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [assigningDoctorId, setAssigningDoctorId] = useState<string | null>(null);

    const { isLoading } = useQuery("doctors", getAllDoctors, {
        retry: false,
        onSuccess: (fetchedData: { adminId: string; name: string; specialty?: string }[]) => {
            console.log("Fetched doctors:", fetchedData);
            setDoctors(fetchedData);
        },
        enabled: isOpen,
    });

    const assignMutation = useMutation(['ASSIGN_DOCTOR'], (doctorId: string) => assignDoctor(doctorId, sessionId), {
        onSuccess: () => {
            queryclient.invalidateQueries('GETALL_APPOINTMENTS')
            toast.success("Doctor assigned successfully");
            onClose(true);
            setAssigningDoctorId(null);
        },
        onError: (error: AxiosError) => {
            toast.error((error?.response?.data as { message?: string })?.message || "An error occurred");
            setAssigningDoctorId(null);
        },
    });

    const handleAssign = async (doctorId: string) => {
        setAssigningDoctorId(doctorId);
        assignMutation.mutate(doctorId);
    };

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Assign Doctor</h2>
                    <button
                        onClick={() => onClose(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No doctors found</div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {filteredDoctors.map((doctor) => (
                                <li
                                    key={doctor?.adminId}
                                    className="py-3 flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div>
                                        <p className="font-medium">{doctor?.name}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAssign(doctor?.adminId)}
                                        disabled={assigningDoctorId === doctor?.adminId}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                                    >
                                        {assigningDoctorId === doctor?.adminId ? "Assigning..." : "Assign"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectDoctor;