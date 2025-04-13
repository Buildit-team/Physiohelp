import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { uploadProduct } from '../../services/api-service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export interface IProduct {
    product_name: string;
    description: string;
    price: {
        basic_price: number;
        discounted_rate: number;
        vat: number;
    };
    inventory: {
        quantity: number;
        sku_id: string;
        barcode: string;
    };
    shipping_details: {
        weight: number;
        width: number;
        height: number;
        length: number;
    };
    status: string;
}

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IProduct>({
        product_name: '',
        description: '',
        status: 'available',
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
    });

    const mutation = useMutation(async (newProduct: any) => {
        const response = await uploadProduct(newProduct);
        return response;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        mutation.mutate(formData, {
            onSuccess: (data) => {
                toast.success(data.message);
                navigate(`/admin/add-product-image/${data?.product?.product_id}`);
            },
            onError: (error) => {
                console.error('Error adding product:', error);
            },
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name.startsWith('price.')) {
            const priceField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                price: {
                    ...prev.price,
                    [priceField]: Number(value) || 0, // Ensure numeric, handle empty string
                }
            }));
        } else if (name.startsWith('inventory.')) {
            const inventoryField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                inventory: {
                    ...prev.inventory,
                    [inventoryField]: name === 'inventory.quantity' ? Number(value) : value, // Corrected
                }
            }));
        }
        else if (name.startsWith('shipping_details.')) {
            const shippingField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                shipping_details: {
                    ...prev.shipping_details,
                    [shippingField]: Number(value) || 0, // Ensure numeric
                }
            }));
        }
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit}  className="w-[100%] mx-auto p-4 max-[650px]:p-0 overflow-scroll flex max-[650px]:flex-col">
            <div className='w-[60%] mt-[30px] max-[650px]:w-full '>
                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">General Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Product Name</label>
                            <input
                                type="text"
                                name="product_name"
                                value={formData.product_name}
                                onChange={handleInputChange}
                                placeholder="Type product name here..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
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

                {/* Inventory Section */}
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

                {/* Shipping and Delivery Section */}
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
                                name="shipping_details.width"
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
                {/* <div> */}
                <button
                    type="button"
                    className="px-4 py-2 h-[40px] bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 h-[40px] bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {mutation.isLoading ? 'Adding...' : 'Add Product'}
                </button>
                {/* </div> */}
                {/* <div>
                    <select name="" id="">
                        <option value="">Published</option>
                        <option value="">Low St</option>
                    </select>
                </div> */}
            </div>
        </form>
    );
};

export default AddProduct;

