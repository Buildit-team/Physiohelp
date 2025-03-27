import { useNavigate } from "react-router-dom";
import Table from "../../../utils/Table";
import { ColumnT, Product } from "../../../interface/addProduct";
import React from "react";
import { useQuery } from "react-query";
import { getAdminProduct } from "../../services/api-service";

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState<Product[]>([]);

    const ProductsData = useQuery("products", getAdminProduct, {
        onSuccess: (fetchedData) => {
            setProducts(fetchedData.data.products);
        },
    });
    React.useEffect(() => {
        ProductsData
    })
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
        console.log("Edit product:", product);
    };

    const handleDelete = (product: Product) => {
        console.log("Delete product:", product);
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
            rowUrl={(product) => `/admin/product/${product.product_id}`}
        />
    );
};

export default Products;
