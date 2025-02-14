// BlogUploadPage.tsx
import React, { useState, useCallback, lazy, Suspense } from 'react';
import { ImagePlus, Loader2, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';

interface BlogFormData {
    title: string;
    description: string;
    coverImage: File | null;
    previewUrl: string;
}

const BlogUploadPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        description: '',
        coverImage: null,
        previewUrl: '',
    });
    const [loading, setLoading] = useState(false);

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

    const handleDescriptionChange = useCallback((content: string) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            if (formData.coverImage) {
                submitData.append('coverImage', formData.coverImage);
            }

            // Add your API endpoint here
            // await fetch('/api/blogs', {
            //   method: 'POST',
            //   body: submitData,
            // });

            console.log('Form submitted:', formData);
            setFormData({
                title: '',
                description: '',
                coverImage: null,
                previewUrl: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        // Store the form data in localStorage before navigating
        localStorage.setItem('blogPreviewData', JSON.stringify({
            ...formData,
            coverImage: null, // We can't store File objects in localStorage
            previewUrl: formData.previewUrl // Store the previewUrl instead
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
            <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-[20px]">
                {/* Your existing form fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {formData.previewUrl ? (
                                <div className="relative">
                                    <img
                                        src={formData.previewUrl}
                                        alt="Preview"
                                        className="mx-auto h-64 w-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, coverImage: null, previewUrl: '' }))}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-[20px]">
                                    <ImagePlus className="mx-auto h-12 w-12 text-blue-500" />
                                    <div className="flex text-sm text-gray-600">
                                        <p className="pl-1">Drag and drop image here, or click add image</p>
                                    </div>
                                    <label htmlFor="file-upload" className="relative cursor-pointer w-[100px] h-[40px] flex items-center justify-center rounded-md font-medium text-white bg-blue-500">
                                        <span>Add image</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
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

                <div>
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

                <div>
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
                        disabled={loading}
                        className="inline-flex items-center justify-center h-[50px] w-[50px] border border-transparent text-base font-medium rounded-[100%] shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
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