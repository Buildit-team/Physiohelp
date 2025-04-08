import Table from "../../../utils/Table"
import { useQuery } from "react-query";
import { getAllAppointment } from "../../services/api-service";
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
            setSession(fetchedData.data);
        },
    });
    const Columns: ColumnT<ISession>[] = [
        {
            key: "full_name",
            header: "Full Name",
            sortable: true,
        },
        {
            key: "email",
            header: "Email",
            sortable: true,
        },
        {
            key: "phone_number",
            header: "Phone Number",
            sortable: true,
        },
        {
            key: "service_needed",
            header: "Service Needed",
            sortable: false,
        },
        {
            key: "appointment_date",
            header: "Appointment Date",
            sortable: true,
            render: (session) => {
                if (!session.appointment_date) return 'N/A';
                const date = new Date(session.appointment_date);
                return date.toLocaleDateString();
            },
        },
        {
            key: "appointment_time",
            header: "Appointment Time",
            sortable: true,
        },
        {
            key: "session_status",
            header: "Status",
            sortable: true,
            render: (session) => {
                const statusText = session.session_status || "N/A";
                let className = "";
                if (statusText.toLowerCase() === "pending") {
                    className = "bg-yellow-100 text-yellow-800";
                } else if (statusText.toLowerCase() === "completed") {
                    className = "bg-green-100 text-green-800";
                } else if (statusText.toLowerCase() === "cancelled") {
                    className = "bg-red-100 text-red-800";
                } else {
                    className = "bg-gray-100 text-gray-800"; // Default
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
            sortable: true,
            render: (session) => session.assignee || 'Not Assigned',
        },
    ]

    const handleEdit = () => {
    };

    const handleDelete = () => {
    };

    const handleView = () => {

    };
    const buttons = [
        {
            label: "Add Appointment Type",
            onClick: () => setShowAddAppointmentType(!showAddAppointmentType),
            variant: "primary" as const,
        },
    ];
    return (
        <div className="w-full">
            <Table
                data={session}
                columns={Columns}
                searchPlaceholder="Search Appointment..."
                buttons={buttons}
                actions={{
                    onEdit: handleEdit,
                    onDelete: handleDelete,
                    onView: handleView,
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