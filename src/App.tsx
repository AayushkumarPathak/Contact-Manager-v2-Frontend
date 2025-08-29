import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layouts/AuthLayout";
import { LoadingProvider } from "./contexts/GlobalLoadingContext";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./contexts/user-context";
import MyContacts from "@/pages/MyContacts";
import AddContact from "@/pages/AddContact";
import FavoriteContacts from "@/pages/FavoriteContacts";
import AppSettings from "@/pages/AppSettings";
import UserProfile from "./pages/UserProfile";
import ViewContact from "./pages/ViewContact";
import PricingPage from "./pages/PricingPage";

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <UserContextProvider>
          <div className="App min-h-screen min-w-fit">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<PricingPage/>}/>

              {/* Protected Routes */}
              <Route path="/user" element={<AuthLayout />}>
                <Route index element={<Navigate to="/user/contacts" replace />} />
                <Route path="contacts" element={<MyContacts />} />
                <Route path="add" element={<AddContact />} />
                <Route path="favorites" element={<FavoriteContacts />} />
                <Route path="settings" element={<AppSettings />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="contact/:contactId" element={<ViewContact/>} />
              </Route>

              {/* Redirect /dashboard to /user/contacts */}
              <Route
                path="/dashboard"
                element={<Navigate to="/user/contacts" replace />}
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </UserContextProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
