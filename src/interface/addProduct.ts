export interface ProductFormData {
    name: string;
    description: string;
    status: string;
    basePrice: number;
    discountPercentage: number;
    taxClass?: string;
    vatAmount: number;
    sku: string;
    barcode: string;
    quantity: number;
    weight: number;
    height: number;
    length: number;
    width: number;
}
export interface ProductImage{
    images: File[];
}

export type Product = {
    id: number;
    product_id: string;
    admin_id: string;
    product_name: string;
    description: string;
    product_image: { image_id: string; image_url: string; }[] | null; // Changed to array of image objects or null
    price: {
        vat: number;
        basic_price: number;
        build_it_com: number;
        client_price: number;
        payment_price: number;
        discounted_rate: number;
    };
    inventory: {
        sku_id: string;
        barcode: string;
        quantity: number;
    };
    shipping_details: {
        width: number;
        height: number;
        length: number;
        weight: number;
    };
    status: string; // Changed to string
    created_at: string;
    updated_at: string;
};



export type ImageWithTextConfig = {
    imageKey: string;
    textKey: string;
    imageConfig?: {
        width?: string;
        height?: string;
        className?: string;
        fallbackSrc?: string;
    };
};
export type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
};

export type ButtonPropsT = {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
};

export type FilterOption = {
    label: string;
    value: string;
};

export type DataItemT = {
    [key: string]: any;
};

export type ColumnT<T> = {
    key: keyof T;
    header: string;
    sortable?: boolean;
    searchable?: boolean;
    isImageWithText?: boolean;
    imageWithTextConfig?: ImageWithTextConfig;
    render?: (value: any, item: T) => React.ReactNode;
};

export type TablePropsT<T extends DataItemT> = {
    data?: T[];
    columns: ColumnT<T>[];
    actions?: {
        onEdit?: (item: T) => void;
        onDelete?: (item: T) => void;
        onView?: (item: T) => void;
    };
    buttons?: ButtonPropsT[];
    className?: string;
    searchPlaceholder?: string;
    filterOptions?: FilterOption[];
    filterKey?: keyof T;
    dateFilterKey?: keyof T;
    itemsPerPage?: number;
    rowUrl?: (item: T) => string;
};