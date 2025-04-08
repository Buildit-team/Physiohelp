import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct, getProductById } from "../../services/api-service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LiaTimesSolid } from "react-icons/lia";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const queryClient = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useQuery(
        [`PRODUCT_${id}`],
        () => getProductById(id!),
        {
            enabled: !!id,
            retry: false,
        }
    );


    const deleteProductMutation = useMutation(
        (productId: string) => deleteProduct(productId),
        {
            onSuccess: () => {
                toast.success('Product deleted successfully');
                queryClient.invalidateQueries(`PRODUCT_${id}`);
                navigate('/admin/product');
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Failed to delete product');
            }
        }
    );

    const [mainImage, setMainImage] = useState<string | undefined>(product?.product_image?.[0]?.image_url);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    React.useEffect(() => {
        if (product?.product_image?.[0]?.image_url) {
            setMainImage(product.product_image[0].image_url);
        }
    }, [product?.product_image]);

    const handleThumbnailClick = (imageUrl: string | undefined) => {
        setMainImage(imageUrl);
    };

    const openManageModal = () => {
        setIsManageModalOpen(true);
    };

    const closeManageModal = () => {
        setIsManageModalOpen(false);
    };

    const handleEditClick = () => {
        navigate(`/admin/products/${id}/edit`);
        closeManageModal();
    };

    const handleDeleteClick = () => {
        setIsManageModalOpen(false);
        setIsDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(false);
    };

    const confirmDelete = () => {
        if (id) {
            deleteProductMutation.mutate(id);
        }
    };


    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <Skeleton className="w-full aspect-square rounded-lg" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex justify-between items-center">
                            <Skeleton height={30} width={200} />
                            <Skeleton height={40} width={100} /> {/* Placeholder for Manage Button */}
                        </div>
                        <Skeleton count={3} />
                    </div>
                </div>
                <div className="mt-6">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="w-full aspect-square">
                                <Skeleton className="w-full h-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 space-y-4">
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} />
                    <Skeleton height={20} width={200} />
                    <Skeleton height={20} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> There was an issue fetching the product details. Please try again later.</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Not Found!</strong>
                    <span className="block sm:inline"> No product found with the ID: {id}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/2">
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt={product?.product_name}
                            className="w-[90%] aspect-square object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="bg-gray-100 border border-dashed border-gray-300 aspect-square flex items-center justify-center rounded-lg shadow-sm">
                            <span className="text-gray-500">No Image Available</span>
                        </div>
                    )}
                    <div className="w-full mt-[20px]">
                        {product?.product_image && product.product_image.length > 1 && (
                            <div className="mb-8">
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {product.product_image.map((img: { image_id: React.Key | null | undefined; image_url: string | undefined; }, index: number) => (
                                        <div
                                            key={img?.image_id}
                                            className={`w-full aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm transition-shadow hover:shadow-md ${mainImage === img?.image_url ? 'ring-2 ring-indigo-500' : ''}`}
                                            onClick={() => handleThumbnailClick(img?.image_url)}
                                        >
                                            <img
                                                src={img?.image_url}
                                                alt={`${product?.product_name} - Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                    <div>
                       <div className="w-[90%] flex justify-end">
                            <button
                                onClick={openManageModal}
                                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
                            >
                                Manage
                            </button>
                       </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-900">{product?.product_name}</h1>
                                {product?.brand && (
                                    <p className="text-gray-600 mt-1">by {product.brand}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <strong className="text-gray-700">Description:</strong>
                            <p className="text-gray-800 leading-relaxed">{product?.description || 'No description available.'}</p>
                        </div>
                    </div>
                    <div>

                        <div className="border-t border-gray-200 pt-6 space-y-6">
                            <div>
                                <h2 className="text-[14px] mt-[5px] font-semibold text-gray-800">Product Details</h2>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="text-gray-700">Basic Price:</strong>
                                        <p className="text-[14px] mt-[5px] font-medium text-indigo-600">₦{product?.price?.basic_price?.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <strong className="text-gray-700">Physiohelp Price:</strong>
                                        <p className="text-[14px] mt-[5px] font-medium text-indigo-600">₦{product?.price?.client_price?.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <strong className="text-gray-700">Customer Price:</strong>
                                        <p className="text-[14px] mt-[5px] font-medium text-indigo-600">₦{product?.price?.payment_price?.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <strong className="text-gray-700">Discounted Rate:</strong>
                                        <p className="text-[14px] mt-[5px] font-medium text-indigo-600">{product?.price?.discounted_rate}%</p>
                                    </div>
                                    <div>
                                        <strong className="text-gray-700">SKU:</strong>
                                        <p className="text-gray-800">{product?.inventory?.sku_id || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <strong className="text-gray-700">Stock:</strong>
                                        <p className={`text-gray-800 ${product?.inventory?.quantity === 0 ? 'text-red-500 font-semibold' : ''}`}>
                                            {product?.inventory?.quantity !== undefined ? product.inventory.quantity : 'N/A'}
                                            {product?.inventory?.quantity === 0 && ' (Out of Stock)'}
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-gray-700">Status:</strong>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product?.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {product?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <strong className="text-gray-700">Shipping Details:</strong>
                                <div className="mt-2">
                                    {product?.shipping_details ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="text-gray-800">Width: {product.shipping_details.width} cm</p>
                                            <p className="text-gray-800">Height: {product.shipping_details.height} cm</p>
                                            <p className="text-gray-800">Length: {product.shipping_details.length} cm</p>
                                            <p className="text-gray-800">Weight: {product.shipping_details.weight} g</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">Not available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isManageModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-[10px] relative">
                        <button
                            onClick={closeManageModal}
                            className="absolute right-4 top-4 text-gray-800 hover:text-gray-600"
                        >
                            <LiaTimesSolid />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">What do you want to do?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteClick}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleEditClick}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteConfirmationOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to delete the product "{product?.product_name}"?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeDeleteConfirmation}
                                disabled={deleteProductMutation.isLoading}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleteProductMutation.isLoading}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                            >
                                {deleteProductMutation.isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductDetails;