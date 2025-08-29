import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Users, 
  Mail, 
  Phone, 
  Shield, 
  Cloud, 
  BarChart3, 
  Zap, 
  Crown, 
  Star,
  ArrowRight,
  Building2,
  Database,
  FileText,
  Calendar,
  MessageSquare,
  Lock,
  Headphones,
  Globe
} from 'lucide-react';
import Navbar from '@/mycomponents/PublicNavbar';
import { Link } from 'react-router-dom';

interface PricingFeature {
  name: string;
  free: boolean | string;
  prime: boolean | string;
  primePro: boolean | string;
  icon?: React.ReactNode;
}

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for individuals getting started',
      price: { monthly: 0, annual: 0 },
      badge: null,
      color: 'slate',
      target: 'Individual Users',
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Prime',
      description: 'Ideal for small teams and growing businesses',
      price: { monthly: 29, annual: 290 },
      badge: 'Most Popular',
      color: 'blue',
      target: 'Small Teams',
      cta: 'Start Prime Trial',
      popular: true
    },
    {
      name: 'Prime Pro',
      description: 'Enterprise-grade solution for large organizations',
      price: { monthly: 99, annual: 990 },
      badge: 'Enterprise',
      color: 'purple',
      target: 'Large Organizations',
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const features: PricingFeature[] = [
    {
      name: 'Contact Storage',
      free: '1,000 contacts',
      prime: '25,000 contacts',
      primePro: 'Unlimited contacts',
      icon: <Users size={16} />
    },
    {
      name: 'Email Campaigns',
      free: '100/month',
      prime: '10,000/month',
      primePro: 'Unlimited',
      icon: <Mail size={16} />
    },
    {
      name: 'Phone Integration',
      free: false,
      prime: true,
      primePro: true,
      icon: <Phone size={16} />
    },
    {
      name: 'Advanced Analytics',
      free: false,
      prime: true,
      primePro: true,
      icon: <BarChart3 size={16} />
    },
    {
      name: 'Custom Fields',
      free: '5 fields',
      prime: '50 fields',
      primePro: 'Unlimited fields',
      icon: <FileText size={16} />
    },
    {
      name: 'Data Export',
      free: 'CSV only',
      prime: 'CSV, Excel, PDF',
      primePro: 'All formats + API',
      icon: <Database size={16} />
    },
    {
      name: 'Team Collaboration',
      free: false,
      prime: 'Up to 10 users',
      primePro: 'Unlimited users',
      icon: <Building2 size={16} />
    },
    {
      name: 'Calendar Integration',
      free: false,
      prime: true,
      primePro: true,
      icon: <Calendar size={16} />
    },
    {
      name: 'SMS Messaging',
      free: false,
      prime: '1,000/month',
      primePro: 'Unlimited',
      icon: <MessageSquare size={16} />
    },
    {
      name: 'API Access',
      free: false,
      prime: 'Basic API',
      primePro: 'Full API + Webhooks',
      icon: <Zap size={16} />
    },
    {
      name: 'Data Security',
      free: 'Basic encryption',
      prime: 'Advanced encryption',
      primePro: 'Enterprise security',
      icon: <Shield size={16} />
    },
    {
      name: 'Cloud Storage',
      free: '1 GB',
      prime: '100 GB',
      primePro: '1 TB',
      icon: <Cloud size={16} />
    },
    {
      name: 'Priority Support',
      free: false,
      prime: 'Email support',
      primePro: '24/7 phone + email',
      icon: <Headphones size={16} />
    },
    {
      name: 'White Labeling',
      free: false,
      prime: false,
      primePro: true,
      icon: <Globe size={16} />
    },
    {
      name: 'SLA Guarantee',
      free: false,
      prime: false,
      primePro: '99.9% uptime',
      icon: <Lock size={16} />
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={16} className="text-green-500 dark:text-green-400" />
      ) : (
        <X size={16} className="text-slate-400 dark:text-slate-500" />
      );
    }
    return <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>;
  };

  const getPlanColorClasses = (color: string, popular: boolean = false) => {
    const baseClasses = {
      slate: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800',
      blue: 'border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/50 ring-2 ring-blue-500 dark:ring-blue-400',
      purple: 'border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/50'
    };
    
    return popular ? baseClasses.blue : baseClasses[color as keyof typeof baseClasses];
  };

  const getButtonClasses = (color: string) => {
    const classes = {
      slate: 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-slate-300 text-white dark:text-slate-900',
      blue: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white',
      purple: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white'
    };
    
    return classes[color as keyof typeof classes];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
        <Navbar/>
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your contact management needs. Scale as you grow with our flexible pricing options.
            </p>
            <p className="text-md font-light italic text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              For New Users, Enjoy Prime Free For 7-Months .
            </p>
            <p className="text-md -mt-6 mb-6 font-light italic text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
             Thala for a reason 😊
            </p>


            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
                  isAnnual ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2 py-1 rounded-full">
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-8 ${getPlanColorClasses(plan.color, plan.popular)} transition-all hover:shadow-lg dark:hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-900/50`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                    plan.popular 
                      ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                      : 'bg-purple-600 dark:bg-purple-500 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  {plan.name === 'Free' && <Users className="text-slate-600 dark:text-slate-400" size={32} />}
                  {plan.name === 'Prime' && <Star className="text-blue-600 dark:text-blue-400" size={32} />}
                  {plan.name === 'Prime Pro' && <Crown className="text-purple-600 dark:text-purple-400" size={32} />}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-slate-600 dark:text-slate-400">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Target: {plan.target}
                </div>
                
                <Link
                    to={"/signup"}
                 className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${getButtonClasses(plan.color)}`}>
                  {plan.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Quick Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                  Key Features
                </h4>
                {features.slice(0, 5).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <span className="text-slate-600 dark:text-slate-400">{feature.icon}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{feature.name}</span>
                    {renderFeatureValue(
                      index === 0 ? feature.free : index === 1 ? feature.prime : feature.primePro
                    )}
                  </div>
                ))}
                <div className="text-center pt-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400">+ more features below</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="px-6 py-8 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
              Complete Feature Comparison
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-center mt-2">
              See all features included in each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                    Prime
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                    Prime Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {features.map((feature, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 dark:text-slate-400">{feature.icon}</span>
                        <span className="font-medium text-slate-900 dark:text-white">{feature.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.free)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.prime)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.primePro)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Yes, you can change your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Yes! Prime and Prime Pro plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                What about data security?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                All plans include encryption and secure data handling. Prime Pro includes advanced enterprise-grade security features.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Do you offer custom solutions?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Yes! For large enterprises with specific needs, we offer custom solutions. Contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-slate-800 dark:bg-slate-900 border dark:border-slate-700 rounded-2xl p-8 text-center text-white transition-colors">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Transform Your Contact Management?
          </h2>
          <p className="text-slate-300 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Join thousands of businesses that trust our platform to manage their contacts efficiently and grow their relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
            to={"/signup"}
             className="bg-white dark:bg-slate-200 text-slate-800 dark:text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 dark:focus:ring-offset-slate-900">
              Start Free Trial
            </Link>
            <button className="border border-slate-600 dark:border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 dark:focus:ring-offset-slate-900">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;