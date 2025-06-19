import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  Shield,
  Settings,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { useUserContext } from "@/contexts/user-context";
import type { User as UserType } from "@/types/index";
import { toast } from "react-toastify";
import { updateUser } from "@/apiService/user-service";
import { makeTitleCase } from "@/util/helpers";

interface UserData {
  fullName: string;
  email: string;
  username: string;
  phoneNumber: string;
  address: string;
  about: string;
  enabled: boolean;
  createdAt: string;
  provider: string;
  roles: string[];
}

const UserProfileCard = () => {
  const { user, loading: userLoading } = useUserContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  // Convert User type to UserData format
  const convertUserToUserData = (user: UserType): UserData => {
    return {
      fullName: user.fullName || "",
      email: user.email || "",
      username: user.username || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      about: user.about || "",
      enabled: user.enabled ?? true,
      createdAt: user.createdAt || new Date().toISOString(),
      provider: user.provider || "Local",
      roles: user.roles?.map((role) => role.name) || [],
    };
  };

  // Initialize userData when user context changes
  useEffect(() => {
    if (user) {
      const convertedUserData = convertUserToUserData(user);
      setUserData(convertedUserData);
      setEditFormData(convertedUserData);
    }
  }, [user]);

  const handleEditClick = () => {
    if (userData) {
      setEditFormData(userData);
      setIsEditModalOpen(true);
    }
  };

  const handleCancelEdit = () => {
    if (userData) {
      setEditFormData(userData);
    }
    setIsEditModalOpen(false);
  };

  const validateFormData = (data: UserData): boolean => {
    if (!data.fullName?.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!data.phoneNumber?.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!data.username?.trim()) {
      toast.error("Username is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!editFormData || !user?.id) return;

    if (!validateFormData(editFormData)) {
      return;
    }

    setLoading(true);
    try {
      // const updatedUser = await updateUser(user.id, {
      //   fullName: editFormData.fullName,
      //   phoneNumber: editFormData.phoneNumber,
      //   username: editFormData.username,
      //   address: editFormData.address,
      //   about: editFormData.about,
      // });

      // setUserData(convertUserToUserData(updatedUser));
      setTimeout(() => {
        console.log("Contact updated", updateUser);

        setIsEditModalOpen(false);
        toast.success("Profile updated successfully");
      }, 4000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof UserData,
    value: string | boolean | string[]
  ) => {
    if (!editFormData) return;

    setEditFormData((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (userLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 size={24} className="animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  // No user data state
  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <User size={48} className="text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            No Profile Data
          </h2>
          <p className="text-slate-600">
            Unable to load user profile information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-gray-900 ">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border--700 shadow-md shadow-gray-400 dark:shadow-md dark:shadow-gray-700 overflow-hidden ">
          {/* Header */}
          <div className="bg-slate-800 px-6 py-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center">
                <User size={40} className="text-slate-300" />
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                <p className="text-slate-300 text-lg">@{userData.username}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userData.enabled ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="text-sm text-slate-300">
                    {userData.enabled ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Account Status</p>
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEditClick}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Settings size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Contact Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-slate-800 font-medium">
                        {userData.email}
                      </p>
                      <p className="text-xs text-slate-500">
                        Email address (not editable)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-slate-800">{userData.phoneNumber}</p>
                      <p className="text-xs text-slate-500">Phone number</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-slate-800">
                        {makeTitleCase(userData.address)}
                      </p>
                      <p className="text-xs text-slate-500">Address</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Account Details
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-slate-800">
                        {formatDate(userData.createdAt)}
                      </p>
                      <p className="text-xs text-slate-500">Member since</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-slate-800">{userData.provider}</p>
                      <p className="text-xs text-slate-500">
                        Authentication provider
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User size={18} className="text-slate-500 mt-0.5" />
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {userData.roles.map((role, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">User roles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-slate-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    About
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {makeTitleCase(userData.about)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800">
                Edit Profile
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editFormData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Email address cannot be changed
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editFormData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={editFormData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  About
                </label>
                <textarea
                  value={editFormData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Enabled Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enabled"
                  checked={editFormData.enabled}
                  disabled
                  onChange={(e) =>
                    handleInputChange("enabled", e.target.checked)
                  }
                  className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                />
                <label
                  htmlFor="enabled"
                  className="text-sm font-medium text-slate-700"
                >
                  Account Enabled
                </label>
                <p className="text-xs text-slate-500 mt-1">Cannot be changed</p>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
