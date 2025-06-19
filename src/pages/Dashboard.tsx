import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/user-context";
import { Loader2 } from "lucide-react";

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserContext();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
        Welcome, {user?.fullName || 'User'}!
      </h2>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <p className="text-slate-600 dark:text-slate-300">
          Welcome to your contact management dashboard. Select an option from the sidebar to:
        </p>
        <ul className="mt-4 list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
          <li>View and manage your contacts</li>
          <li>Add new contacts to your network</li>
          <li>Access your favorite contacts</li>
          <li>Adjust your application settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;