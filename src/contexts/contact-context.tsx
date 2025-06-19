// src/contexts/contact-context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getContactByUser } from "@/apiService/contact-service";
import { useUserContext } from "./user-context";
import type { Contact } from "@/types";
import { useNavigate } from "react-router-dom";

interface ContactContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  loading: boolean;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserContext();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(!user) return;
    const fetchContacts = async () => {
      if (user) {
        try {
          const res = await getContactByUser(user.id);
          setContacts(res);
        } catch (err) {
          console.error("Error fetching contacts:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchContacts();
   

    

  }, [user]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts, loading }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContactContext must be used within ContactProvider");
  return context;
};
