import Table from "../../../utils/Table"
import { useQuery } from "react-query";
import { getAllAppointment, getAllPaidAppointment } from "../../services/api-service";
import React from "react";
import { ColumnT } from "../../../interface/addProduct";
import { ISession } from "../../../interface/session";
import Addsessiontype from "./Addsessiontype";

const Sessions = () => {
    const [session, setSession] = React.useState<ISession[]>([]);
    const [showAddAppointmentType, setShowAddAppointmentType] = React.useState(false);

    const { isLoading } = useQuery("appointments", getAllAppointment, {
        retry: false,
        onSuccess: (fetchedData) => {
            setSession(fetchedData);
        },
    });

   useQuery("paid_appointments", getAllPaidAppointment, {
        retry: false,
        onSuccess: () => {
        //   console.log(fetchedData);
        },
    });

    const Columns: ColumnT<ISession>[] = [
        {
            key: "full_name",
            header: "Full Name",
        },
        {
            key: "email",
            header: "Email",
        },
        {
            key: "phone_number",
            header: "Phone Number",
        },
        {
            key: "service_needed",
            header: "Service Needed",
            sortable: false,
        },
        {
            key: "session_status",
            header: "Status",
            render: (session) => {
                const statusText = session || "N/A";
                let className = "";
                if (statusText.toLowerCase() === "pending") {
                    className = "bg-yellow-100 text-yellow-800";
                } else if (statusText.toLowerCase() === "completed") {
                    className = "bg-green-100 text-green-800";
                } else if (statusText.toLowerCase() === "cancelled") {
                    className = "bg-red-100 text-red-800";
                } else {
                    className = "bg-gray-100 text-gray-800";
                }
                return (
                    <span className={`px-2 py-1 rounded-full text-xs uppercase ${className}`}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            key: "assignee",
            header: "Assignee",
            render: (session) => session?.assignee || 'Not Assigned',
        },
    ]

    const handleAssignDoctor = () => {

    };

    const buttons = [
        {
            label: "Add Appointment Type",
            onClick: () => setShowAddAppointmentType(!showAddAppointmentType),
            variant: "primary" as const,
        },
    ];
    return (
        <div className="w-full max-[650px]:p-2">
            <Table
                data={session}
                columns={Columns}
                searchPlaceholder="Search Appointment..."
                buttons={buttons}
                actions={{
                    onAssign: handleAssignDoctor,
                    assignText: 'Assign Doctor'
                }}
                emptyStateMessage="No appointments found."
                isLoading={isLoading}
                
            />

            {
                showAddAppointmentType && (
                    <Addsessiontype setShowAddAppointmentType={setShowAddAppointmentType} />
                )
            }
        </div>
    )
}

export default Sessions