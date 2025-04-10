export interface Order {
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