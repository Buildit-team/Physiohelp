import React, { useState, useCallback, lazy, Suspense } from 'react';
import { ImagePlus, Loader2, Plus, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';
import { uploadBlog } from '../../services/api-service';
import toast from 'react-hot-toast';

interface BlogFormData {
    title: string;
    description: string;
    coverImage: File | null;
    previewUrl: string;
    images: File[];
    imagePreviewUrls: string[];
}

const BlogUploadPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        description: '',
        coverImage: null,
        previewUrl: '',
        images: [],
        imagePreviewUrls: [],
    });
    const [loading, setLoading] = useState(false);

    const uploadBlogMutation = useMutation(
        uploadBlog,
        {
            onSuccess: () => {
              toast.success('Blog uploaded successfully:');
                setFormData({
                    title: '',
                    description: '',
                    coverImage: null,
                    previewUrl: '',
                    images: [],
                    imagePreviewUrls: [],
                });
                setLoading(false);
                navigate('/admin/blog-upload-success');
            },
            onError: (error) => {
                console.error('Error uploading blog:', error);
                setLoading(false);
            },
        }
    );

    const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    coverImage: file,
                    previewUrl: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleMultipleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages: File[] = [];
            const newPreviewUrls: string[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                newImages.push(file);
                const reader = new FileReader();
                promises.push(new Promise(resolve => {
                    reader.onloadend = () => {
                        newPreviewUrls.push(reader.result as string);
                        resolve();
                    };
                    reader.readAsDataURL(file);
                }));
            }

            Promise.all(promises).then(() => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...newImages],
                    imagePreviewUrls: [...prev.imagePreviewUrls, ...newPreviewUrls],
                }));
            });
        }
    }, []);

    const handleRemoveImage = useCallback((indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove),
            imagePreviewUrls: prev.imagePreviewUrls.filter((_, index) => index !== indexToRemove),
        }));
    }, []);

    const handleDescriptionChange = useCallback((content: string) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const submitData = new FormData();
        submitData.append('blog_topic', formData.title);
        submitData.append('blog_content', formData.description);
        if (formData.coverImage) {
            submitData.append('coverImage', formData.coverImage);
        }
        formData.images.forEach((image) => {
            submitData.append('images', image);
        });

        uploadBlogMutation.mutate(submitData);
    };

    const handlePreview = () => {
        localStorage.setItem('blogPreviewData', JSON.stringify({
            ...formData,
            coverImage: null,
            previewUrl: formData.previewUrl,
            images: formData.imagePreviewUrls,
            imagePreviewUrls: formData.imagePreviewUrls,
        }));
        navigate('/admin/preview-blog');
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="w-full mx-auto p-6 ">
            <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-[20px] max-[650px]:items-center max-[650px]:justify-center max-[650px]:w-full">
                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {formData.previewUrl ? (
                                <div className="relative">
                                    <img
                                        src={formData.previewUrl}
                                        alt="Cover Preview"
                                        className="mx-auto h-64 w-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, coverImage: null, previewUrl: '' }))}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-[20px]">
                                    <ImagePlus className="mx-auto h-12 w-12 text-blue-500" />
                                    <div className="flex text-sm text-gray-600">
                                        <p className="pl-1">Drag and drop cover image here, or click add image</p>
                                    </div>
                                    <label htmlFor="cover-image-upload" className="relative cursor-pointer w-[120px] h-[40px] flex items-center justify-center rounded-md font-medium text-white bg-blue-500">
                                        <span>Add cover</span>
                                        <input
                                            id="cover-image-upload"
                                            name="cover-image-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Images
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {formData.imagePreviewUrls.length > 0 ? (
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {formData.imagePreviewUrls.map((previewUrl, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={previewUrl}
                                                alt={`Image ${index + 1}`}
                                                className="h-32 w-32 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-[20px]">
                                    <ImagePlus className="mx-auto h-12 w-12 text-blue-500" />
                                    <div className="flex text-sm text-gray-600">
                                        <p className="pl-1">Drag and drop additional images here, or click add images</p>
                                    </div>
                                    <label htmlFor="multiple-image-upload" className="relative cursor-pointer w-[140px] h-[40px] flex items-center justify-center rounded-md font-medium text-white bg-blue-500">
                                        <span>Add images</span>
                                        <input
                                            id="multiple-image-upload"
                                            name="multiple-image-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            multiple
                                            onChange={handleMultipleImageChange}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Topic
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-200 outlin-none"
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blog Content
                    </label>
                    <div className="prose prose-sm sm:prose max-w-none">
                        <Suspense fallback={<div>Loading editor...</div>}>
                            <ReactQuill
                                theme="snow"
                                value={formData.description}
                                onChange={handleDescriptionChange}
                                modules={modules}
                                className="h-64 mb-12"
                            />
                        </Suspense>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-[30px]">
                    <button
                        type="button"
                        onClick={handlePreview}
                        className="inline-flex items-center justify-center h-[50px] px-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <Eye className="w-5 h-5 mr-2" /> Preview
                    </button>
                    <button
                        type="submit"
                        disabled={uploadBlogMutation.isLoading || loading}
                        className="inline-flex items-center justify-center h-[50px] w-[50px] border border-transparent text-base font-medium rounded-[100%] shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploadBlogMutation.isLoading || loading ? (
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                        ) : (
                            <Plus />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogUploadPage;