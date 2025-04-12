import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

// Social platform logos (replace with actual image paths)
const platformLogos = {
  instagram: './logos/instagram.jpeg',
  facebook: './logos/facebook.jpeg',
  youtube: './logos/youtube.jpeg',
  twitter: './logos/twitter.jpeg',
  linkedin: './logos/linkedIn.jpeg',
  pinterest: './logos/pinterest.jpeg',
  whatsapp: './logos/whatsapp.jpeg',
};

// Replace with your actual hero image path
const heroImage = './images/social-media-dashboard.jpeg';

export default function LandingPage() {
    const navigate = useNavigate();

    function loginUser(){
        navigate('/login');
    }

    function registerUser(){
        navigate('/register');
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt text-2xl text-blue-600"></i>
          <span className="text-2xl font-bold text-gray-800">Social Scheduler</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={loginUser} className="text-gray-700 hover:text-blue-600">Login</button>
          <button 
            onClick={registerUser} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section with Image */}
      <section className="container mx-auto px-6 py-12 md:py-20" >
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Unify Your <span className="text-blue-600">Social Presence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Schedule, publish, and analyze content across all major platforms from one powerful dashboard
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/social-scheduler/register" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Start Free Trial
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
          </div>
          <div className="md:w-1/2">
            <img 
              src={heroImage} 
              alt="Social media dashboard" 
              className="rounded-xl shadow-xl w-full max-w-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Platform Logos Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl text-center text-gray-600 mb-8">
            Trusted by brands on all major platforms
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {Object.entries(platformLogos).map(([platform, logo]) => (
              <div key={platform} className="p-4 hover:scale-110 transition-transform">
                <img 
                  src={logo} 
                  alt={platform} 
                  className="h-25 w-25 object-contain opacity-70 hover:opacity-100" 
                  title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-clock text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">10x Efficiency</h3>
              <p className="text-gray-600">
                Reduce social media management time from hours to minutes with our bulk scheduling and automation tools.
                Focus on creating great content while we handle the publishing.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <img 
                  src="./images/Efficiency.jpeg" 
                  alt="Efficiency dashboard" 
                  className="rounded-lg w-full sm:w-4/5 md:w-full lg:w-3/4 xl:w-2/3 mx-auto border border-white/10 shadow-lg shadow-gray-200/3" // Responsive widths
                />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0 md:order-last md:pl-10">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-chart-pie text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Data-Driven Results</h3>
              <p className="text-gray-600">
                Our AI analyzes your performance to recommend optimal posting times and content strategies.
                Get actionable insights to grow your audience and engagement.
              </p>
            </div>
            <div className="md:w-1/2 md:pr-10">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <img 
                  src="/images/analytics-dashboard.png" 
                  alt="Analytics dashboard" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Team Collaboration</h3>
              <p className="text-gray-600">
                Role-based access, approval workflows, and shared content calendars for seamless teamwork.
                Manage your entire social team from one dashboard.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <img 
                  src="/images/team-collab.png" 
                  alt="Team collaboration" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Trusted by 10,000+ Social Media Professionals
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Join the community of marketers who transformed their social strategy
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Cut our social media workload by 70% while doubling engagement. Game changer!",
                author: "Sarah K.",
                role: "Digital Marketing Director",
                avatar: "/avatars/avatar1.jpg"
              },
              {
                quote: "The cross-platform scheduling alone is worth 10x the price. Incredible value.",
                author: "Michael T.",
                role: "Content Manager",
                avatar: "/avatars/avatar2.jpg"
              },
              {
                quote: "Finally a tool that understands the unique needs of social media teams.",
                author: "Priya M.",
                role: "Social Media Lead",
                avatar: "/avatars/avatar3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-yellow-400 text-2xl mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="rounded-full w-12 h-12 overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Different Background */}
      {/* <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Strategy?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join the most powerful all-in-one social media management platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/social-scheduler/register" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Your Free 14-Day Trial
            </Link>
            <Link 
              to="/social-scheduler/demo" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Request Demo
            </Link>
          </div>
          <p className="mt-6 text-indigo-100">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section> */}

      <div class="cta-section bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-6 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Get started now. Try <span class="text-yellow-300">MORS@PLANNER</span> free for 30 days.
          </h1>
          <p class="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Download the app now. Available on the:
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#" class="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
              </svg>
              App Store
            </a>
            
            <a href="#" class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.68.59 1.19s-.25.92-.59 1.19l-2.01 1.41-2.22-2.22 2.22-2.22 2.01 1.44zm-15.25-1.44l2.22 2.22-8.49 8.49-2.22-2.22 8.49-8.49z"></path>
              </svg>
              Play Store
            </a>
            
            <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12v7.5c0 .83.67 1.5 1.5 1.5S6 20.33 6 19.5V12H3zm5.5-9C7.67 3 7 3.67 7 4.5v15c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-15C10 3.67 9.33 3 8.5 3zm6.5 9v7.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V12h-3z"></path>
              </svg>
              Microsoft Store
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-calendar-alt text-2xl text-blue-400"></i>
                <span className="text-xl font-bold">Social Scheduler</span>
              </div>
              <p className="text-gray-400">The complete social media command center for modern teams</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Platforms</h4>
              <ul className="space-y-2 text-gray-400">
                {Object.keys(platformLogos).map(platform => (
                  <li key={platform}>
                    <a href="#" className="hover:text-white transition-colors">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Social Scheduler. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}