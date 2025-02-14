import { useNavigate } from "react-router-dom";
import Table from "../../../utils/Table";
import { ColumnT, Product } from "../../../interface/addProduct";
import { products } from "./data";



const Products = () => {
    const navigate = useNavigate()
    const columns: ColumnT<Product>[] = [
        {
            key: 'name',
            header: 'Products',
            sortable: false,
            isImageWithText: true,
            imageWithTextConfig: {
                imageKey: 'productImage',
                textKey: 'name',
                imageConfig: {
                    width: '48px',
                    height: '48px',
                    className: 'rounded-md',
                    fallbackSrc: '/placeholder-product.png'
                }
            }
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
            variant: 'primary' as const
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