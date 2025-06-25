import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';


// onClick={() => handleLike(blog._id)} className={likes[blog._id] === 'like' ? 'text-blue-600' : ''}

// onClick={() => handleDislike(blog._id)} className={likes[blog._id] === 'dislike' ? 'text-red-600' : ''}

const YourBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log('blogs data: ', blogs)

    const fetchBlogs = async () => {
        try {
            const res = await fetch('https://publish-story.onrender.com/api/blogs/view-blogs', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth')}`
                }
            });
            const data = await res.json();
            setBlogs(data.reverse()); // show latest first
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) return <div className="text-center mt-10 text-gray-600">Loading blogs...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#001F3F]">All Blogs</h2>

            <div className="grid gap-6 md:grid-cols-2">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col justify-between min-h-[500px]"
                        >
                            {/* Top section */}
                            <div>
                                {blog.image && (
                                    <img
                                        src={`https://publish-story.onrender.com/${blog.image}`}
                                        alt="Blog"
                                        className="w-full h-52 object-cover rounded-md mb-3"
                                    />
                                )}
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-3">{blog.desc}</p>
                                <p className="text-sm text-gray-400">
                                    Posted on {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Bottom-left thumbs section */}
                            <div className="mt-4 flex justify-start">
                                <div className="flex items-center space-x-4 text-gray-600 text-xl">
                                    <button
                                        className="hover:text-blue-500 transition-colors duration-200"
                                        title="Like"
                                    >
                                        <FaThumbsUp className="cursor-pointer" />
                                    </button>
                                    <button
                                        className="hover:text-red-500 transition-colors duration-200"
                                        title="Dislike"
                                    >
                                        <FaThumbsDown className="cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-2 text-gray-500">No blogs available.</p>
                )}
            </div>
        </div>


    );
};

export default YourBlogs;
