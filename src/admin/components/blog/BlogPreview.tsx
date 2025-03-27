// BlogPreviewPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useMutation } from 'react-query';
import { uploadBlog } from '../../services/api-service'; 

interface BlogPreviewData {
    title: string;
    description: string;
    previewUrl: string;
    coverImage?: File | null;
}

const BlogPreviewPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState<BlogPreviewData | null>(null);

    const uploadBlogMutation = useMutation(
        async (data: FormData) => {
            return await uploadBlog(data);
        },
        {
            onSuccess: (data) => {
                console.log('Blog published successfully:', data);
                setLoading(false);
                localStorage.removeItem('blogPreviewData');
                navigate('/admin/blog-upload-success');
            },
            onError: (error) => {
                console.error('Error publishing blog:', error);
                setLoading(false);
            },
        }
    );

    useEffect(() => {
        const savedData = localStorage.getItem('blogPreviewData');
        if (savedData) {
            setPreviewData(JSON.parse(savedData));
        } else {
            navigate('/admin/blog-upload'); // Go back to upload page if no preview data
        }
    }, [navigate]);

    const handlePublish = async () => {
        setLoading(true);
        if (previewData) {
            const formData = new FormData();
            formData.append('blog_topic', previewData.title);
            formData.append('blog_content', previewData.description);
            if (previewData.previewUrl) {
                const base64ToFile = (dataurl: string, filename: string) => {
                    const arr = dataurl.split(',');
                    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
                    const bstr = atob(arr[1]);
                    let n = bstr.length;
                    const u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new File([u8arr], filename, { type: mime });
                };
                const filename = `cover_${Date.now()}.png`;
                const coverFile = base64ToFile(previewData.previewUrl, filename);
                formData.append('coverImage', coverFile);
            }

            uploadBlogMutation.mutate(formData);
        }
    };

    if (!previewData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full mx-auto p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
                {previewData.previewUrl && (
                    <div className="rounded-lg overflow-hidden">
                        <img
                            src={previewData.previewUrl}
                            alt="Blog cover"
                            className="w-full h-[200px] object-cover"
                        />
                    </div>
                )}

                <h1 className="text-4xl font-bold text-gray-900">{previewData.title}</h1>

                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewData.description }}
                />

                <div className="flex justify-between items-center pt-6">
                    <button
                        onClick={() => navigate('/admin/add-blog')}
                        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to editing
                    </button>

                    <button
                        onClick={handlePublish}
                        disabled={uploadBlogMutation.isLoading || loading}
                        className="inline-flex items-center justify-center h-[40px] w-[100px] border border-transparent text-base font-medium rounded-[8px] shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploadBlogMutation.isLoading || loading ? (
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                        ) : (
                            'Upload'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPreviewPage;