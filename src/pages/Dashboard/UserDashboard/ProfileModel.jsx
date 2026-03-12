import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { Button, message } from "antd";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

const ProfileModal = ({ user, isOpen, onClose }) => {
    const { updateProfile, fetchUser } = useAuthContext();

    const [newName, setNewName] = useState(user?.name || "");
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState(user?.image || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setNewName(user.name);
            setPreview(user.image);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileUpdate = async () => {
        if (!newName && !newImage) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("name", newName);
        if (newImage) formData.append("image", newImage);

        try {
            await updateProfile(formData);
            message.success("Profile updated successfully!");
            await fetchUser(); // refresh user data
            onClose();
        } catch (err) {
            console.error(err);
            message.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
                    Update Profile
                </h2>

                {/* PROFILE IMAGE */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <User className="size-10! text-gray-400!" />
                                </div>
                            )}
                        </div>

                        {/* EDIT ICON */}
                        <label className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition">
                            <FaEdit className="text-xs!1 sm:text-sm" />
                            <input type="file" hidden onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                {/* NAME INPUT */}
                <div className="mb-6">
                    <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 focus:shadow-lg transition-all duration-300 ease-in-out rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 "
                    />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full! sm:w-auto! bg-red-600! text-white! hover:bg-red-700!"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleProfileUpdate}
                        disabled={loading}
                        className="w-fulls! sm:w-auto! bg-green-600! text-white! hover:bg-green-700!"
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;