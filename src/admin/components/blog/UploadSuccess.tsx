import React from 'react';

const BlogPostSuccess: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[85vh] w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[80%] h-full relative">
                <img
                    src="/success.png"
                    alt="Success"
                    className="w-[200px] mx-auto mb-4 absolute"
                />
                <div className='h-[80%] flex flex-col items-center justify-center'>
                    <span>
                        <h1 className="text-2xl font-bold text-gray-800">Post successfully uploaded!</h1>
                    </span>
                    <img
                        src="/happy.png"
                        alt="Success"
                        className="w-[400px] mx-auto mb-4"
                    />
                </div>
                <img
                    src="/success.png"
                    alt="Success"
                    className="w-[200px] mx-auto mb-4 absolute right-[64px] bottom-[60px]"
                />
            </div>
        </div>
    );
};

export default BlogPostSuccess;