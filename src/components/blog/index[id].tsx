import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getBlogsId } from '../../admin/services/api-service';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from 'react-query';

const BlogDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: blog, isLoading, error } = useQuery(
        ["blog", id],
        () => getBlogsId(id!),
        {
            enabled: !!id,
            retry: false,
            onError: (error: any) => {
                toast.error('Failed to fetch blog details');
                console.error('Error fetching blog details:', error);
                navigate('/blogs');
            },
        }
    );

    if (isLoading) {
        return (
            <div className="w-[100%] mt-[100px] h-auto pb-[50px] flex justify-center bg-[#F3F5F7]">
                <div className="w-[90%] flex flex-col items-center gap-[20px]">
                    <Skeleton height={40} width={400} />
                    <div className="w-[50%] max-w-[500px] mt-4">
                        <Skeleton height={200} />
                    </div>
                    <div className="mt-4 w-full">
                        <Skeleton count={5} />
                    </div>
                    <Skeleton height={20} width={150} className="mt-4" />
                    <Skeleton height={40} width={120} className="mt-4" />
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error loading blog details. Please try again later.</div>;
    }

    if (!blog) {
        return <div>Loading blog details...</div>;
    }

    return (
        <div className="w-[100%] mt-[100px] h-auto pb-[50px] flex justify-center">
            <div className="w-[90%] flex flex-col items-center gap-[20px]">
                <div className='w-[100%]'>
                    <img
                        src={blog?.cover_image?.image_url}
                        alt={blog.blog_topic}
                        className="object-cover rounded-md shadow-md w-[100%] h-[450px]"
                    />
                </div>
                <div className='w-[60%]'>
                    <h1 className='text-[50px] p-0 font-700'>{blog?.blog_topic}</h1>
                    <p className="mt-0 font-light text-[12px] p-0">
                        Published on:{' '}
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                </div>
                <div className="mt-4 prose w-[60%] max-[650px]:w-[95%]" dangerouslySetInnerHTML={{ __html: blog.blog_content }} />
            </div>
        </div>
    );
};

export default BlogDetailsPage;