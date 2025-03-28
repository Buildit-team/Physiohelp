import { useNavigate } from "react-router-dom";
import Table from "../../../utils/Table";
import { ColumnT, Product } from "../../../interface/addProduct";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct, getAdminProduct } from "../../services/api-service";
import toast from "react-hot-toast";

const Products = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [products, setProducts] = React.useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const { isLoading } = useQuery("PRODUCTS", getAdminProduct, {
        onSuccess: (fetchedData) => {
            setProducts(fetchedData.data.products);
        },
    });

    const { mutate, isLoading: deleteIsLoading } = useMutation((id: string) => deleteProduct(id), {
        onSuccess: () => {
            toast.success('Product deleted successfully');
            queryClient.invalidateQueries('PRODUCTS');
            setIsDeleteConfirmationOpen(false);
            setSelectedProduct(null);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to delete product');
        }
    });




    const columns: ColumnT<Product>[] = [
        {
            key: "product_name",
            header: "Products",
            sortable: false,
            isImageWithText: true,
            imageWithTextConfig: {
                imageKey: "product_image",
                textKey: "product_name",
                imageConfig: {
                    width: "48px",
                    height: "48px",
                    className: "rounded-md",
                    fallbackSrc: "/placeholder-product.png",
                },
            },
        },
        {
            key: "inventory",
            header: "SKU",
            sortable: true,
            render: (inventory) => inventory?.sku_id || 'N/A',

        },
        {
            key: "inventory",
            header: "Stock",
            sortable: true,
            render: (inventory) => inventory?.quantity || 0,

        },
        {
            key: "price",
            header: "Price",
            sortable: true,
            render: (price) => `$${price?.basic_price?.toFixed(2) || 0}`,
        },
        {
            key: "status",
            header: "Status",
            render: (value) => {
                const statusText = value || "N/A";
                let className = "";
                if (statusText.toLowerCase() === "low stock") {
                    className = "bg-red-100 text-red-800";
                } else if (statusText.toLowerCase() === "published") {
                    className = "bg-yellow-100 text-yellow-800";
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
            key: "created_at",
            header: "Added",
            sortable: true,
            render: (value) => {
                if (!value) return 'N/A';
                const date = new Date(value);
                return date.toLocaleDateString();
            }
        },
    ];

    const handleEdit = (product: Product) => {
        navigate(`/admin/products/${product?.product_id}/edit`);
    };
    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteConfirmationOpen(true);
    };


    const confirmDelete = () => {
        if (selectedProduct?.product_id) {
            mutate(selectedProduct.product_id);
        }
    };

    const closeDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(false);
        setSelectedProduct(null);
    };
    const handleView = (product: Product) => {
        navigate(`/admin/product/${product.product_id}`);
    };

    const buttons = [
        {
            label: "Add Product",
            onClick: () => navigate("/admin/add-product"),
            variant: "primary" as const,
        },
    ];

    const filterOptions = [
        { label: "All Product", value: "all" },
        { label: "Published", value: "published" },
        { label: "Low Stock", value: "low stock" },
    ];

    const DeleteConfirmationModal = () => {
        if (!isDeleteConfirmationOpen) return null;

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                onClick={closeDeleteConfirmation}
            >
                <div
                    className="bg-white rounded-lg shadow-xl p-6 w-96"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Confirm Delete
                    </h2>
                    <p className="mb-6 text-gray-600">
                        Are you sure you want to delete the product "{selectedProduct?.product_name}"?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={closeDeleteConfirmation}
                            disabled={deleteIsLoading}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 
                                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={deleteIsLoading}
                            className="px-4 py-2 bg-red-600 text-white rounded-md 
                                       hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
                                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {deleteIsLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
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
                rowUrl={(product) => `/admin/product/${product.product_id}`}
                isLoading={isLoading}
                emptyStateMessage="No products found."
            />
            <DeleteConfirmationModal />
        </>
    );
};

export default Products;
