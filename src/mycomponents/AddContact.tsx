import React, { useState } from "react";
import type { ContactFormData } from "@/types/index";
import { Plus } from "lucide-react";
import { saveContactForUser } from "@/apiService/contact-service";
import { toast } from "react-toastify";
import { useUserContext } from "@/contexts/user-context";

function AddContact() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    description: "",
    favorite: false,
    websiteLink: "",
    linkedInLink: "",
    links: [{ link: "", title: "" }],
  });

  const { user } = useUserContext();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, favorite: e.target.checked }));
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const addLinkField = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { link: "", title: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFormData(formData);
    if (!isValid) return;

    try {
      if (user) {
        const response = await saveContactForUser(
          user?.id,
          formData,
          imageFile
        );
        toast.success("Contact Saved");
        console.log("Contact created:", response.data);
      }
    } catch (error: any) {
      toast.error("Please try again");
      console.error("Error saving contact:", error?.response?.data || error);
    }
  };

  function validateFormData(formData: ContactFormData): boolean {
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      toast.warning(
        "Full Name is mandatory and must be at least 3 characters long"
      );
      return false;
    }

    if (
      !formData.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      toast.warning("Valid email is required");
      return false;
    }

    if (!formData.phoneNumber || formData.phoneNumber.trim().length < 10) {
      toast.warning("Phone number is required and must be at least 10 digits");
      return false;
    }

    if (!formData.address || formData.address.trim().length < 3) {
      toast.warning("Address is required and must be at least 3 characters");
      return false;
    }

    return true;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Add New Contact
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-8 space-y-8"
        encType="multipart/form-data"
        noValidate
      >
        {/* Section: Basic Info */}
        <section className="grid sm:grid-cols-2 gap-6">
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              required: true,
            },
            { label: "Email", name: "email", type: "email", required: true },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "tel",
              required: true,
            },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type, required }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium mb-1 dark:text-white"
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                required={required}
                className="input"
              />
            </div>
          ))}
        </section>

        {/* Section: Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium mb-1 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="input resize-none"
            placeholder="Short note or description..."
          />
        </div>

        {/* Section: Links */}
        <section className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Website Link", name: "websiteLink", type: "url" },
            { label: "LinkedIn Link", name: "linkedInLink", type: "url" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium mb-1 dark:text-white"
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="input"
              />
            </div>
          ))}
        </section>

        {/* Section: Favorite Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.favorite}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-sm text-slate-700 dark:text-slate-300">
            Mark as Favorite
          </label>
        </div>

        {/* Section: Additional Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Additional Links
          </h4>
          {formData.links.map((link, index) => (
            <div key={index} className="grid sm:grid-cols-2 gap-4">
              <input
                type="url"
                value={link.link}
                onChange={(e) =>
                  handleLinkChange(index, "link", e.target.value)
                }
                placeholder="Link URL"
                className="input"
              />
              <input
                type="text"
                value={link.title}
                onChange={(e) =>
                  handleLinkChange(index, "title", e.target.value)
                }
                placeholder="Link Title"
                className="input"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addLinkField}
            className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
          >
            <Plus size={16} /> Add another link
          </button>
        </div>

        {/* Section: Image Upload */}
        <div className="flex flex-col gap-4">
          {/* Flowbite Dropzone */}
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
              }}
            />
          </label>

          {/* Preview */}
          {imageFile && (
            <div className="mt-2">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                Preview:
              </p>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Selected"
                className="h-40 rounded-lg shadow border object-contain"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}

export default AddContact;
