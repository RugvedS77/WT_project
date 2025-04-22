import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const platformLogos = {
  instagram: './images/instagram.png',
  facebook: './images/facebook.jpg',
  youtube: './images/youtube.jpg',
  twitter: './images/twitter.png',
  linkedin: './images/linkedIn.png',
  pinterest: './images/pinterest.png',

};

const heroImage = './images/social-media-dashboard.jpg';

const features = [
  {
    title: "Visual Content Calendar",
    description: "Drag-and-drop interface for effortless scheduling across all platforms",
    icon: "fas fa-calendar-alt",
    color: "text-blue-500"
  },
  {
    title: "AI-Powered Optimization",
    description: "Smart suggestions for best posting times based on your audience",
    icon: "fas fa-brain",
    color: "text-purple-500"
  },
  {
    title: "Multi-Account Management",
    description: "Handle all your client accounts from one centralized dashboard",
    icon: "fas fa-users",
    color: "text-green-500"
  },
  {
    title: "Performance Analytics",
    description: "Track engagement and growth across all your social channels",
    icon: "fas fa-chart-line",
    color: "text-yellow-500"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('scheduling');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribed with:", email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt text-2xl text-blue-600"></i>
          <span className="text-2xl font-bold text-gray-800">SocialSync</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600 font-medium">Login</button>
          <button 
            onClick={() => navigate('/register')} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Schedule Smarter, <span className="text-blue-600">Grow Faster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The all-in-one social media management platform that saves you time and boosts engagement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Start Your Free Trial
              </Link>
              <div className="bg-white px-8 py-3 rounded-lg text-lg font-medium shadow-sm flex items-center justify-center">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    // Handle Google auth
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  text="signup_with"
                  shape="pill"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
                <img src="./images/ava1.jpg" alt="User 1" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="./images/ava2.jpg" alt="User 2" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="./images/ava3.jpg" alt="User 3" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="./images/ava4.jpg" alt="User 4" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-gray-600">Trusted by <span className="font-bold">10,000+</span> marketers</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                  <span className="ml-2 text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src={heroImage} 
              alt="Social media dashboard" 
              className="rounded-xl shadow-xl w-full max-w-2xl mx-auto border-8 border-white"
            />
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <i className="fas fa-check-circle text-green-500 text-xl"></i>
                </div>
                <div>
                  <p className="font-bold">Post Published!</p>
                  <p className="text-sm text-gray-500">Your content is now live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Platform Integration Section */}
<section className="relative py-16 overflow-hidden">
  {/* Background Image - Fixed */}
  <div className="absolute inset-0 z-0">
    <img 
      src="./images/1.jpg" 
      alt="Social media background"
      className="w-full h-full object-cover opacity-30"
    />
  </div>
  
  {/* Content - Moves with scroll */}
  <div className="container mx-auto px-6 relative z-10">
    <h2 className="text-4xl text-center text-gray-800 mb-6 font-bold">
      Connect All Your Social Accounts
    </h2>
    <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
      Schedule posts, track performance, and engage with your audience across all major platforms
    </p>
    <div className="flex flex-wrap justify-center gap-10 md:gap-16 py-8">
      {Object.entries(platformLogos).map(([platform, logo]) => (
        <div key={platform} className="group transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
            <img 
              src={logo} 
              alt={platform} 
              className="h-16 w-16 object-contain"
              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
            />
          </div>
          <p className="mt-4 text-center font-medium text-gray-700 capitalize">
            {platform}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Key Features Grid */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-8">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
      Everything You Need to Master Social Media
    </h2>
    <p className="text-xl text-center text-gray-600 mb-16 max-w-4xl mx-auto">
      Powerful tools designed to streamline your workflow and maximize your social media impact
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Card 1 */}
      <div className="group bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="h-56 overflow-hidden rounded-t-2xl">
          <img
            src="./images/calender.jpg"
            alt={features[0].title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className={`${features[0].color} text-3xl mb-3`}>
            <i className={features[0].icon}></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{features[0].title}</h3>
          <p className="text-gray-600">{features[0].description}</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="group bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="h-56 overflow-hidden rounded-t-2xl">
          <img
            src="./images/ai.jpg"
            alt={features[1].title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className={`${features[1].color} text-3xl mb-3`}>
            <i className={features[1].icon}></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{features[1].title}</h3>
          <p className="text-gray-600">{features[1].description}</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="group bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="h-56 overflow-hidden rounded-t-2xl">
          <img
            src="./images/social.jpg"
            alt={features[2].title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className={`${features[2].color} text-3xl mb-3`}>
            <i className={features[2].icon}></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{features[2].title}</h3>
          <p className="text-gray-600">{features[2].description}</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="group bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="h-56 overflow-hidden rounded-t-2xl">
          <img
            src="./images/performance.jpg"
            alt={features[3].title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className={`${features[3].color} text-3xl mb-3`}>
            <i className={features[3].icon}></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{features[3].title}</h3>
          <p className="text-gray-600">{features[3].description}</p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Interactive Demo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                See How It Works
              </h2>
              
              <div className="mb-8">
                <div className="flex border-b border-gray-200 mb-6">
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'scheduling' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('scheduling')}
                  >
                    Scheduling
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('analytics')}
                  >
                    Analytics
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'collaboration' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('collaboration')}
                  >
                    Collaboration
                  </button>
                </div>
                
                <div className="min-h-[200px]">
                  {activeTab === 'scheduling' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Effortless Post Scheduling</h3>
                      <p className="text-gray-600 mb-4">
                        Plan weeks or months in advance with our intuitive calendar. Drag and drop posts, set them to auto-publish, 
                        and never miss your optimal posting times again.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Bulk upload and schedule hundreds of posts</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Visual content calendar for all platforms</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>First comment scheduling for Instagram</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'analytics' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Actionable Insights</h3>
                      <p className="text-gray-600 mb-4">
                        Track what's working with detailed analytics across all your connected accounts. 
                        Get recommendations to improve your strategy.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Engagement rate tracking</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Best times to post analysis</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Competitor benchmarking</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'collaboration' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Team Workflow</h3>
                      <p className="text-gray-600 mb-4">
                        Collaborate seamlessly with your team, clients, or agencies. Assign roles, 
                        get approvals, and maintain brand consistency.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Role-based permissions</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Approval workflows</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>Client reporting</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <Link 
                to="/demo" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Watch Full Demo Video
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-gray-900 p-3 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-white text-sm mx-auto">
                    {activeTab === 'scheduling' && 'Content Calendar'}
                    {activeTab === 'analytics' && 'Performance Dashboard'}
                    {activeTab === 'collaboration' && 'Team Workspace'}
                  </div>
                </div>
                {activeTab === 'scheduling' && (
  <img 
    src="./images/social media.jpg" 
    alt="Scheduling demo"
    className="w-full h-auto border-t border-gray-700"
  />
)}
{activeTab === 'analytics' && (
  <img 
    src="./images/analytics.jpg" 
    alt="Analytics demo"
    className="w-full h-auto border-t border-gray-700"
  />
)}
{activeTab === 'collaboration' && (
  <img 
    src="./images/colaboration.jpg" 
    alt="Collaboration demo"
    className="w-full h-auto border-t border-gray-700"
  />
)}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Ready to Transform Your Social Media Strategy?
    </h2>
    <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
      Join thousands of marketers saving time and growing their audience — completely free!
    </p>

    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
      {subscribed ? (
        <div className="p-8">
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
            <i className="fas fa-check-circle mr-2"></i>
            Thank you for subscribing! Check your email for confirmation.
          </div>
          <p className="text-gray-700">
            You now have full access to all features. No fees, ever.
          </p>
          <Link 
            to="/register" 
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Join for Free</h3>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
          >
            Create Free Account
          </button>
          <p className="text-gray-500 text-sm">
            No credit card needed • 100% Free forever
          </p>
        </form>
      )}
    </div>

    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
      <Link 
        to="/demo" 
        className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
      >
        Request Demo
      </Link>
      <Link 
        to="/features" 
        className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
      >
        See All Features
      </Link>
    </div>
  </div>
</section>

      {/* FAQ Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 max-w-6xl">
    <h2 className="text-3xl font-bold text-center text-blue-600 mb-16">
      Frequently Asked Questions
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          question: "Which social media platforms are currently supported?",
          answer:
            "Right now, we support LinkedIn. We're actively working on adding support for more platforms like Instagram, Twitter, and Facebook very soon!",
        },
        {
          question: "Is it really free to use?",
          answer:
            "Yes, 100% free! You can sign up, connect your LinkedIn, and start scheduling posts without paying anything.",
        },
        {
          question: "Can I schedule posts for LinkedIn in advance?",
          answer:
            "Absolutely! You can create and schedule posts for LinkedIn with full control over content and timing.",
        },
        {
          question: "Will I be able to manage multiple accounts in the future?",
          answer:
            "Yes! We're working on adding support for managing multiple accounts and platforms in one place.",
        },
        {
          question: "Is there a mobile app available?",
          answer:
            "Not yet, but a mobile app is in development to help you manage and schedule your posts on the go.",
        },
        {
          question: "How can I contact support if I face any issues?",
          answer:
            "You can always reach out through our Contact page, and our team will get back to you quickly!",
        },
      ].map((faq, index) => (
        <div
          key={index}
          className="bg-yellow-200 rounded-xl shadow-xl w-full"
        >
          <div className="bg-blue-900 px-6 py-4 rounded-t-xl">
            <h3 className="text-white text-lg font-semibold flex items-center">
              <span className="mr-2">Q:</span> {faq.question}
            </h3>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-800 font-medium flex items-start">
              <span className="mr-2 font-bold">A:</span> {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-20">
      <p className="text-white mb-4 text-lg">Still have questions?</p>
      <Link
        to="/contact"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-colors"
      >
        Contact Support
      </Link>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-calendar-alt text-2xl text-blue-400"></i>
                <span className="text-xl font-bold">SocialSync</span>
              </div>
              <p className="text-gray-400 mb-6">
                The complete social media management platform for brands, agencies, and creators.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link to="/updates" className="hover:text-white transition-colors">Updates</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/webinars" className="hover:text-white transition-colors">Webinars</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SocialSync. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}