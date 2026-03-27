import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/Auth/AuthContext";
import axios from "axios";
import { message, Button, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const initialState = { author: "", title: "", content: "", image: "" };

const Blogs = () => {
    const [blogData, setBlogData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);
    const { token } = useAuthContext();
    const { id } = useParams(); // id from URL
    const navigate = useNavigate();

    // ---------------- FETCH BLOG IF EDIT ----------------
    useEffect(() => {
        console.log(token)

        if (id && token) {
            const fetchBlog = async () => {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_URL}/blogs/single-blog/${id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    const blog = res.data;
                    setBlogData({
                        author: blog.author || "",
                        title: blog.title || "",
                        content: blog.content || "",
                        image: "",
                        createdAt: blog.date || "",
                    });
                    if (blog.image) setPreview(blog.image);
                } catch (err) {
                    console.error(err);
                    message.error("Failed to fetch blog data");
                }
            };
            fetchBlog();
        }
    }, [id, token]);

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
    const validate = () => {
        let newErrors = {};

        if (!blogData.author) newErrors.author = "Author is required";
        if (!blogData.title) newErrors.title = "Title is required";
        if (!blogData.content) newErrors.content = "Content is required";
        if (!blogData.image && !id) newErrors.image = "Image is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { author, title, content, image: file, createdAt } = blogData;
        const formData = new FormData();
        formData.append("author", author);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("createdAt", createdAt);
        if (file) formData.append("image", file);
        if (!validate()) {
            message.warning("Please fill all the fields");
            return;
        }
        setLoading(true);
        try {
            if (id) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/blogs/update-blog/${id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
                );
                message.success("Blog updated successfully");
                navigate("/dashboard/admin");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/blogs/create-blogs`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
                );
                setLoading(false);
                message.success("Blog created successfully");
            }
            setBlogData(initialState);
            setPreview(null);
            // navigate("/admin/blogs-new");    
        } catch (err) {
            console.error(err);
            message.error("Failed to save blog");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-purple-50 flex justify-center items-center p-6">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">
                    {id ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 font-medium"><span className="text-red-500">* </span>Featured Image</label>
                        <input type="file" name="image" onChange={handleChange} className="w-[50%] border-gray-200 bg-gray-100 border p-2 cursor-pointer rounded-xl" />
                        {preview && <img src={preview} alt="preview" className="mt-4 w-full h-52 object-cover border bg-gray-100 p-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600 focus:shadow-sm focus:shadow-emerald-700 focus:transition-all duration-400 ease-in-out" />}
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                        )}
                    </div>

                    <div>
                        <label required className="block mb-2 font-medium"><span className="text-red-500">* </span>Author</label>
                        <input type="text" name="author" required value={blogData.author} onChange={handleChange} placeholder="Author Name" className="w-full bg-gray-100 p-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600 focus:shadow-sm focus:shadow-emerald-700 focus:transition-all duration-400 ease-in-out" />
                        {errors.author && (
                            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                        )}
                    </div>

                    <div>
                        <label required className="block mb-2 font-medium"><span className="text-red-500">* </span>Title</label>
                        <input type="text" name="title" value={blogData.title} onChange={handleChange} placeholder="Blog Title" className="w-full bg-gray-100 p-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600 focus:shadow-sm focus:shadow-emerald-700 focus:transition-all duration-400 ease-in-out" />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label required className="block mb-2 font-medium"><span className="text-red-500">* </span>Content</label>
                        <textarea name="content" value={blogData.content} onChange={handleChange} rows={6} placeholder="Write content..." className="w-full bg-gray-100 p-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-600 focus:shadow-sm focus:shadow-emerald-700 focus:transition-all duration-400 ease-in-out" />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading} // spinner automatically dikhega
                            className="flex-1! cursor-pointer! bg-emerald-600! text-white! py-[20px]! rounded-lg!"
                        >
                            {id ? "Update Blog" : "Create Blog"}
                        </Button>
                        <button type="button" className="flex-1 cursor-pointer bg-red-600 text-white py-2! rounded-lg" onClick={() => navigate("/dashboard/admin")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Blogs;