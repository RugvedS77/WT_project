import React from 'react';

const plans = [
  {
    name: 'Free Plan',
    price: '₹0/month',
    features: [
      'Schedule up to 10 posts/month',
      'Basic analytics',
      '1 connected account',
    ],
    current: true,
  },
  {
    name: 'Pro Plan',
    price: '₹499/month',
    features: [
      'Unlimited post scheduling',
      'Advanced analytics',
      'Multiple account support',
      'Priority customer support',
    ],
    current: false,
  },
];

const SubscriptionTab = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Subscription Plans</h2>
        <p className="text-gray-500 mt-2">Choose the plan that fits your needs</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-xl p-8 transition-all duration-300 ${
              plan.current 
                ? 'border-blue-400 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
              {plan.current && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Current
                </span>
              )}
            </div>
            
            <p className="text-2xl font-bold text-blue-600 mb-6">{plan.price}</p>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                plan.current
                  ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Need help choosing? <a href="#" className="text-blue-600 hover:underline">Contact us</a>
      </div>
    </div>
  );
};

export default SubscriptionTab;