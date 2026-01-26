import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Pencil,
  Trash2,
  ArrowLeft,
  Loader2,
  X,
  Save,
  Globe,
  Link,
  Info,
  Mail,
  Phone,
} from "lucide-react";
import type { Contact } from "@/types";
import {
  deleteContactById,
  getContactById,
  updateContactById,
} from "@/apiService/contact-service";
import { toast } from "react-toastify";
import BackButton from "@/mycomponents/BackButton";

const ViewContact = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      if (contactId) {
        try {
          const data = await getContactById(parseInt(contactId));
          setContact(data.data);
         
        } catch (error) {
          console.log("NumberFormatException", error);
        }
      }
    };
    fetchContact();
  }, [contactId]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setDeleteConfirmText("");
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmText.toLowerCase() !== "delete") {
      toast.error("Please type 'delete' to confirm");
      return;
    }

    try {
      if (contactId) {
        const res = await deleteContactById(parseInt(contactId));
        toast.success("Contact deleted successfully");
        setShowDeleteModal(false);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete contact, Try Again");
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleChange = (field: keyof Contact, value: any) => {
    setContact((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contact && contactId) {
      try {
        const res = await updateContactById(parseInt(contactId), contact);
        toast.success("Contact upated");
      } catch (e) {
      console.error(`Error upadating contact:`,e);
      toast.error("failed to update")
      }
    }

    setShowEditModal(false);
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-100 dark:bg-gray-900 min-h-screen text-slate-800 dark:text-slate-100">
      <BackButton />

      {contact ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center col-span-1">
            <img
              src={contact.picture}
              alt={contact.fullName}
              loading="lazy"
              className="rounded-full h-40 w-40 object-cover shadow-md"
            />
            <h2 className="text-2xl font-bold mt-4">{contact.fullName}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              {contact.description}
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              >
                <Pencil size={18} /> Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>

          <div className="md:col-span-2 grid gap-4">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-slate-500 dark:text-slate-300" />
              <span className="font-semibold mr-1">Email:</span> {contact.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-slate-500 dark:text-slate-300" />
              <span className="font-semibold mr-1">Phone:</span>{" "}
              {contact.phoneNumber}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-slate-500 dark:text-slate-300" />
              <span className="font-semibold mr-1">Website:</span>{" "}
              {contact.websiteLink || "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <Link size={18} className="text-slate-500 dark:text-slate-300" />
              <span className="font-semibold mr-1">LinkedIn:</span>{" "}
              {contact.linkedInLink || "N/A"}
            </div>
            <div className="flex items-start gap-2">
              <Info size={18} className="text-slate-500 dark:text-slate-300" />
              <span className="font-semibold mr-1">Address:</span>{" "}
              {contact.address}
            </div>
            {/* Links Array Section */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-semibold flex items-center gap-2">
                <Link
                  size={18}
                  className="text-slate-500 dark:text-slate-300"
                />
                Links:
              </span>
              {contact.links && contact.links.length > 0 ? (
                <ul className="list-disc ml-7">
                  {contact.links.map((l) => (
                    <li key={l.id}>
                      {!l.link?.trim() || !l.title?.trim() ? (
                        <span className="text-slate-500">Not available</span>
                      ) : (
                        <>
                          <span className="font-medium">{l.link}:</span>{" "}
                          <a
                            href={l.title}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {l.title}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-500">No links available</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin" /> Loading...
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Delete Contact
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
              >
                <X />
              </button>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{contact?.fullName}</span>? This
              action cannot be undone.
            </p>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Type <span className="font-bold text-red-600">delete</span> to
                confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Type 'delete' here"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="px-4 py-2 border border-slate-400 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleteConfirmText.toLowerCase() !== "delete"}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed dark:disabled:bg-red-900"
              >
                <Trash2 size={16} className="inline mr-1" /> Delete Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && contact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleModalSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Contact</h2>
              <button type="button" onClick={() => setShowEditModal(false)}>
                <X />
              </button>
            </div>
            <input
              type="text"
              value={contact.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={contact.email}
              disabled
              className="w-full p-2 border rounded bg-slate-100 dark:bg-slate-600 text-slate-400"
              placeholder="Email"
            />
            <input
              type="text"
              value={contact.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Phone Number"
            />
            <input
              type="text"
              value={contact.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Address"
            />
            <textarea
              rows={3}
              value={contact.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Description"
            />
            <input
              type="text"
              value={contact.websiteLink}
              onChange={(e) => handleChange("websiteLink", e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Website Link"
            />
            <input
              type="text"
              value={contact.linkedInLink}
              onChange={(e) => handleChange("linkedInLink", e.target.value)}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="LinkedIn Link"
            />
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-slate-400 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
              >
                <Save size={16} className="inline mr-1" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewContact;
