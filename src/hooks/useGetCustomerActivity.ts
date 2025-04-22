import { useQuery, UseQueryResult } from 'react-query';
import { getCustomerActivity } from '../admin/services/api-service';
import { QueryFunctionContext } from 'react-query';

interface CustomerActivityData {
    orders: Order[];
    sessions: Session[];
}

interface Order {
    order_id: string;
    customer_id: string;
    order_status: string;
    order_track_id: string;
    cart_id: string;
    order_note: string | null;
    total_price: string;
    created_at: string;
    updated_at: string;
}

interface Session {
    session_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    ervice_needed: string;
    where_it_hurts: string;
    customer_id: string;
    admin_id: string | null;
    session_status: string;
    limitaions: string;
    number_of_times: number;
    pain_durations: string;
    appointment_time: string;
    appointment_date: string;
    amount: string;
}
const getEmailFromStorage = (): string => {
    const email = localStorage.getItem('email');
    if (!email) {
        throw new Error('User email not found in local storage');
    }
    return email;
};
/**
 * Custom hook using React Query to fetch customer activity data
 * @returns React Query result with customer activity data
 */

export const useGetCustomerActivity = (): UseQueryResult<CustomerActivityData, Error> => {
    const email = getEmailFromStorage();

    return useQuery(
        ['customerActivity', email],
        ({ queryKey }: QueryFunctionContext<string[]>) => {
            const [, email] = queryKey;
            return getCustomerActivity(email);
        },
        {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        }
    );
};