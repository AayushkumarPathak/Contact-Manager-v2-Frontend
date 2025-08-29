import { privateAxios } from "./Api-Constants";
import type { Contact, ContactFormData,PaginatedContactResponse } 
from "@/types/index";

export const getContactByUser = async (
  uid: number,
  pageNumber : number,
  pageSize : number
): Promise<PaginatedContactResponse | null> => {
  try {
    const response = await privateAxios.get(`/contact/user/${uid}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdAt&sortDir=${"desc"}`);

    return response.data.data as PaginatedContactResponse;
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return null;
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


export const deleteContactById = async (contactId:number) => {
  const response = await privateAxios.delete(`/contact/${contactId}`);

  return response.data;

}

export const getContactById = async (contactId: number) => {
    const response = await privateAxios.get(`/contact/${contactId}`);
    return response.data;
  };

