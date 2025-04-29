import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getProductById, updateProduct } from '../../services/api-service';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../../interface/addProduct';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IProduct>({
        product: {
            product_name: '',
            description: '',
        },
        price: {
            basic_price: 0,
            discounted_rate: 0,
            vat: 0,
        },
        inventory: {
            quantity: 0,
            sku_id: '',
            barcode: '',
        },
        shipping_details: {
            weight: 0,
            width: 0,
            height: 0,
            length: 0,
        },
        status: 'published',
    });

    const { isLoading } = useQuery([`PRODUCT_${id}`], () => getProductById(id!), {
        onSuccess: (data) => {
            if (data) {
                setFormData({
                    product: {
                        product_name: data.product_name,
                        description: data.description,
                    },
                    price: {
                        basic_price: data.price.basic_price,
                        discounted_rate: data.price.discounted_rate,
                        vat: data.price.vat,
                    },
                    inventory: {
                        quantity: data.inventory.quantity,
                        sku_id: data.inventory.sku_id,
                        barcode: data.inventory.barcode,
                    },
                    shipping_details: {
                        weight: data.shipping_details.weight,
                        width: data.shipping_details.width,
                        height: data.shipping_details.height,
                        length: data.shipping_details.length,
                    },
                    status: 'published',
                });
            }
        },
        onError: (error) => {
            console.error('Error fetching product:', error);
            toast.error('Failed to fetch product');
        },
    });

    const mutation = useMutation(async (updatedProduct: IProduct) => { return updateProduct(id!, updatedProduct); }, {
        onSuccess: () => {
            toast.success('Product updated successfully');
            navigate('/admin/product');
        },
        onError: (error) => {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        mutation.mutate(formData);
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name.startsWith('price.')) {
            const [, priceKey] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                price: {
                    ...prev.price,
                    [priceKey]: Number(value),
                },
            }));
        } else if (name.startsWith('inventory.')) {
            const [, inventoryKey] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                inventory: {
                    ...prev.inventory,
                    [inventoryKey]: value,
                },
            }));
        } else if (name.startsWith('shipping_details.')) {
            const [, shippingKey] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                shipping_details: {
                    ...prev.shipping_details,
                    [shippingKey]: Number(value),
                },
            }));
        } else if (name.startsWith('product.')) {
            const [, productkey] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                product: {
                    ...prev.product,
                    [productkey]: value,
                },
            }));
        }
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="w-[100%] mx-auto p-4 max-[650px]:p-0 overflow-scroll flex max-[650px]:flex-col">
            <div className='w-[60%] mt-[30px] max-[650px]:w-full '>
                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">General Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Product Name</label>
                            <input
                                type="text"
                                name="product.product_name"
                                value={formData.product.product_name}
                                onChange={handleInputChange}
                                placeholder="Type product name here..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Description</label>
                            <textarea
                                name="product.description"
                                value={formData.product.description}
                                onChange={handleInputChange}
                                placeholder="Type product description here..."
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] flex flex-col gap-[10px]  max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                    <div>
                        <label className="block text-sm font-lgiht text-[#777980] mb-1">Base Price</label>
                        <input
                            type="number"
                            name="price.basic_price"
                            value={formData.price.basic_price}
                            onChange={handleInputChange}
                            placeholder="Type base price here..."
                            className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-lgiht text-[#777980] mb-1">Discount Percentage</label>
                        <input
                            type="number"
                            name="price.discounted_rate"
                            value={formData.price.discounted_rate}
                            onChange={handleInputChange}
                            placeholder="Type Percentage here..."
                            className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-lgiht text-[#777980] mb-1">vat</label>
                        <input
                            type="number"
                            name="price.vat"
                            value={formData.price.vat}
                            onChange={handleInputChange}
                            placeholder="Type base price here..."
                            className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                        />
                    </div>
                </div>

                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">Inventory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">SKU</label>
                            <input
                                type="text"
                                name="inventory.sku_id"
                                value={formData.inventory.sku_id}
                                onChange={handleInputChange}
                                placeholder="Type product SKU here..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Barcode</label>
                            <input
                                type="text"
                                name="inventory.barcode"
                                value={formData.inventory.barcode}
                                onChange={handleInputChange}
                                placeholder="Product barcode..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Quantity</label>
                            <input
                                type="number"
                                name="inventory.quantity"
                                value={formData.inventory.quantity}
                                onChange={handleInputChange}
                                placeholder="Type product quantity here..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">Shipping and Delivery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Weight</label>
                            <input
                                type="number"
                                name="shipping_details.weight"
                                value={formData.shipping_details.weight}
                                onChange={handleInputChange}
                                placeholder="Product weight..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Height</label>
                            <input
                                type="number"
                                name="shipping_details.height"
                                value={formData.shipping_details.height}
                                onChange={handleInputChange}
                                placeholder="Height (cm)..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Length</label>
                            <input
                                type="number"
                                name="shipping_details.length"
                                value={formData.shipping_details.length}
                                onChange={handleInputChange}
                                placeholder="Length (cm)..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Width</label>
                            <input
                                type="number"
                                name="shipping_details.width" // Use shipping_details.width
                                value={formData.shipping_details.width}
                                onChange={handleInputChange}
                                placeholder="Width (cm)..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-[40%] flex justify-end gap-4 max-[650px]:w-full max-[650px]:justify-center max-[650px]:mb-[10px]">
                <button
                    type="button"
                    className="px-4 py-2 h-[40px] bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={() => navigate('/admin/products')}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 h-[40px] bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {mutation.isLoading ? 'Updating...' : 'Update Product'}
                </button>
            </div>
        </form>
    );
};

export default EditProduct;