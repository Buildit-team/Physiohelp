import React from 'react';

const BlogPostSuccess: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <img
                    src="/path/to/your/image.png"
                    alt="Success"
                    className="w-24 h-24 mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-800">Post successfully uploaded!</h1>
                <p className="text-gray-600 mt-2">Your post has been uploaded successfully.</p>
                <button
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => {
                        // Add any action you want to perform after success, e.g., redirect
                        console.log('Post uploaded successfully!');
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default BlogPostSuccess;