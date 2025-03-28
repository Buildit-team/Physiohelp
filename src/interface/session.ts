
export interface ISession {
    session_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    assignee: string | null;
    number_of_times: number;
    service_needed: string;
    where_it_hurts: string;
    customer_id: string;
    admin_id: string | null;
    session_status: string;
    limitaions: string;
    pain_durations: string;
    amount: string;
    appointment_time: string;
    appointment_date: string;
    created_at: string;
    updated_at: string;
}