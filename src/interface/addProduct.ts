export interface ProductFormData {
    name: string;
    description: string;
    status: string;
    basePrice: number;
    discountType: string;
    discountPercentage: number;
    taxClass: string;
    vatAmount: number;
    sku: string;
    barcode: string;
    quantity: number;
    weight: number;
    height: number;
    length: number;
    width: number;
    photos: File[];
}


export type Product = {
    id: string;
    name: string;
    sku: string;
    stock: number;
    price: number;
    status: 'Published' | 'Low Stock';
    added: string;
    productImage:  string;
    customer: { 
        name: string;
        email: string;
    };
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

export type TablePropsT<T> = {
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
};