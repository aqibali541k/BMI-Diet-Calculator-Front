import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/Auth/AuthContext";
import axios from "axios";
import { message } from "antd";
import { useParams, useNavigate } from "react-router-dom";

let initialState = {
    author: "",
    title: "",
    content: "",
    image: "",
};

const Blogs = () => {
    const [blogData, setBlogData] = useState(initialState);
    const [preview, setPreview] = useState(null);
    const { token } = useAuthContext();
    const { blogId } = useParams(); // URL se blog ID
    const navigate = useNavigate();

    // ------------------ FETCH BLOG IF EDIT ------------------
    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:8000/blogs/${blogId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    const blog = res.data;
                    setBlogData({
                        author: blog.author,
                        title: blog.title,
                        content: blog.content,
                        image: "", // image file input cannot be prefilled
                        createdAt: blog.createdAt,
                    });
                    if (blog.imageUrl) setPreview(blog.imageUrl); // preview old image
                } catch (err) {
                    console.error(err);
                    message.error("Failed to fetch blog data");
                }
            };
            fetchBlog();
        }
    }, [blogId, token]);

    // ------------------ HANDLE INPUT CHANGE ------------------
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];
            setBlogData((prev) => ({ ...prev, image: file }));

            if (file) setPreview(URL.createObjectURL(file));
        } else {
            setBlogData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // ------------------ HANDLE SUBMIT ------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { author, title, content, image: file, createdAt: date } = blogData;
        const formData = new FormData();
        formData.append("author", author);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("createdAt", date);
        if (file) formData.append("image", file);

        try {
            if (blogId) {
                // EDIT MODE
                await axios.put(
                    `http://localhost:8000/blogs/update-blogs/${blogId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                message.success("Blog updated successfully");
            } else {
                // CREATE MODE
                await axios.post(
                    "http://localhost:8000/blogs/create-blogs",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                message.success("Blog created successfully");
            }

            setBlogData(initialState);
            setPreview(null);
            navigate("/admin/blogs"); // redirect back to blogs list
        } catch (error) {
            console.error(error);
            message.error("Failed to save blog");
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 flex justify-center items-center p-6">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">
                    {blogId ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Featured Image (Optional)
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-2"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-4 w-full h-52 object-cover rounded-xl border"
                            />
                        )}
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block mb-2 font-medium">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={blogData.author}
                            placeholder="Enter author name"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-medium">Blog Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            placeholder="Enter blog title"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block mb-2 font-medium">Blog Content *</label>
                        <textarea
                            name="content"
                            rows="6"
                            value={blogData.content}
                            placeholder="Write your blog content here..."
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 cursor-pointer bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
                        >
                            {blogId ? "Update Blog" : "Create Blog"}
                        </button>

                        <button
                            type="button"
                            className="flex-1 cursor-pointer bg-red-600 text-white border border-gray-300 py-3 rounded-xl transition"
                            onClick={() => navigate("/admin/blogs")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Blogs;