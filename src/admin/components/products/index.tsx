import { useNavigate } from "react-router-dom";
import Table, { ColumnT } from "../../../utils/Table";

type Product = {
    id: string;
    name: string;
    sku: string;
    stock: number;
    price: number;
    status: 'Published' | 'Low Stock';
    added: string;
};
const products: Product[] = [
    {
        id: '1',
        name: 'Massage Chair',
        sku: '302012',
        stock: 10,
        price: 121.00,
        status: 'Low Stock',
        added: '29 Dec 2022'
    },
    {
        id: '2',
        name: 'Hand Grip',
        sku: '302011',
        stock: 204,
        price: 590.00,
        status: 'Published',
        added: '24 Dec 2022'
    },
    {
        id: '3',
        name: 'Facial Gun',
        sku: '302002',
        stock: 48,
        price: 125.00,
        status: 'Published',
        added: '12 Dec 2022'
    },
    {
        id: '4',
        name: 'Mini exercise bicycle',
        sku: '301901',
        stock: 401,
        price: 348.00,
        status: 'Published',
        added: '21 Oct 2022'
    }
];
// Usage in your component
const Products = () => {
    const navigate = useNavigate()
    const columns: ColumnT<Product>[] = [
        {
            key: 'name',
            header: 'Products',
            sortable: false,
        },
        {
            key: 'sku',
            header: 'SKU',
            sortable: true,
        },
        {
            key: 'stock',
            header: 'Stock',
            sortable: true,
        },
        {
            key: 'price',
            header: 'Price',
            sortable: true,
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            key: 'status',
            header: 'Status',
            render: (value) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${value === 'Low Stock'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                >
                    {value}
                </span>
            ),
        },
        {
            key: 'added',
            header: 'Added',
            sortable: true,
        },
    ];

    const handleEdit = (product: Product) => {
        console.log('Edit product:', product);
    };

    const handleDelete = (product: Product) => {
        console.log('Delete product:', product);
    };

    const handleView = (product: Product) => {
        console.log('View product:', product);
    };
    const buttons = [
        {
            label: 'Add Product',
            onClick: () => navigate('/admin/add-product'),
            variant: 'primary' as 'primary'
        },

    ];
    const filterOptions = [
        { label: 'All Product', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Low Stock', value: 'low stock' }
    ];
    return (
        <Table
            data={products}
            columns={columns}
            searchPlaceholder="Search Products..."
            buttons={buttons}
            actions={{
                onEdit: handleEdit,
                onDelete: handleDelete,
                onView: handleView,
            }}
            filterOptions={filterOptions}
            filterKey="status"
        />
    );
};


export default Products