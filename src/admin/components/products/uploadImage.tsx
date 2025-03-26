import { useState } from "react";
import { ProductImage } from "../../../interface/addProduct";
import { useMutation } from "react-query";
import { uploadProductImage } from "../../services/api-service";
import { useParams } from "react-router-dom";

const UploadImage = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<ProductImage>({
        images: [],
    });
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));

            setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
            setPhotoPreviews((prev) => [...prev, ...newPreviews]);

            e.target.value = ""; 
        }
    };


    const uploadImages = async (images: File[]) => {
        const formData = new FormData();

        images.forEach((image) => {
            formData.append("images", image);
        });

        if (!id) {
            throw new Error("Product ID is required to upload images");
        }

        const response = await uploadProductImage(formData, id);  // Pass formData directly

        if (!response) {
            throw new Error("Failed to upload images");
        }

        return response;
    };


    const { mutate: upload, isLoading, isError, isSuccess } = useMutation(uploadImages);

    const handleUpload = () => {
        if (formData.images.length > 0) {
            upload(formData.images);
        }
    };

    return (
        <div>
            <div className="mb-6 bg-white rounded-lg shadow-md p-6 w-full max-[650px]:shadow-none">
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
                                            const updatedFiles = formData.images.filter((_, i) => i !== index);

                                            setPhotoPreviews(updatedPreviews);
                                            setFormData((prev) => ({ ...prev, images: updatedFiles }));
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
                {photoPreviews.length > 0 && (
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                            onClick={handleUpload}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload Images'}
                        </button>
                    </div>
                )}
                {isError && (
                    <div className="mt-2 text-red-500">
                        Failed to upload images. Please try again.
                    </div>
                )}
                {isSuccess && (
                    <div className="mt-2 text-green-500">
                        Images uploaded successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadImage;