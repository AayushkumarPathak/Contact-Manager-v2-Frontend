import { privateAxios } from "./Api-Constants";
import type { Contact, ContactFormData } from "@/types/index"; // if you store Contact type elsewhere

export const getContactByUser = async (uid: number): Promise<Contact[]> => {
  try {
    const response = await privateAxios.get(`/contact/user/${uid}`);
    return response.data.data.contacts; // ✅ FIX: Access nested contacts array
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return []; 
  }
};



export const saveContactForUser = async (
  userId: number,
  contactData: ContactFormData,
  imageFile: File | null
) => {
  const form = new FormData();
  form.append("contactDto", JSON.stringify(contactData));
  if (imageFile) form.append("imageFile", imageFile);

  const response = await privateAxios.post(`/contact/${userId}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};


