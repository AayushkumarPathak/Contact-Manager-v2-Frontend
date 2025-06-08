import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { LoadingProvider } from "./contexts/GlobalLoadingContext";
import { ToastContainer } from "react-toastify";
import AuthenticatedPages from "./pages/AuthenticatedPages";

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
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
            limit={3}
            theme="colored"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/user" element={<AuthenticatedPages />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
