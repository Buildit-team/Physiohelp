// BlogPreviewPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface BlogPreviewData {
    title: string;
    description: string;
    previewUrl: string;
}

const BlogPreviewPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState<BlogPreviewData | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem('blogPreviewData');
        if (savedData) {
            setPreviewData(JSON.parse(savedData));
        } else {
            navigate('/admin/blog-upload-success');
        }
    }, [navigate]);

    const handlePublish = async () => {
        setLoading(true);
        try {
            // Add your publication logic here
            console.log('Publishing:', previewData);
            localStorage.removeItem('blogPreviewData');
            navigate('/admin/blog-upload-success');
        } catch (error) {
            console.error('Error publishing:', error);
        } finally {
            setLoading(false);
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
                            className="w-[400px] object-cover"
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
                        onClick={() => navigate('/blog/create')}
                        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to editing
                    </button>

                    <button
                        onClick={handlePublish}
                        disabled={loading}
                        className="inline-flex items-center justify-center h-[40px] w-[100px] border border-transparent text-base font-medium rounded-[8px] shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
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