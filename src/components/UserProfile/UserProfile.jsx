import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// === FOR DEMO/TESTING ONLY ===
const defaultUser = {
  _id: "68823c4e3109e064a922709e",
  firstname: "Sarah",
  lastname: "Lee",
  username: "sarahcooks",
  email: "sarah.lee@email.com",
  profileImg: "https://ui-avatars.com/api/?name=Sarah+Lee&background=random",
};

const UserProfile = () => {
  const navigate = useNavigate();
  // === FOR DEMO/TESTING ONLY ===
  const [user, setUser] = useState(defaultUser);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [previewImg, setPreviewImg] = useState(user.profileImg);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
      setEditForm((prev) => ({ ...prev, profileImg: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUser(editForm);
    setEditMode(false);
    // TODO: replace with backend API update
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cream">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full font-albert border border-green-100">
        {editMode ? (
          <>
            {/* Editable Profile Photo with avatar overlay */}
            <div className="relative mb-6">
              <img
                src={previewImg}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute left-0 top-0 w-32 h-32 opacity-0 cursor-pointer"
                title=" "
                onChange={handlePhotoChange}
              />
              <div className="absolute left-0 bottom-2 w-32 text-center pointer-events-none bg-[#4B7A5A]/80 text-white text-xs py-1 rounded-b-full">
                Change Photo
              </div>
            </div>

            {/* Editable Fields */}
            <div className="w-full space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="firstname">
                  First Name
                </label>
                <input
                  className="border-2 border-[#4B7A5A]/30 focus:border-[#4B7A5A] rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-[#4B7A5A] transition"
                  id="firstname"
                  name="firstname"
                  value={editForm.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <p className="text-[11px] text-gray-400 mt-0.5 ml-1">Will appear as your profile name.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  className="border-2 border-[#4B7A5A]/30 focus:border-[#4B7A5A] rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-[#4B7A5A] transition"
                  id="lastname"
                  name="lastname"
                  value={editForm.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <p className="text-[11px] text-gray-400 mt-0.5 ml-1">Will appear as your profile name.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  className="border-2 border-[#4B7A5A]/30 focus:border-[#4B7A5A] rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-[#4B7A5A] transition"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <p className="text-[11px] text-gray-400 mt-0.5 ml-1">This is your public handle.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="border-2 border-[#4B7A5A]/30 focus:border-[#4B7A5A] rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-[#4B7A5A] transition"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <p className="text-[11px] text-gray-400 mt-0.5 ml-1">Used for notifications and password reset.</p>
              </div>
            </div>
            <div className="flex gap-3 w-full mt-6">
              <button
                className="border py-2 rounded-lg font-semibold bg-[#4B7A5A] text-white flex-1 shadow hover:bg-[#33593c] transition"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="border py-2 rounded-lg font-semibold bg-gray-200 flex-1 hover:bg-gray-300 transition"
                onClick={() => {
                  setEditMode(false);
                  setEditForm(user);
                  setPreviewImg(user.profileImg);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={user.profileImg}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-green-300 shadow"
            />
            <h2 className="text-3xl font-extrabold mb-1 tracking-tight text-[#4B7A5A]">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-lg text-gray-700 mb-1 font-mono">@{user.username}</p>
            <p className="text-md text-gray-500 mb-3">{user.email}</p>
            <p className="text-sm text-green-700 font-semibold mb-6">
              Role: Regular User
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button className="border py-2 rounded-lg font-medium hover:bg-green-300 hover:text-white transition">
                My Recipes
              </button>
              <button className="border py-2 rounded-lg font-medium hover:bg-green-300 hover:text-white transition">
                Bookmarked Recipes
              </button>
              <button
                className="border py-2 rounded-lg font-medium hover:bg-green-300 hover:text-white transition"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button
                className="border py-2 rounded-lg font-medium hover:bg-yellow-300 hover:text-white transition"
                onClick={() => navigate(`/${user._id}/change-password`)}
              >
                Change Password
              </button>
              <button className="border py-2 rounded-lg font-medium text-red-600 border-red-300 hover:bg-red-50 transition">
                Delete Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
// test comment uhh
export default UserProfile;
