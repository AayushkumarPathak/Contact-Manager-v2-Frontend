import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Navbar from '../mycomponents/PublicNavbar';
import {Spinner} from '@/mycomponents/Spinner';
import { useLoading } from '@/contexts/GlobalLoadingContext';
import { loginUser } from '@/apiService/user-service';
import { doLogin } from '@/auth';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  //Loading logic
  const{isLoading, setLoading } = useLoading();


  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    // Handle login logic here
    setLoading(true);
    // console.log('Login data:', formData);

    if (formData.username.trim() === "" || formData.password.trim() === "") {
        toast.error("Please fill all the fields",{
          className:"custom-toast"
        });
        setLoading(false);
        return;
    }
    
    if (formData.username.includes("@") == false) {
        toast.error("Please provide valid email",{
          className:"custom-toast"
        });
        setLoading(false);
        return;
    }


    try {
      loginUser(formData)
      .then((jwtToken)=>{
        doLogin(jwtToken,()=>{
          console.log("User jwt token: ",jwtToken);
        });
        toast.success("Login Success");
        
        setTimeout(()=>{
          setLoading(false);
          navigate("/user/dashboard");
        },3000)
      })
      .catch((err)=>{
        const errData = err?.response?.data;
        console.log("Error invalid credentials of user: ",errData);
        toast.error(errData?.message || "Internal Server Error",{
          className:"custom-toast"
        });
        setLoading(false);
      })
    } catch (error) {
      alert("Something went wrong")
      console.log("Error in login service:",error);
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="email"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center flex-col justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-red-500 dark:text-red-500 hover:text-blue-500 dark:hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
                <div className={`${isLoading ? "mx-1 p-2" : ""} flex justify-center items-center`}>
                    {isLoading && <Spinner/>}
                </div>
               
              </div>

              <div>
                 
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;