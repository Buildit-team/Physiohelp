import React, { useState } from 'react';
import { ProductFormData } from '../../../interface/addProduct';

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        status: 'Low Stock',
        basePrice: 0,
        discountType: '',
        discountPercentage: 0,
        taxClass: '',
        vatAmount: 0,
        sku: '',
        barcode: '',
        quantity: 0,
        weight: 0,
        height: 0,
        length: 0,
        width: 0,
        photos: [],
    });

    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));

            setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
            setPhotoPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-[100%] mx-auto p-4 max-[650px]:p-0 overflow-scroll flex max-[650px]:flex-col">
            <div className='w-[60%] mt-[30px] max-[650px]:w-full '>
                {/* General Information Section */}
                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">General Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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

                {/* Media Section */}
                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">Media</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {photoPreviews.length > 0 ? (
                            <div className="grid grid-cols-3 gap-4">
                                {photoPreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="max-h-48 mx-auto"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                                            onClick={() => {
                                                const updatedPreviews = photoPreviews.filter((_, i) => i !== index);
                                                const updatedFiles = formData.photos.filter((_, i) => i !== index);

                                                setPhotoPreviews(updatedPreviews);
                                                setFormData((prev) => ({ ...prev, photos: updatedFiles }));
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                    id="photo-upload"
                                    multiple
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                                >
                                    Drag and drop images here, or click to add images
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-[100%] max-[650px]:shadow-none">
                    <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Base Price</label>
                            <input
                                type="number"
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleInputChange}
                                placeholder="Type base price here..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Discount Type</label>
                            <select
                                name="discountType"
                                value={formData.discountType}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                                <option value="">Select a discount type</option>
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                        </div>
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
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                placeholder="Type product SKU here..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Barcode</label>
                            <input
                                type="text"
                                name="barcode"
                                value={formData.barcode}
                                onChange={handleInputChange}
                                placeholder="Product barcode..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
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
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                placeholder="Product weight..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Height</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                placeholder="Height (cm)..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Length</label>
                            <input
                                type="number"
                                name="length"
                                value={formData.length}
                                onChange={handleInputChange}
                                placeholder="Length (cm)..."
                                className="w-full p-2 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-lgiht text-[#777980] mb-1">Width</label>
                            <input
                                type="number"
                                name="width"
                                value={formData.width}
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
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 h-[40px] bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Product
                </button>
            </div>
        </form>
    );
};

export default AddProduct;