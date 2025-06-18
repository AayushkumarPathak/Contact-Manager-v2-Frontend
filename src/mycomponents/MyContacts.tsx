import { getContactByUser } from "@/apiService/contact-service";
import { useUserContext } from "@/contexts/user-context";
import type { Contact } from "@/types";
import { useEffect, useState } from "react";

function MyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  // const [currUser, setCurrUser] = useState<User | null>(null);

  const {user} = useUserContext();
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const fetchContacts = async () => {
      if (user) {
        const fetchedContacts = await getContactByUser(user?.id);
        
        setContacts(fetchedContacts);
        console.log("Fetched contacts:", fetchedContacts); // Log fetched contacts
        
      }
      else{
          setLoading(true)
      }
      
    };
    
    fetchContacts();
    setLoading(false);
  }, [user]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white dark:bg-gray-900">
        <button className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Action
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">
            Avatar
            </th>
            
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Favorite</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.length > 0 ? (
            contacts.map((contact) => (
              <tr
                key={contact.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <div className="h-12 w-12 bg-gray-700 rounded-full">
                  <img 
                    src={contact.picture}
                    alt={contact.fullName+"scm.jpg"}
                    className="h-full w-full rounded-full"
                  />
                  </div>
                  
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {contact.fullName}
                </td>
                <td className="px-6 py-4">{contact.phoneNumber}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.address}</td>
                <td className="px-6 py-4">
                  {contact.favorite ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            
            <tr>
              <td colSpan={7} className="text-center py-4">
                {loading ? "Loading... " : "No contact available"}
              </td>
            </tr>
          ) }
        </tbody>
      </table>
    </div>
  );
}

export default MyContacts;

