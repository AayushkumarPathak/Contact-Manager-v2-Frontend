import { useLoading } from "@/contexts/GlobalLoadingContext";
import React, { useEffect } from "react";
import {FullSpinner} from "./Spinner";


function MyContacts() {

  const {isLoading, setLoading} = useLoading();

  useEffect(()=>{

    setTimeout(()=>{
      setLoading(true);

      console.log("Loading all contacts here");

      setLoading(false);
      console.log("end");
      
      
    },2000)
  },[])


  return (
    <div>
      {isLoading && <FullSpinner/>}
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">My Contacts</h2>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <p className="text-slate-600 dark:text-slate-300">
          Your contact list will appear here. Start by adding your first
          contact!
        </p>
      </div>
    </div>
  );
}

export default MyContacts;
