import React from 'react';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Store Contacts
            <span className="block text-slate-700 dark:text-slate-300">On Cloud</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Effortlessly Manage & Scale Your Contacts Store millions of contacts on a fully managed cloud platform—secure, reliable, and built for seamless accessibility.<br/>
            <span className='text-sm'>This is ERP Software, use Desktop for Great Exprience of UI.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white dark:text-slate-900" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Built for speed and performance with modern technologies
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white dark:text-slate-900" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Secure</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Enterprise-grade security to protect your data and privacy
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-white dark:text-slate-900" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Reliable</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                99.9% uptime guarantee with world-class infrastructure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;